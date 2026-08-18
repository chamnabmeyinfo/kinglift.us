import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { Request, Response, NextFunction } from 'express';
import { db, User } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'kinglift_secret_key_2026_industrial_secure_token';

export const ALLOWED_DOMAINS = ['@kinglift.us', '@s3vtgroup.com.kh'];
export const ALLOWED_SPECIFIC_EMAILS = ['chamnabmey.info@gmail.com'];

/**
 * Validates if an email address belongs to the authorized whitelist
 * Authorized:
 * 1. Domain: @kinglift.us
 * 2. Domain: @s3vtgroup.com.kh
 * 3. Specific: chamnabmey.info@gmail.com
 */
export const isAllowedEmail = (email: string): boolean => {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();

  // Check specific email whitelist
  if (ALLOWED_SPECIFIC_EMAILS.includes(cleanEmail)) {
    return true;
  }

  // Check authorized domains
  for (const domain of ALLOWED_DOMAINS) {
    if (cleanEmail.endsWith(domain)) {
      return true;
    }
  }

  return false;
};

export interface AuthRequest extends Request {
  user?: User;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = db.getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    req.user = user;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'sales')) {
    return res.status(403).json({ error: 'Administrative access required' });
  }
  next();
};

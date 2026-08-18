import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import { 
  hashPassword, 
  comparePassword, 
  generateToken, 
  authenticateToken, 
  requireAdmin,
  isAllowedEmail,
  AuthRequest 
} from './auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// 1. AUTHENTICATION ROUTES (Domain Whitelist Restricted)
// -------------------------------------------------------------

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, company, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Enforce Allowed Domains & Whitelist Rule
    if (!isAllowedEmail(email)) {
      return res.status(403).json({ 
        error: 'Access Restricted: Only authorized accounts from @kinglift.us, @s3vtgroup.com.kh, or chamnabmey.info@gmail.com are permitted to sign up.' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = db.getUserByEmail(cleanEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await hashPassword(password);
    
    // Auto-grant admin role to authorized enterprise domains
    const assignedRole = role || 'admin';

    const newUser = {
      id: `usr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      name,
      email: cleanEmail,
      passwordHash,
      role: assignedRole as any,
      company: company || (cleanEmail.includes('s3vtgroup') ? 'S3VT Group' : 'KingLift USA'),
      phone: phone || '',
      createdAt: new Date().toISOString()
    };

    db.addUser(newUser);

    const token = generateToken(newUser);

    return res.status(201).json({
      message: 'Account registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company,
        phone: newUser.phone
      }
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Failed to create user account' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Enforce Allowed Domains & Whitelist Rule
    if (!isAllowedEmail(cleanEmail)) {
      return res.status(403).json({ 
        error: 'Access Restricted: Only authorized accounts from @kinglift.us, @s3vtgroup.com.kh, or chamnabmey.info@gmail.com are permitted to access this portal.' 
      });
    }

    const user = db.getUserByEmail(cleanEmail);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await comparePassword(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    return res.json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        phone: user.phone
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Authentication failed' });
  }
});

// Google Sign In / OAuth
app.post('/api/auth/google', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Google email is required' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Enforce Allowed Domains & Whitelist Rule
    if (!isAllowedEmail(cleanEmail)) {
      return res.status(403).json({ 
        error: 'Google Sign-In Denied: Your email is not authorized. Only @kinglift.us, @s3vtgroup.com.kh, or chamnabmey.info@gmail.com are permitted.' 
      });
    }

    let user = db.getUserByEmail(cleanEmail);

    if (!user) {
      // Auto-provision authorized enterprise user
      const placeholderPass = await hashPassword(`google_oauth_${Date.now()}_${Math.random()}`);
      user = {
        id: `usr_google_${Date.now().toString(36)}`,
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        passwordHash: placeholderPass,
        role: 'admin',
        company: cleanEmail.includes('s3vtgroup') ? 'S3VT Group' : 'KingLift USA',
        phone: '',
        createdAt: new Date().toISOString()
      };
      db.addUser(user);
    }

    const token = generateToken(user);

    return res.json({
      message: 'Google authentication successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        phone: user.phone
      }
    });
  } catch (err) {
    console.error('Google Auth error:', err);
    return res.status(500).json({ error: 'Google authentication failed' });
  }
});

// Get Current Profile
app.get('/api/auth/me', authenticateToken, (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  
  return res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      company: req.user.company,
      phone: req.user.phone,
      createdAt: req.user.createdAt
    }
  });
});

// List Users (Admin only)
app.get('/api/auth/users', authenticateToken, requireAdmin, (_req, res) => {
  const users = db.getUsers().map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    company: u.company,
    phone: u.phone,
    createdAt: u.createdAt
  }));
  return res.json({ users });
});

// -------------------------------------------------------------
// 2. PRODUCT CATALOG MANAGEMENT ROUTES
// -------------------------------------------------------------

// Get All Products (Public)
app.get('/api/products', (_req, res) => {
  return res.json({ products: db.getProducts() });
});

// Create Product (Admin only)
app.post('/api/products', authenticateToken, requireAdmin, (req, res) => {
  try {
    const productData = req.body;
    if (!productData.name || !productData.modelNumber) {
      return res.status(400).json({ error: 'Machine Name and Model Number are required' });
    }

    const newProduct = {
      ...productData,
      id: productData.id || `kl-${productData.modelNumber.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString(36)}`,
      inStock: productData.inStock !== false,
      createdAt: new Date().toISOString()
    };

    const saved = db.addProduct(newProduct);
    return res.status(201).json({ product: saved });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update Product (Admin only)
app.put('/api/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const updated = db.updateProduct(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json({ product: updated });
});

// Delete Product (Admin only)
app.delete('/api/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const success = db.deleteProduct(id);
  return res.json({ success });
});

// -------------------------------------------------------------
// 3. RFQ & ORDER INQUIRIES PIPELINE
// -------------------------------------------------------------

// Get RFQs
app.get('/api/rfqs', authenticateToken, (req: AuthRequest, res) => {
  if (req.user?.role === 'admin' || req.user?.role === 'sales') {
    return res.json({ rfqs: db.getRFQs() });
  }
  // If customer, only return their own RFQs
  const userRFQs = db.getRFQs().filter(r => r.email.toLowerCase() === req.user?.email.toLowerCase() || r.userId === req.user?.id);
  return res.json({ rfqs: userRFQs });
});

// Submit New RFQ (Public or Authenticated)
app.post('/api/rfqs', (req, res) => {
  try {
    const { fullName, companyName, email, phone, zipCode, deliveryType, urgency, items, comments, userId } = req.body;

    if (!fullName || !email || !phone || !zipCode || !items || items.length === 0) {
      return res.status(400).json({ error: 'Full contact details and at least 1 machinery model are required' });
    }

    const rfq = {
      id: `RFQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
      userId: userId || undefined,
      fullName,
      companyName: companyName || 'Private Enterprise',
      email: email.toLowerCase(),
      phone,
      zipCode,
      deliveryType: deliveryType || 'standard-dock',
      urgency: urgency || 'immediate',
      items,
      comments: comments || '',
      status: 'new' as const,
      submittedAt: new Date().toISOString()
    };

    db.addRFQ(rfq);
    return res.status(201).json({ rfq });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to record RFQ' });
  }
});

// Update RFQ Status & Sales Notes (Admin only)
app.patch('/api/rfqs/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, internalNotes } = req.body;
  const updated = db.updateRFQStatus(id, status, internalNotes);
  if (!updated) {
    return res.status(404).json({ error: 'RFQ record not found' });
  }
  return res.json({ rfq: updated });
});

// -------------------------------------------------------------
// 4. CONTACT MESSAGES
// -------------------------------------------------------------

// Get Messages (Admin only)
app.get('/api/messages', authenticateToken, requireAdmin, (_req, res) => {
  return res.json({ messages: db.getMessages() });
});

// Post Contact Message (Public)
app.post('/api/messages', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const msg = {
    id: `msg_${Date.now().toString(36)}`,
    name,
    email: email.toLowerCase(),
    message,
    status: 'unread' as const,
    createdAt: new Date().toISOString()
  };

  db.addMessage(msg);
  return res.status(201).json({ message: msg });
});

// Update Message Status (Admin only)
app.patch('/api/messages/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = db.updateMessageStatus(id, status);
  if (!updated) return res.status(404).json({ error: 'Message not found' });
  return res.json({ message: updated });
});

// -------------------------------------------------------------
// 5. SITE SETTINGS & ANALYTICS STATS
// -------------------------------------------------------------

// Get Settings (Public)
app.get('/api/settings', (_req, res) => {
  return res.json({ settings: db.getSettings() });
});

// Update Settings (Admin only)
app.put('/api/settings', authenticateToken, requireAdmin, (req, res) => {
  const updated = db.updateSettings(req.body);
  return res.json({ settings: updated });
});

// Get Dashboard Summary Stats (Admin only)
app.get('/api/stats', authenticateToken, requireAdmin, (_req, res) => {
  const rfqs = db.getRFQs();
  const products = db.getProducts();
  const messages = db.getMessages();
  const users = db.getUsers();

  const pipelineValue = rfqs.reduce((sum, rfq) => {
    const rfqTotal = rfq.items.reduce((s, i) => s + (i.msrp * i.quantity), 0);
    return sum + rfqTotal;
  }, 0);

  const newRFQsCount = rfqs.filter(r => r.status === 'new').length;
  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;

  return res.json({
    stats: {
      totalProducts: products.length,
      inStockProducts: products.filter(p => p.inStock).length,
      totalRFQs: rfqs.length,
      newRFQsCount,
      pipelineValue,
      totalMessages: messages.length,
      unreadMessagesCount,
      totalUsers: users.length
    }
  });
});

import { BackendAIAgent, AGENT_TOOLS } from './agent/agentEngine.js';

// In-memory execution history log
const agentExecutionHistory: any[] = [];

// -------------------------------------------------------------
// 6. BACKEND AI AGENT PLATFORM ROUTES
// -------------------------------------------------------------

// List Available Agent Tools
app.get('/api/agent/tools', authenticateToken, requireAdmin, (_req, res) => {
  return res.json({ tools: AGENT_TOOLS });
});

// Execute Autonomous AI Agent Task
app.post('/api/agent/execute', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { prompt, provider, model, apiKey } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt instruction is required' });
    }

    const agent = new BackendAIAgent(provider || 'gemini', model || 'gemini-2.5-flash', apiKey);
    const result = await agent.executeTask(prompt);

    const logEntry = {
      id: `task_${Date.now()}`,
      userId: req.user?.id,
      userName: req.user?.name,
      prompt,
      executedActions: result.executedActions,
      timestamp: new Date().toISOString()
    };
    agentExecutionHistory.unshift(logEntry);

    return res.json(result);
  } catch (err: any) {
    console.error('Agent execution error:', err);
    return res.status(500).json({ error: err.message || 'Agent failed to execute task' });
  }
});

// Export app for Vercel Serverless Functions
export { app };

// Start standalone HTTP server when executed directly in Node
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`⚡ KingLift Control Backend API running on port ${PORT}`);
  });
}



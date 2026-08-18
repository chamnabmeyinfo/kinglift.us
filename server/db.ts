import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'sales' | 'customer';
  company?: string;
  phone?: string;
  createdAt: string;
}

export interface RFQRecord {
  id: string;
  userId?: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  zipCode: string;
  deliveryType: string;
  urgency: string;
  items: {
    modelNumber: string;
    name: string;
    quantity: number;
    msrp: number;
  }[];
  comments?: string;
  status: 'new' | 'in-review' | 'quote-sent' | 'approved' | 'closed';
  internalNotes?: string;
  submittedAt: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface SiteSettings {
  brandName: string;
  phone: string;
  email: string;
  announcementText: string;
  announcementActive: boolean;
  warrantyStandard: string;
  usHubs: { city: string; role: string }[];
}

export interface DatabaseSchema {
  users: User[];
  products: any[];
  rfqs: RFQRecord[];
  messages: ContactMessage[];
  settings: SiteSettings;
}

const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'KingLift™ US Direct',
  phone: '1-800-555-KING (5464)',
  email: 'sales@kinglift.us',
  announcementText: 'DIRECT FACTORY DISPATCH: 48-Hour Nationwide US Freight from Chicago & Dallas Hubs',
  announcementActive: true,
  warrantyStandard: '3 to 5-Year Powertrain & Lithium Battery Warranty',
  usHubs: [
    { city: 'Chicago, IL', role: 'Central Logistics & Parts Depot' },
    { city: 'Dallas, TX', role: 'Southern Distribution Hub' },
    { city: 'Atlanta, GA', role: 'Southeast Freight Center' },
    { city: 'Ontario, CA', role: 'Western Logistics Center' }
  ]
};

// Initial Default Machinery Seed
const INITIAL_PRODUCTS = [
  {
    id: 'kl-ep-4500',
    modelNumber: 'KL-EP45Li',
    name: 'KingLift Pro-Lithium 4,500 lbs Electric Pallet Jack',
    category: 'electric-pallet-trucks',
    series: 'Apex Warehouse Series',
    tagline: 'Ultracompact 48V Lithium-Ion walkie pallet jack built for high-throughput logistics.',
    description: 'The KingLift KL-EP45Li is engineered for demanding warehouse environments, tight dock loading, and retail distribution centers. Powered by a quick-swap 48V/30Ah Lithium Iron Phosphate battery pack, it offers 4 hours of continuous runtime with rapid 2-hour opportunity charging. Features an ergonomic tiller head with PIN-code entry, dual butterfly thumb controls, and upright-handle crawl mode for maneuvering inside tight 53ft trailer beds.',
    highlightSpecs: {
      capacity: '4,500 lbs',
      liftHeight: '7.8 in',
      power: '48V Li-Ion',
      weight: '360 lbs'
    },
    features: [
      'Quick-swap 48V / 30Ah Lithium-Ion battery with opportunity charging',
      'Pin-code access & digital diagnostic display screen',
      'Turtle crawl speed mode for driving with tiller in full vertical position',
      'Reinforced stamped steel chassis with zero maintenance brushless AC motor',
      'Heavy polyurethane load wheels with steel entry/exit rollers'
    ],
    specs: {
      ratedCapacityLbs: 4500,
      ratedCapacityKg: 2041,
      maxLiftHeightInches: 7.8,
      maxLiftHeightMm: 200,
      loweredHeightInches: 3.2,
      forkLengthInches: 48,
      forkWidthInches: 27,
      turningRadiusInches: 53.5,
      powerSource: '48V Lithium-Ion',
      batterySpecs: '48V / 30Ah LiFePO4 with 110V Fast Charger',
      driveMotorKw: 0.9,
      liftMotorKw: 0.8,
      operatingWeightLbs: 360,
      travelSpeedMph: { laden: 3.0, unladen: 3.4 },
      wheelType: 'Heavy Polyurethane',
      warrantyMonths: 36
    },
    pricing: { startingMSRP: 2850, callForCustomQuote: false, leadTimeDays: 3 },
    images: {
      hero: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    inStock: true,
    featured: true,
    popularRank: 1,
    certifications: ['OSHA 1910.178 Compliant', 'ANSI/ITSDF B56.1', 'CE Certified', 'UL Battery Certified']
  },
  {
    id: 'kl-ep-6000-hd',
    modelNumber: 'KL-EP60HD',
    name: 'KingLift Titan 6,000 lbs Heavy-Duty Electric Pallet Truck',
    category: 'electric-pallet-trucks',
    series: 'Titan Industrial Series',
    tagline: 'High-tonnage electric pallet mover engineered for cold storage and heavy manufacturing.',
    description: 'When standard pallet trucks hit their limits, the KingLift Titan KL-EP60HD takes over. Built with 8mm thick solid steel bumper plates, a 1.5 kW high-torque AC drive motor, and dual tandem load wheels, this workhorse effortlessly moves 6,000 lb dense raw materials, steel dies, and multi-pallet distribution cargo.',
    highlightSpecs: {
      capacity: '6,000 lbs',
      liftHeight: '8.2 in',
      power: '48V Li-Ion',
      weight: '620 lbs'
    },
    features: [
      'Heavy-tonnage 6,000 lbs continuous load rating',
      'Dual tandem polyurethane load rollers for smooth threshold transitions',
      'Electronic power steering assist reduces operator fatigue by 70%',
      'Sealed IP65 electronics for refrigerated warehouse environments'
    ],
    specs: {
      ratedCapacityLbs: 6000,
      ratedCapacityKg: 2721,
      maxLiftHeightInches: 8.2,
      maxLiftHeightMm: 208,
      loweredHeightInches: 3.3,
      forkLengthInches: 48,
      forkWidthInches: 27,
      turningRadiusInches: 58.2,
      powerSource: '48V Lithium-Ion',
      batterySpecs: '48V / 50Ah Heavy Lithium-Ion Pack',
      driveMotorKw: 1.5,
      liftMotorKw: 1.2,
      operatingWeightLbs: 620,
      travelSpeedMph: { laden: 3.5, unladen: 4.1 },
      wheelType: 'Heavy Polyurethane',
      warrantyMonths: 36
    },
    pricing: { startingMSRP: 4200, callForCustomQuote: false, leadTimeDays: 4 },
    images: {
      hero: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
      gallery: ['https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80']
    },
    inStock: true,
    featured: true,
    popularRank: 2,
    certifications: ['OSHA 1910.178', 'ANSI/ITSDF B56.1', 'ISO 9001:2015']
  },
  {
    id: 'kl-sc-1900',
    modelNumber: 'KL-SC19Li',
    name: 'KingLift Compact 19ft Electric Scissor Lift',
    category: 'scissor-lifts',
    series: 'SkyMaster Aerial Series',
    tagline: 'Zero-emission 19-foot platform height slab scissor lift for interior facility maintenance.',
    description: 'The KingLift KL-SC19Li combines whisper-quiet electric drive with high maneuverability. Fits through standard 32" doorway openings and inside passenger elevators without folding rails.',
    highlightSpecs: {
      capacity: '550 lbs',
      liftHeight: '19 ft (228 in)',
      power: '24V Li-Ion',
      weight: '2,150 lbs'
    },
    features: [
      'Fits standard 32" single commercial doors and elevators',
      '36-inch manual roll-out cantilever deck extension',
      'Automatic active pothole protection deployment',
      'Full proportional joystick for ultra-precise creep positioning'
    ],
    specs: {
      ratedCapacityLbs: 550,
      ratedCapacityKg: 250,
      maxLiftHeightInches: 228,
      maxLiftHeightMm: 5800,
      loweredHeightInches: 78,
      turningRadiusInches: 48,
      powerSource: '24V Lithium-Ion',
      batterySpecs: '24V / 120Ah LiFePO4 with Onboard Smart Charger',
      driveMotorKw: 1.1,
      liftMotorKw: 2.2,
      operatingWeightLbs: 2150,
      wheelType: 'Non-Marking Solid Rubber',
      warrantyMonths: 60
    },
    pricing: { startingMSRP: 11450, callForCustomQuote: false, leadTimeDays: 5 },
    images: {
      hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      gallery: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80']
    },
    inStock: true,
    featured: true,
    popularRank: 3,
    certifications: ['ANSI A92.20 Compliant', 'CSA B354.6', 'CE Certified']
  }
];

class Database {
  private data: DatabaseSchema;

  constructor() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Failed to parse db.json, creating new database', err);
        this.data = this.createDefaultData();
        this.save();
      }
    } else {
      this.data = this.createDefaultData();
      this.save();
    }
  }

  private createDefaultData(): DatabaseSchema {
    // Generate default admin password hash ("admin1234")
    const salt = bcrypt.genSaltSync(10);
    const adminPasswordHash = bcrypt.hashSync('admin1234', salt);

    const defaultAdmin: User = {
      id: 'usr_admin_kinglift',
      name: 'KingLift Master Administrator',
      email: 'admin@kinglift.us',
      passwordHash: adminPasswordHash,
      role: 'admin',
      company: 'KingLift Headquarters USA',
      phone: '1-800-555-5464',
      createdAt: new Date().toISOString()
    };

    return {
      users: [defaultAdmin],
      products: INITIAL_PRODUCTS,
      rfqs: [
        {
          id: 'RFQ-DEMO-001',
          fullName: 'Marcus Vance',
          companyName: 'Apex Distribution Hub',
          email: 'marcus.vance@apexlogistics.com',
          phone: '(312) 555-0199',
          zipCode: '60607',
          deliveryType: 'standard-dock',
          urgency: 'immediate',
          items: [
            { modelNumber: 'KL-EP45Li', name: 'KingLift Pro-Lithium 4,500 lbs Electric Pallet Jack', quantity: 3, msrp: 2850 },
            { modelNumber: 'KL-SC19Li', name: 'KingLift Compact 19ft Electric Scissor Lift', quantity: 1, msrp: 11450 }
          ],
          status: 'in-review',
          internalNotes: 'Client requests fast shipping to Chicago facility. Net-30 credit application pending.',
          submittedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        }
      ],
      messages: [
        {
          id: 'msg_001',
          name: 'Sarah Jenkins',
          email: 'sjenkins@midwestwarehousing.com',
          message: 'Can you provide technical spec on whether the KL-EP45Li fits inside high-cube refrigerated container reefers?',
          status: 'unread',
          createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
        }
      ],
      settings: INITIAL_SETTINGS
    };
  }

  public save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write database file', e);
    }
  }

  // Users
  public getUsers() { return this.data.users; }
  public getUserById(id: string) { return this.data.users.find(u => u.id === id); }
  public getUserByEmail(email: string) { return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase()); }
  public addUser(user: User) {
    this.data.users.push(user);
    this.save();
    return user;
  }

  // Products
  public getProducts() { return this.data.products; }
  public getProductById(id: string) { return this.data.products.find(p => p.id === id); }
  public addProduct(product: any) {
    this.data.products.unshift(product);
    this.save();
    return product;
  }
  public updateProduct(id: string, updates: any) {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.products[idx] = { ...this.data.products[idx], ...updates };
      this.save();
      return this.data.products[idx];
    }
    return null;
  }
  public deleteProduct(id: string) {
    this.data.products = this.data.products.filter(p => p.id !== id);
    this.save();
    return true;
  }

  // RFQs
  public getRFQs() { return this.data.rfqs; }
  public getRFQById(id: string) { return this.data.rfqs.find(r => r.id === id); }
  public addRFQ(rfq: RFQRecord) {
    this.data.rfqs.unshift(rfq);
    this.save();
    return rfq;
  }
  public updateRFQStatus(id: string, status: RFQRecord['status'], internalNotes?: string) {
    const rfq = this.data.rfqs.find(r => r.id === id);
    if (rfq) {
      rfq.status = status;
      if (internalNotes !== undefined) rfq.internalNotes = internalNotes;
      rfq.updatedAt = new Date().toISOString();
      this.save();
      return rfq;
    }
    return null;
  }

  // Messages
  public getMessages() { return this.data.messages; }
  public addMessage(msg: ContactMessage) {
    this.data.messages.unshift(msg);
    this.save();
    return msg;
  }
  public updateMessageStatus(id: string, status: ContactMessage['status']) {
    const msg = this.data.messages.find(m => m.id === id);
    if (msg) {
      msg.status = status;
      this.save();
      return msg;
    }
    return null;
  }

  // Settings
  public getSettings() { return this.data.settings; }
  public updateSettings(updates: Partial<SiteSettings>) {
    this.data.settings = { ...this.data.settings, ...updates };
    this.save();
    return this.data.settings;
  }
}

export const db = new Database();

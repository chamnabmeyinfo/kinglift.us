export type ProductCategory = 
  | 'all'
  | 'electric-pallet-trucks'
  | 'scissor-lifts'
  | 'hydraulic-stackers'
  | 'tail-lifts'
  | 'dock-equipment'
  | 'shop-cranes';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  count?: number;
}

export interface ProductSpec {
  ratedCapacityLbs: number;
  ratedCapacityKg: number;
  maxLiftHeightInches: number;
  maxLiftHeightMm: number;
  loweredHeightInches: number;
  forkLengthInches?: number;
  forkWidthInches?: number;
  platformLengthInches?: number;
  platformWidthInches?: number;
  turningRadiusInches: number;
  powerSource: '48V Lithium-Ion' | '24V Lithium-Ion' | '24V AGM Deep Cycle' | 'Hydraulic Manual' | 'Vehicle 12/24V Hydraulic' | 'AC Electric';
  batterySpecs?: string;
  driveMotorKw?: number;
  liftMotorKw?: number;
  operatingWeightLbs: number;
  travelSpeedMph?: {
    laden: number;
    unladen: number;
  };
  wheelType: 'Heavy Polyurethane' | 'Non-Marking Solid Rubber' | 'Nylon Roller';
  warrantyMonths: number;
}

export interface Product {
  id: string;
  modelNumber: string;
  name: string;
  category: ProductCategory;
  series: string;
  tagline: string;
  description: string;
  highlightSpecs: {
    capacity: string;
    liftHeight: string;
    power: string;
    weight: string;
  };
  features: string[];
  specs: ProductSpec;
  pricing: {
    startingMSRP: number;
    callForCustomQuote?: boolean;
    leadTimeDays: number;
  };
  images: {
    hero: string;
    gallery: string[];
    diagram?: string;
  };
  inStock: boolean;
  featured: boolean;
  popularRank?: number;
  certifications: string[];
  accessories?: {
    name: string;
    price: number;
    description: string;
  }[];
}

export interface QuoteCartItem {
  product: Product;
  quantity: number;
  selectedPower?: string;
  selectedAccessories?: string[];
  customNotes?: string;
}

export interface RFQSubmission {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  zipCode: string;
  deliveryType: 'standard-dock' | 'liftgate-needed' | 'commercial-flatbed';
  urgency: 'immediate' | '1-2-weeks' | 'next-month' | 'planning-budget';
  items: {
    modelNumber: string;
    name: string;
    quantity: number;
    msrp: number;
  }[];
  comments?: string;
  submittedAt: string;
}

export interface LiftCalculationCriteria {
  requiredLoadLbs: number;
  reachHeightInches: number;
  aisleWidthInches: number;
  primaryApplication: 'pallet-loading' | 'high-rack-stacking' | 'aerial-maintenance' | 'truck-loading';
  preferredPower: 'lithium' | 'any';
}

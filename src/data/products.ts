import type { Product } from '../types';

export const PRODUCTS: Product[] = [
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
      travelSpeedMph: {
        laden: 3.0,
        unladen: 3.4
      },
      wheelType: 'Heavy Polyurethane',
      warrantyMonths: 36
    },
    pricing: {
      startingMSRP: 2850,
      callForCustomQuote: false,
      leadTimeDays: 3
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    inStock: true,
    featured: true,
    popularRank: 1,
    certifications: ['OSHA 1910.178 Compliant', 'ANSI/ITSDF B56.1', 'CE Certified', 'UL Battery Certified'],
    accessories: [
      { name: 'Spare 48V 30Ah Lithium Battery Pack', price: 650, description: 'Allows 24/7 non-stop dual-shift hot swapping.' },
      { name: 'Heavy-Duty 48" Load Backrest', price: 180, description: 'Prevents tall pallet loads from shifting back onto handle.' }
    ]
  },
  {
    id: 'kl-ep-6000-hd',
    modelNumber: 'KL-EP60HD',
    name: 'KingLift Titan 6,000 lbs Heavy-Duty Electric Pallet Truck',
    category: 'electric-pallet-trucks',
    series: 'Titan Industrial Series',
    tagline: 'High-tonnage electric pallet mover engineered for cold storage and heavy manufacturing.',
    description: 'When standard pallet trucks hit their limits, the KingLift Titan KL-EP60HD takes over. Built with 8mm thick solid steel bumper plates, a 1.5 kW high-torque AC drive motor, and dual tandem load wheels, this workhorse effortlessly moves 6,000 lb dense raw materials, steel dies, and multi-pallet distribution cargo. Features regenerative electronic braking and cold-storage package readiness.',
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
      'Sealed IP65 electronics for refrigerated warehouse environments',
      'High-output 1.5 kW AC brushless drive system'
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
      travelSpeedMph: {
        laden: 3.5,
        unladen: 4.1
      },
      wheelType: 'Heavy Polyurethane',
      warrantyMonths: 36
    },
    pricing: {
      startingMSRP: 4200,
      callForCustomQuote: false,
      leadTimeDays: 4
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    inStock: true,
    featured: true,
    popularRank: 2,
    certifications: ['OSHA 1910.178', 'ANSI/ITSDF B56.1', 'ISO 9001:2015', 'IP65 Water/Dust Resistant'],
    accessories: [
      { name: 'Cold-Storage Package (-20°F Rating)', price: 350, description: 'Synthetic low-temp hydraulic fluid and heated handle grip.' },
      { name: 'Fold-Down Operator Platform & Side Guard Arms', price: 850, description: 'Converts walkie into ride-on long-distance transport.' }
    ]
  },
  {
    id: 'kl-sc-1900',
    modelNumber: 'KL-SC19Li',
    name: 'KingLift Compact 19ft Electric Scissor Lift',
    category: 'scissor-lifts',
    series: 'SkyMaster Aerial Series',
    tagline: 'Zero-emission 19-foot platform height slab scissor lift for interior facility maintenance.',
    description: 'The KingLift KL-SC19Li combines whisper-quiet electric drive with high maneuverability. Fits through standard 32" doorway openings and inside passenger elevators without folding rails. Equipped with a 36" slide-out deck extension, proportional drive & lift joysticks, pothole protection guards, and emergency manual descent valves. Powered by maintenance-free 24V Lithium Iron Phosphate cells.',
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
      'Full proportional joystick for ultra-precise creep positioning',
      'Non-marking solid rubber tires leave zero streaks on finished floors'
    ],
    specs: {
      ratedCapacityLbs: 550,
      ratedCapacityKg: 250,
      maxLiftHeightInches: 228,
      maxLiftHeightMm: 5800,
      loweredHeightInches: 78,
      platformLengthInches: 64,
      platformWidthInches: 29,
      turningRadiusInches: 48,
      powerSource: '24V Lithium-Ion',
      batterySpecs: '24V / 120Ah LiFePO4 with Onboard Smart Charger',
      driveMotorKw: 1.1,
      liftMotorKw: 2.2,
      operatingWeightLbs: 2150,
      travelSpeedMph: {
        laden: 0.5,
        unladen: 2.5
      },
      wheelType: 'Non-Marking Solid Rubber',
      warrantyMonths: 60
    },
    pricing: {
      startingMSRP: 11450,
      callForCustomQuote: false,
      leadTimeDays: 5
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    inStock: true,
    featured: true,
    popularRank: 3,
    certifications: ['ANSI A92.20 Compliant', 'CSA B354.6', 'CE Certified', 'OSHA Aerial Platform Standard'],
    accessories: [
      { name: '110V AC Power Outlet to Platform', price: 290, description: 'Power drills, lights, and heat guns directly from top basket.' },
      { name: 'Tool Caddy & Pipe Cradle Attachment', price: 420, description: 'Safely holds electrical conduit and pipe during installs.' }
    ]
  },
  {
    id: 'kl-sc-2600-hd',
    modelNumber: 'KL-SC26HD',
    name: 'KingLift 26ft All-Access Industrial Scissor Lift',
    category: 'scissor-lifts',
    series: 'SkyMaster Aerial Series',
    tagline: 'High-reach 26ft platform with heavy 900 lbs platform payload for dual-technician installations.',
    description: 'Designed for commercial electrical contractors, industrial painting, HVAC duct runs, and tall warehouse racking maintenance. The KL-SC26HD delivers a full 32ft working height with dual-man 900 lbs payload capacity. Features high-grade structural steel scissor arms, multi-disc wet brakes, and smart tilt-alarm sensors.',
    highlightSpecs: {
      capacity: '900 lbs',
      liftHeight: '26 ft (312 in)',
      power: '24V AGM Deep Cycle',
      weight: '4,450 lbs'
    },
    features: [
      'Large 900 lbs platform capacity supports 2 operators plus heavy tooling',
      'Dual front-wheel hydraulic direct drive with 25% gradeability',
      'Full-height drive capability with automatic speed dampener',
      'Forklift transport pockets and 4-point crane lifting lugs',
      'Diagnostic onboard LED fault code reader'
    ],
    specs: {
      ratedCapacityLbs: 900,
      ratedCapacityKg: 408,
      maxLiftHeightInches: 312,
      maxLiftHeightMm: 7925,
      loweredHeightInches: 88,
      platformLengthInches: 89,
      platformWidthInches: 46,
      turningRadiusInches: 85,
      powerSource: '24V AGM Deep Cycle',
      batterySpecs: '4 x 6V 225Ah Deep Cycle Trojan Commercial Batteries',
      driveMotorKw: 1.8,
      liftMotorKw: 3.3,
      operatingWeightLbs: 4450,
      travelSpeedMph: {
        laden: 0.5,
        unladen: 2.2
      },
      wheelType: 'Non-Marking Solid Rubber',
      warrantyMonths: 36
    },
    pricing: {
      startingMSRP: 16800,
      callForCustomQuote: false,
      leadTimeDays: 7
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    inStock: true,
    featured: false,
    certifications: ['ANSI A92.20 Compliant', 'OSHA 1926.453', 'CE Certified'],
    accessories: [
      { name: 'Flashing Amber Beacon & Motion Alarm', price: 175, description: 'High-visibility safety strobe for active job sites.' }
    ]
  },
  {
    id: 'kl-st-3300',
    modelNumber: 'KL-ST33',
    name: 'KingLift Full-Electric 130" Straddle Walkie Stacker',
    category: 'hydraulic-stackers',
    series: 'ReachPro Stacker Series',
    tagline: 'Versatile 3,300 lbs straddle stacker for narrow aisle pallet racking and mezzanine loading.',
    description: 'The KL-ST33 is the ultimate economic alternative to expensive sit-down forklifts. Capable of stacking standard 48x40 pallets up to 130 inches (10.8 ft) high in narrow 6.5ft aisles. Features adjustable outrigger base legs (38" to 50" inside spread) and Class II ITA adjustable forged forks. Smooth proportional hydraulic lifting and lowering ensures delicate freight is handled with zero shock.',
    highlightSpecs: {
      capacity: '3,300 lbs',
      liftHeight: '130 in (10.8 ft)',
      power: '24V AGM Deep Cycle',
      weight: '1,890 lbs'
    },
    features: [
      'Adjustable straddle legs fit both standard GMA pallets and enclosed bottom skids',
      'Dual-cylinder wide-view I-beam mast for clear forward visibility',
      'Proportional lift/lower valve with magnetic limit stop switch',
      'Electronic throttle control with emergency belly-button reverse stop',
      'Built-in 110V AC charging plug (plugs into any standard wall outlet)'
    ],
    specs: {
      ratedCapacityLbs: 3300,
      ratedCapacityKg: 1496,
      maxLiftHeightInches: 130,
      maxLiftHeightMm: 3300,
      loweredHeightInches: 82,
      forkLengthInches: 42,
      forkWidthInches: 4,
      turningRadiusInches: 56,
      powerSource: '24V AGM Deep Cycle',
      batterySpecs: '24V / 105Ah Maintenance-Free Lead-Carbon/AGM',
      driveMotorKw: 0.75,
      liftMotorKw: 2.2,
      operatingWeightLbs: 1890,
      travelSpeedMph: {
        laden: 2.8,
        unladen: 3.2
      },
      wheelType: 'Heavy Polyurethane',
      warrantyMonths: 36
    },
    pricing: {
      startingMSRP: 5400,
      callForCustomQuote: false,
      leadTimeDays: 4
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    inStock: true,
    featured: true,
    popularRank: 4,
    certifications: ['OSHA 1910.178 Compliant', 'ANSI B56.1', 'CE Certified'],
    accessories: [
      { name: 'Wire Mesh Mast Guard Screen', price: 210, description: 'Extra protection for operator hands while preserving visibility.' },
      { name: 'Forged 48-Inch Fork Extensions Pair', price: 280, description: 'Allows handling over-depth pallets safely.' }
    ]
  },
  {
    id: 'kl-tl-2500',
    modelNumber: 'KL-TL25',
    name: 'KingLift Commercial Truck Fold-Away Hydraulic Tail Lift',
    category: 'tail-lifts',
    series: 'FleetLift Transport Series',
    tagline: '2,500 lbs tuckunder hydraulic tailgate lift with dual-cylinder power leveling.',
    description: 'Equip your straight trucks, box vans, and delivery flatbeds with the KingLift KL-TL25 tuckunder tail lift. Folds securely beneath the chassis bed when not in use to allow direct dock loading without interference. Features a lightweight extruded 6061-T6 aluminum platform with dual safety cart stops, hydraulic power pack in an IP67 weatherproof steel housing, and heavy bronze bushings.',
    highlightSpecs: {
      capacity: '2,500 lbs',
      liftHeight: '54 in (Bed Range)',
      power: 'Vehicle 12/24V Hydraulic',
      weight: '680 lbs'
    },
    features: [
      'Tuckunder fold-away platform preserves dock door clearance',
      'Rust-proof ribbed aluminum platform with dual spring assist',
      'Dual hydraulic lifting cylinders with automatic mechanical leveling',
      'Handheld weatherproof pendant controller plus dual body-side toggle switches',
      'Bolt-on mounting plates for rapid installation on standard truck chassis'
    ],
    specs: {
      ratedCapacityLbs: 2500,
      ratedCapacityKg: 1134,
      maxLiftHeightInches: 54,
      maxLiftHeightMm: 1370,
      loweredHeightInches: 0,
      platformLengthInches: 48,
      platformWidthInches: 60,
      turningRadiusInches: 0,
      powerSource: 'Vehicle 12/24V Hydraulic',
      batterySpecs: 'Tied to Truck 12V/24V Battery Bank with 150A Circuit Breaker',
      operatingWeightLbs: 680,
      wheelType: 'Heavy Polyurethane',
      warrantyMonths: 36
    },
    pricing: {
      startingMSRP: 4890,
      callForCustomQuote: false,
      leadTimeDays: 7
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    inStock: true,
    featured: false,
    certifications: ['DOT Compliant', 'TMC RP138 Standards', 'CE Certified'],
    accessories: [
      { name: 'Dual Retractable Roll Cart Stops', price: 320, description: 'Spring-loaded stops prevent wheeled roll containers from sliding off.' },
      { name: 'Trailer Auxiliary Battery Box Kit', price: 460, description: 'Dedicated deep-cycle battery enclosure with smart charge line.' }
    ]
  },
  {
    id: 'kl-dl-30000',
    modelNumber: 'KL-DL30',
    name: 'KingLift 30,000 lbs Hydraulic Edge-of-Dock Leveler',
    category: 'dock-equipment',
    series: 'DockMaster Loading Series',
    tagline: 'Heavy-duty hydraulic dock leveler for seamless truck-to-dock forklift bridging.',
    description: 'Eliminate dangerous gaps and floor height variances at your warehouse loading bay. The KingLift KL-DL30 is a push-button hydraulic dock leveler engineered for 30,000 lbs rollover capacity. Mounts directly to the concrete dock face without requiring expensive deep pit construction.',
    highlightSpecs: {
      capacity: '30,000 lbs',
      liftHeight: '+5" / -5" Span',
      power: 'AC Electric',
      weight: '920 lbs'
    },
    features: [
      'High-yield 55,000 PSI diamond steel tread plate deck',
      'Simple wall-mounted single pushbutton operation with auto-return',
      'Includes two heavy laminated rubber 12" x 13" dock bumpers with steel brackets',
      'Self-cleaning lug-style continuous piano hinge'
    ],
    specs: {
      ratedCapacityLbs: 30000,
      ratedCapacityKg: 13600,
      maxLiftHeightInches: 10,
      maxLiftHeightMm: 254,
      loweredHeightInches: 0,
      platformLengthInches: 72,
      platformWidthInches: 66,
      turningRadiusInches: 0,
      powerSource: 'AC Electric',
      batterySpecs: '115V / 230V Single Phase 1.0 HP Hydraulic Pump',
      operatingWeightLbs: 920,
      wheelType: 'Heavy Polyurethane',
      warrantyMonths: 60
    },
    pricing: {
      startingMSRP: 3650,
      callForCustomQuote: false,
      leadTimeDays: 5
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    inStock: true,
    featured: false,
    certifications: ['ANSI MH30.1', 'OSHA 1910.178(k)', 'CE Certified'],
    accessories: [
      { name: 'Pair of Heavy Cast Steel Bumper Caps', price: 240, description: 'Protects rubber bumpers from aggressive backing trailers.' }
    ]
  },
  {
    id: 'kl-cr-5000',
    modelNumber: 'KL-CR50',
    name: 'KingLift 5,000 lbs Counterbalanced Mobile Floor Crane',
    category: 'shop-cranes',
    series: 'Titan Industrial Series',
    tagline: 'Counterbalanced heavy shop crane with power boom lift and ergonomic steer tiller.',
    description: 'Designed for maintenance shops, machine tooling setups, engine pulling, and injection mold handling. Because the counterweight is situated inside the rear chassis, the front mast has zero front legs, allowing the lifting hook to reach directly into machine beds, stamping presses, and trucks without obstruction.',
    highlightSpecs: {
      capacity: '5,000 lbs',
      liftHeight: '144 in (12 ft)',
      power: '24V AGM Deep Cycle',
      weight: '3,200 lbs'
    },
    features: [
      'Counterbalanced rear chassis eliminates front outriggers for zero-obstruction access',
      'Powered hydraulic boom up/down and manual 3-position telescoping reach boom',
      'Forged 360-degree swivel alloy safety latch hook',
      'Dual rear swivel casters with mechanical floor lock brake'
    ],
    specs: {
      ratedCapacityLbs: 5000,
      ratedCapacityKg: 2268,
      maxLiftHeightInches: 144,
      maxLiftHeightMm: 3658,
      loweredHeightInches: 24,
      turningRadiusInches: 62,
      powerSource: '24V AGM Deep Cycle',
      batterySpecs: '24V / 150Ah Deep Cycle with Built-in Charger',
      liftMotorKw: 2.0,
      operatingWeightLbs: 3200,
      wheelType: 'Heavy Polyurethane',
      warrantyMonths: 36
    },
    pricing: {
      startingMSRP: 6900,
      callForCustomQuote: false,
      leadTimeDays: 6
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    inStock: true,
    featured: false,
    certifications: ['ASME B30.28', 'OSHA 1910.179', 'CE Certified'],
    accessories: [
      { name: 'Electric Power Telescoping Boom Extension', price: 1200, description: 'Hydraulic cylinder extends boom under load.' }
    ]
  }
];

import { PRODUCTS } from '../data/products';

// Fallback intelligent responder based on KingLift product specs if no API key is set
const getFallbackKnowledgeResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes('pallet') || q.includes('jack') || q.includes('trailer') || q.includes('4500') || q.includes('6000')) {
    return `For pallet handling, KingLift offers two prime solutions:
1. **KL-EP45Li** (4,500 lbs capacity) — Powered by a 48V Lithium-Ion pack with fast 2-hour opportunity charging. It has an upright crawl-speed feature designed specifically for loading inside standard 53ft freight trailers.
2. **KL-EP60HD** (6,000 lbs capacity) — Built for heavy cold-storage and manufacturing with 8mm thick steel bumpers and power steering assist.

Would you like me to add one of these to your Quote Request list?`;
  }
  
  if (q.includes('scissor') || q.includes('height') || q.includes('aerial') || q.includes('ceiling') || q.includes('19') || q.includes('26')) {
    return `For elevated work and maintenance:
1. **KL-SC19Li** (19ft working height, 550 lbs capacity) — Fits through standard 32" doorway openings and inside passenger elevators without folding handrails.
2. **KL-SC26HD** (26ft platform height / 32ft reach, 900 lbs capacity) — High-payload scissor lift accommodating 2 technicians and heavy tools.

Both feature non-marking tires and comply with ANSI A92.20 safety standards.`;
  }

  if (q.includes('stacker') || q.includes('rack') || q.includes('forklift') || q.includes('mezzanine') || q.includes('3300')) {
    return `For vertical racking without requiring a sit-down forklift license:
- **KL-ST33** (3,300 lbs capacity, 130" max lift height) — Features adjustable straddle outriggers (38" to 50" spread) and Class II ITA forged forks. Works with standard 48x40 GMA pallets and closed skids, and plugs into any standard 110V wall outlet.`;
  }

  if (q.includes('tail') || q.includes('truck') || q.includes('tuckunder') || q.includes('delivery')) {
    return `For commercial truck fleets:
- **KL-TL25** (2,500 lbs capacity) — A heavy tuckunder hydraulic tail lift with an extruded aluminum platform that stows neatly beneath the truck chassis to preserve dock-loading access.`;
  }

  if (q.includes('warranty') || q.includes('parts') || q.includes('shipping') || q.includes('service')) {
    return `KingLift provides factory-direct warranty coverage:
- **Chassis & Structural Mast**: Up to 60 Months warranty.
- **Lithium Batteries & Drive Motors**: 36 Months full replacement warranty.
- **US Freight**: LTL freight delivery with optional liftgate drop-off across all 48 continental US states within 3 to 7 business days.`;
  }

  return `KingLift manufactures heavy-duty material handling machinery including 48V Lithium Pallet Jacks (4,500 - 6,000 lbs), Electric Scissor Lifts (19 - 26 ft), Walkie Stackers (3,300 lbs / 130"), Truck Tail Lifts, and Dock Levelers.

Tell me your load weight (in lbs) and maximum lift height (in feet or inches), and I'll match the optimal KingLift model for your facility!`;
};

export const askKingLiftAssistant = async (prompt: string, apiKey?: string): Promise<string> => {
  const activeKey = apiKey || (import.meta.env.VITE_GEMINI_API_KEY as string | undefined);

  if (!activeKey) {
    // Return domain expert fallback
    await new Promise(res => setTimeout(res, 600)); // natural delay
    return getFallbackKnowledgeResponse(prompt);
  }

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: activeKey });
    
    const contextPrompt = `You are KingLift AI, the official technical sales engineer and equipment advisor for KingLift.us (a premium industrial lifting machinery brand).
Current KingLift Catalog:
${PRODUCTS.map(p => `- ${p.modelNumber} (${p.name}): ${p.tagline} Capacity: ${p.highlightSpecs.capacity}, Height: ${p.highlightSpecs.liftHeight}, Power: ${p.highlightSpecs.power}, MSRP: $${p.pricing.startingMSRP}`).join('\n')}

Instructions:
1. Provide concise, expert, industrial-grade advice.
2. Highlight specific KingLift model numbers and engineering advantages (e.g., Lithium quick-charging, OSHA compliance, straddle adjustments).
3. If the user mentions weight or height, recommend the exact model with safety factor.
4. Keep tone professional, authoritative, and helpful.

User Inquiry: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contextPrompt,
    });

    return response.text || getFallbackKnowledgeResponse(prompt);
  } catch (error) {
    console.warn('Gemini API call failed, using offline domain advisor', error);
    return getFallbackKnowledgeResponse(prompt);
  }
};

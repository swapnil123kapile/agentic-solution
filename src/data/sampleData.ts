import type { Simulation } from '@/types';

// ============================================================
// Seed simulation data — derived from the actual CSV outputs
// (bank_actions, bank_offers, consumer_actions, conversion_metrics,
//  customer_feedback). Mirrors the JSON shape the Python FastAPI
// backend returns. Replace fetchSimulation() in services/api.ts
// to point at the real endpoints.
// ============================================================

export const seedSimulation: Simulation = {
  summary: {
    scenarioName: 'Baseline',
    status: 'completed',
    currentTimestep: 24,
    totalTimesteps: 24,
    progress: 100,
    personas: { banks: 8, consumers: 19 },
    description:
      '8 AI bank agents compete for 19 consumer agents across 24 timesteps. A price war emerges as banks repeatedly undercut each other on interest rates across personal, car, and green energy loan products.',
  },
  kpis: {
    totalConsumers: 19,
    activeConsumers: 18,
    dbWins: 3,
    competitorWins: 11,
    dropOffs: 5,
    recoverableLosses: 3,
    conversionRate: 15.8,
    dbWinRate: 15.8,
  },
  progress: {
    steps: [
      { timestep: 1, label: 'T1', dbWins: 0, competitorWins: 0, dropOffs: 0, activeConsumers: 15 },
      { timestep: 2, label: 'T2', dbWins: 0, competitorWins: 0, dropOffs: 0, activeConsumers: 16 },
      { timestep: 3, label: 'T3', dbWins: 0, competitorWins: 0, dropOffs: 0, activeConsumers: 16 },
      { timestep: 4, label: 'T4', dbWins: 0, competitorWins: 0, dropOffs: 0, activeConsumers: 17 },
      { timestep: 5, label: 'T5', dbWins: 0, competitorWins: 0, dropOffs: 0, activeConsumers: 18 },
      { timestep: 6, label: 'T6', dbWins: 0, competitorWins: 0, dropOffs: 0, activeConsumers: 18 },
      { timestep: 7, label: 'T7', dbWins: 0, competitorWins: 0, dropOffs: 1, activeConsumers: 17 },
      { timestep: 8, label: 'T8', dbWins: 0, competitorWins: 0, dropOffs: 1, activeConsumers: 17 },
      { timestep: 9, label: 'T9', dbWins: 1, competitorWins: 4, dropOffs: 1, activeConsumers: 18 },
      { timestep: 12, label: 'T12', dbWins: 2, competitorWins: 7, dropOffs: 3, activeConsumers: 18 },
      { timestep: 16, label: 'T16', dbWins: 3, competitorWins: 9, dropOffs: 4, activeConsumers: 18 },
      { timestep: 20, label: 'T20', dbWins: 3, competitorWins: 10, dropOffs: 5, activeConsumers: 18 },
      { timestep: 24, label: 'T24', dbWins: 3, competitorWins: 11, dropOffs: 5, activeConsumers: 18 },
    ],
  },
  bankPerformance: {
    banks: [
      { bank: 'DKB', winRate: 36.8, offers: 17, approvalRate: 82.1 },
      { bank: 'ING', winRate: 26.3, offers: 20, approvalRate: 75.5 },
      { bank: 'Santander', winRate: 15.8, offers: 23, approvalRate: 78.4 },
      { bank: 'Commerzbank', winRate: 10.5, offers: 18, approvalRate: 68.2 },
      { bank: 'Deutsche Bank', winRate: 5.3, offers: 24, approvalRate: 65.0 },
      { bank: 'Sparkasse', winRate: 3.2, offers: 23, approvalRate: 70.3 },
      { bank: 'Targobank', winRate: 1.1, offers: 28, approvalRate: 61.5 },
      { bank: 'Volksbanken', winRate: 1.0, offers: 20, approvalRate: 58.8 },
    ],
  },
  funnel: {
    stages: [
      { id: 'lead', stage: 'Lead', value: 19, color: '#F97316' },
      { id: 'application', stage: 'Application', value: 17, color: '#FB923C' },
      { id: 'approval', stage: 'Approval', value: 14, color: '#22D3EE' },
      { id: 'offer', stage: 'Offer', value: 11, color: '#0EA5E9' },
      { id: 'accepted', stage: 'Accepted', value: 5, color: '#3B82F6' },
      { id: 'disbursed', stage: 'Disbursed', value: 3, color: '#6366F1' },
    ],
  },
  losses: {
    totalLosses: 5,
    topReason: 'Competitor offered lower interest rate during price war',
    recommendation:
      'Introduce a targeted rate-matching policy for high-credit applicants and compress approval SLA to 48h to recover 3 customers currently classified as recoverable losses.',
    reasons: [
      { id: 'l1', reason: 'Competitor Rate', value: 2, color: '#F97316' },
      { id: 'l2', reason: 'Approval Delay', value: 1, color: '#F59E0B' },
      { id: 'l3', reason: 'SCHUFA Rejection', value: 1, color: '#EF4444' },
      { id: 'l4', reason: 'Poor UX', value: 1, color: '#22D3EE' },
    ],
  },
  improvements: {
    toggles: [
      { id: 'discount', label: 'Targeted Discount', description: '0.3pp rate reduction for credit-score > 700', icon: 'Percent', active: false, winRateDelta: 4.2, recoverableDelta: 2, dropOffDelta: -2 },
      { id: 'fasterApproval', label: 'Faster Approval', description: 'Reduce approval SLA from 5d to 48h', icon: 'Zap', active: false, winRateDelta: 2.8, recoverableDelta: 1, dropOffDelta: -1 },
      { id: 'documentUpload', label: 'Document Upload', description: 'Digital document collection via portal', icon: 'Upload', active: false, winRateDelta: 1.9, recoverableDelta: 0, dropOffDelta: 0 },
      { id: 'digitalJourney', label: 'Digital Journey', description: 'End-to-end mobile application flow', icon: 'Smartphone', active: false, winRateDelta: 3.4, recoverableDelta: 1, dropOffDelta: -1 },
      { id: 'advisorCallback', label: 'Advisor Callback', description: 'Proactive advisor callback within 24h', icon: 'PhoneCall', active: false, winRateDelta: 1.5, recoverableDelta: 0, dropOffDelta: 0 },
    ],
  },
  recommendations: {
    recommendations: [
      { id: 'r1', title: 'Launch targeted rate-matching for prime applicants', description: 'Auto-match competitor rates for customers with credit score > 700 to recover 2 recoverable losses.', priority: 'high', expectedImpact: '+4.2pp win rate · +2 customers', expectedWinIncrease: 4.2, complexity: 'medium', owner: 'Pricing Team', status: 'not_started' },
      { id: 'r2', title: 'Compress approval SLA from 5 days to 48 hours', description: 'Re-engineer underwriting workflow and add automated decisioning for low-risk applications.', priority: 'high', expectedImpact: '+2.8pp win rate · -1 drop-off', expectedWinIncrease: 2.8, complexity: 'high', owner: 'Operations', status: 'in_progress' },
      { id: 'r3', title: 'Ship end-to-end mobile application journey', description: 'Replace branch-first onboarding with a mobile-native flow including e-sign and document upload.', priority: 'medium', expectedImpact: '+3.4pp win rate · -1 drop-off', expectedWinIncrease: 3.4, complexity: 'high', owner: 'Product & Engineering', status: 'not_started' },
      { id: 'r4', title: 'Proactive advisor callback within 24h', description: 'Route high-intent dropped customers to a dedicated advisor queue for outbound contact.', priority: 'medium', expectedImpact: '+1.5pp win rate', expectedWinIncrease: 1.5, complexity: 'low', owner: 'Customer Success', status: 'not_started' },
      { id: 'r5', title: 'Improve SCHUFA pre-screening communication', description: 'Add transparent pre-qualification step to reduce hard rejections.', priority: 'low', expectedImpact: '-1 avoidable rejection', expectedWinIncrease: 0.8, complexity: 'low', owner: 'Risk & Compliance', status: 'completed' },
    ],
  },
  feedback: {
    entries: [
      { id: 'f1', customer: 'C011', persona: 'Rate-Sensitive Salaried', sentiment: 'negative', rating: 2, comment: 'DKB offered a significantly lower rate on their personal loan. Hard to justify staying with Deutsche Bank when the difference is that clear.', timestep: 9 },
      { id: 'f2', customer: 'C012', persona: 'Speed-First Freelancer', sentiment: 'positive', rating: 5, comment: 'ING approved my loan quickly with a competitive green energy rate. The digital process was smooth.', timestep: 8 },
      { id: 'f3', customer: 'C015', persona: 'Branch-Preferred Traditional', sentiment: 'neutral', rating: 3, comment: 'The advisor was helpful but I had to visit the branch twice for documents. Should be possible online.', timestep: 8 },
      { id: 'f4', customer: 'C018', persona: 'Digital-Native Millennial', sentiment: 'negative', rating: 2, comment: 'Santander had a great rate but the app kept crashing during document upload. Went with ING instead.', timestep: 7 },
      { id: 'f5', customer: 'C014', persona: 'Premium High-Net-Worth', sentiment: 'positive', rating: 4, comment: 'ING offered the best green energy loan rate. The marketplace comparison made it easy to decide.', timestep: 9 },
      { id: 'f6', customer: 'C007', persona: 'Rate-Sensitive Salaried', sentiment: 'negative', rating: 1, comment: 'Waited too long for approval from Deutsche Bank. By the time it came DKB had already closed.', timestep: 12 },
    ],
  },
  comparison: {
    baselineName: 'Baseline',
    improvedName: 'Improved (All Levers)',
    summary: 'Applying all five improvement levers lifts DB win rate from 15.8% to 28.2% and recovers 4 of the 5 lost customers.',
    kpis: [
      { label: 'DB Win Rate', baseline: 15.8, improved: 28.2 },
      { label: 'DB Wins', baseline: 3, improved: 5 },
      { label: 'Recoverable Losses', baseline: 3, improved: 1 },
      { label: 'Drop-offs', baseline: 5, improved: 2 },
      { label: 'Approval Rate', baseline: 65.0, improved: 78.3 },
    ],
  },

  // ---------- World Intelligence ----------
  world: {
    items: [
      { id: 'w1', timestep: 2, category: 'policy', headline: 'Government stimulus for green energy projects', summary: 'New government incentives make green energy loans more attractive, driving demand for eco-friendly financing.', sentiment: 'positive', impact: 'high' },
      { id: 'w2', timestep: 3, category: 'interest_rate', headline: 'ECB holds base rate at 4.5%', summary: 'The European Central Bank maintains its key interest rate, keeping borrowing costs elevated for consumers.', sentiment: 'neutral', impact: 'medium' },
      { id: 'w3', timestep: 5, category: 'inflation', headline: 'In eases to 2.8% in Q1', summary: 'Consumer price inflation continues its downward trend, improving consumer purchasing power.', sentiment: 'positive', impact: 'medium' },
      { id: 'w4', timestep: 6, category: 'employment', headline: 'Unemployment rises to 3.2%', summary: 'Slight uptick in unemployment may affect loan repayment capacity for some segments.', sentiment: 'negative', impact: 'low' },
      { id: 'w5', timestep: 7, category: 'sentiment', headline: 'Consumer lending confidence drops', summary: 'Price war uncertainty and aggressive marketing from banks creates consumer hesitation.', sentiment: 'negative', impact: 'medium' },
      { id: 'w6', timestep: 9, category: 'economic', headline: 'Price war intensifies across all loan categories', summary: 'Multiple banks slash APRs to record lows. DKB leads with 2.45% on green energy loans.', sentiment: 'positive', impact: 'high' },
    ],
  },

  // ---------- Marketplace Intelligence ----------
  marketplace: {
    rankings: [
      { rank: 1, bank: 'DKB', bankId: 'B004', score: 94.2, visibility: 98, rankChange: 0 },
      { rank: 2, bank: 'ING', bankId: 'B003', score: 82.7, visibility: 91, rankChange: 1 },
      { rank: 3, bank: 'Santander', bankId: 'B008', score: 74.5, visibility: 85, rankChange: 2 },
      { rank: 4, bank: 'Commerzbank', bankId: 'B002', score: 68.1, visibility: 78, rankChange: -1 },
      { rank: 5, bank: 'Deutsche Bank', bankId: 'B001', score: 61.3, visibility: 72, rankChange: -1 },
      { rank: 6, bank: 'Sparkasse', bankId: 'B005', score: 55.8, visibility: 64, rankChange: 0 },
      { rank: 7, bank: 'Targobank', bankId: 'B007', score: 42.1, visibility: 51, rankChange: 0 },
      { rank: 8, bank: 'Volksbanken', bankId: 'B006', score: 38.6, visibility: 45, rankChange: -2 },
    ],
    recommendations: [
      { id: 'm1', bank: 'Deutsche Bank', title: 'Improve marketplace visibility', detail: 'Optimize comparison portal listings and invest in targeted marketing to improve ranking from #5.', priority: 'high' },
      { id: 'm2', bank: 'Deutsche Bank', title: 'Match DKB green energy rate', detail: 'DKB leads green energy at 2.45% APR. Consider matching to remain competitive in this segment.', priority: 'high' },
      { id: 'm3', bank: 'Volksbanken', title: 'Review pricing strategy', detail: 'Ranking dropped 2 positions. Current rates are uncompetitive in the ongoing price war.', priority: 'medium' },
    ],
    trends: [
      { timestep: 1, visibilityAvg: 68, offersTotal: 18 },
      { timestep: 3, visibilityAvg: 71, offersTotal: 28 },
      { timestep: 5, visibilityAvg: 74, offersTotal: 35 },
      { timestep: 7, visibilityAvg: 78, offersTotal: 44 },
      { timestep: 9, visibilityAvg: 82, offersTotal: 52 },
    ],
  },

  // ---------- Bank Intelligence ----------
  bankIntel: {
    banks: [
      {
        bankId: 'B001', bankName: 'Deutsche Bank', shortName: 'DB', color: '#3B82F6',
        reputation: 72, winRate: 5.3,
        offers: [
          { offerId: 'B001-loan-std-7', productName: 'Deutsche Bank Personal Loan', productType: 'personal_loan', interestRateApr: 3.7, effectiveRateApr: 3.9, processingFeePct: 1.0, minAmount: 5000, maxAmount: 25000, minTermMonths: 12, maxTermMonths: 60 },
          { offerId: 'B001-loan-premium-7', productName: 'DB Premium Personal Loan', productType: 'personal_loan', interestRateApr: 3.4, effectiveRateApr: 3.6, processingFeePct: 0.5, minAmount: 25001, maxAmount: 75000, minTermMonths: 24, maxTermMonths: 84 },
          { offerId: 'B001-loan-green-6', productName: 'DB Green Energy Loan', productType: 'green_energy_loan', interestRateApr: 2.9, effectiveRateApr: 3.1, processingFeePct: 0.8, minAmount: 10000, maxAmount: 50000, minTermMonths: 24, maxTermMonths: 84 },
          { offerId: 'B001-car-loan-4', productName: 'DB Car Loan', productType: 'car_loan', interestRateApr: 3.2, effectiveRateApr: 3.4, processingFeePct: 0.5, minAmount: 5000, maxAmount: 60000, minTermMonths: 12, maxTermMonths: 72 },
        ],
        actions: [
          { timestep: 1, actionType: 'management', detail: 'Initial market entry and operational setup.', visibility: 'private' },
          { timestep: 2, actionType: 'management', detail: 'Invest in digital transformation to reduce friction and improve customer experience.', visibility: 'private' },
          { timestep: 7, actionType: 'management', detail: 'Price war intensified. Making substantial interest rate cuts across all loan products.', visibility: 'private' },
          { timestep: 9, actionType: 'management', detail: "Launch 'Price Offensive' to challenge market leaders. Undercutting previous rates across all products.", visibility: 'private' },
        ],
        campaigns: [
          { timestep: 6, description: 'Marketing campaign to highlight competitive rates across all loan categories.' },
          { timestep: 9, description: 'Price Offensive campaign challenging DKB, ING, and Volksbanken for market leadership.' },
        ],
      },
      {
        bankId: 'B004', bankName: 'DKB', shortName: 'DKB', color: '#F97316',
        reputation: 91, winRate: 36.8,
        offers: [
          { offerId: 'O015', productName: 'DKB Personal Loan', productType: 'personal_loan', interestRateApr: 3.05, effectiveRateApr: 3.1, processingFeePct: 0.5, minAmount: 1000, maxAmount: 50000, minTermMonths: 12, maxTermMonths: 84 },
          { offerId: 'O016', productName: 'DKB Car Loan', productType: 'car_loan', interestRateApr: 2.75, effectiveRateApr: 2.8, processingFeePct: 0.3, minAmount: 5000, maxAmount: 75000, minTermMonths: 24, maxTermMonths: 96 },
          { offerId: 'O017', productName: 'DKB Green Energy Loan', productType: 'green_energy_loan', interestRateApr: 2.45, effectiveRateApr: 2.5, processingFeePct: 0.2, minAmount: 5000, maxAmount: 100000, minTermMonths: 24, maxTermMonths: 120 },
        ],
        actions: [
          { timestep: 2, actionType: 'product_launch', detail: 'Launching a new loan product tailored for eco-friendly projects in response to government stimulus.', visibility: 'public' },
          { timestep: 7, actionType: 'management_decision', detail: 'Holds #1 rank across all major loan categories. Maintaining leadership without further rate cuts.', visibility: 'public' },
          { timestep: 9, actionType: 'management_decision', detail: "Launching 'Price War Champion' campaign with another strategic rate reduction.", visibility: 'public' },
        ],
        campaigns: [
          { timestep: 7, description: 'Marketing campaign to solidify brand as top choice for borrowers.' },
          { timestep: 9, description: "Price War Champion campaign — reinforcing market leadership." },
        ],
      },
      {
        bankId: 'B003', bankName: 'ING', shortName: 'ING', color: '#22D3EE',
        reputation: 85, winRate: 26.3,
        offers: [
          { offerId: 'B003_offer_18', productName: 'ING Personal Loan', productType: 'personal_loan', interestRateApr: 2.78, effectiveRateApr: 3.08, processingFeePct: 1.5, minAmount: 1000, maxAmount: 50000, minTermMonths: 12, maxTermMonths: 84 },
          { offerId: 'B003_offer_19', productName: 'ING Car Loan', productType: 'car_loan', interestRateApr: 2.58, effectiveRateApr: 2.78, processingFeePct: 1.0, minAmount: 5000, maxAmount: 75000, minTermMonths: 24, maxTermMonths: 96 },
          { offerId: 'B003_offer_20', productName: 'ING Green Energy Loan', productType: 'green_energy_loan', interestRateApr: 2.45, effectiveRateApr: 2.65, processingFeePct: 1.0, minAmount: 5000, maxAmount: 80000, minTermMonths: 24, maxTermMonths: 120 },
        ],
        actions: [
          { timestep: 1, actionType: 'publish_offers', detail: 'Publish initial loan offers for the German market.', visibility: 'private' },
          { timestep: 6, actionType: 'publish_offers', detail: 'Aggressively reduce interest rates to challenge DKB market leadership.', visibility: 'private' },
          { timestep: 9, actionType: 'publish_offers', detail: 'Continue aggressive price-cutting to challenge DKB in the price war.', visibility: 'private' },
        ],
        campaigns: [
          { timestep: 7, description: 'Marketing campaign highlighting competitive rates and challenging for #1 position.' },
        ],
      },
      {
        bankId: 'B008', bankName: 'Santander', shortName: 'SAN', color: '#EF4444',
        reputation: 78, winRate: 15.8,
        offers: [
          { offerId: 'offer_B008_20', productName: 'Santander Green Energy Loan', productType: 'green_energy_loan', interestRateApr: 2.39, effectiveRateApr: 2.49, processingFeePct: 0.5, minAmount: 10000, maxAmount: 75000, minTermMonths: 24, maxTermMonths: 120 },
          { offerId: 'offer_B008_21', productName: 'Santander Personal Loan', productType: 'personal_loan', interestRateApr: 2.85, effectiveRateApr: 2.95, processingFeePct: 1.0, minAmount: 5000, maxAmount: 50000, minTermMonths: 12, maxTermMonths: 84 },
          { offerId: 'offer_B008_22', productName: 'Santander Car Loan', productType: 'car_loan', interestRateApr: 3.1, effectiveRateApr: 3.2, processingFeePct: 0.5, minAmount: 5000, maxAmount: 60000, minTermMonths: 12, maxTermMonths: 84 },
        ],
        actions: [
          { timestep: 2, actionType: 'marketing', detail: "Launch marketing campaign promoting Santander's diverse loan portfolio.", visibility: 'private' },
          { timestep: 7, actionType: 'management', detail: 'Launching aggressive rate cuts, undercutting top competitor APRs for Green and Personal loans.', visibility: 'private' },
          { timestep: 7, actionType: 'marketing', detail: "Santander's Price War Offensive: Green Energy Loan at record-low 2.69% APR.", visibility: 'public' },
        ],
        campaigns: [
          { timestep: 6, description: "Santander's Price War Offensive: Unbeatable Rates on Green and Personal Loans!" },
          { timestep: 7, description: 'Slashed rates to challenge market leaders. Green Energy at 2.69% APR.' },
        ],
      },
      {
        bankId: 'B002', bankName: 'Commerzbank', shortName: 'CB', color: '#8B5CF6',
        reputation: 70, winRate: 10.5,
        offers: [
          { offerId: 'O-B002-016', productName: 'Commerzbank Green Energy Loan', productType: 'green_energy_loan', interestRateApr: 2.85, effectiveRateApr: 2.9, processingFeePct: 0.5, minAmount: 10000, maxAmount: 80000, minTermMonths: 24, maxTermMonths: 120 },
          { offerId: 'O-B002-017', productName: 'Commerzbank Car Loan', productType: 'car_loan', interestRateApr: 3.05, effectiveRateApr: 3.1, processingFeePct: 0.5, minAmount: 10000, maxAmount: 75000, minTermMonths: 24, maxTermMonths: 84 },
          { offerId: 'O-B002-018', productName: 'CB Personal Loan Plus', productType: 'personal_loan', interestRateApr: 3.25, effectiveRateApr: 3.3, processingFeePct: 0.5, minAmount: 5000, maxAmount: 60000, minTermMonths: 12, maxTermMonths: 84 },
        ],
        actions: [
          { timestep: 2, actionType: 'strategy', detail: 'Introduce more competitively priced personal loan and launch marketing campaign.', visibility: 'private' },
          { timestep: 6, actionType: 'strategy', detail: 'Full-blown price war. Repricing Personal Loan Plus with significantly lower rate.', visibility: 'private' },
        ],
        campaigns: [
          { timestep: 8, description: 'Large-scale marketing campaign to amplify competitive rates.' },
        ],
      },
      {
        bankId: 'B005', bankName: 'Sparkasse', shortName: 'SPK', color: '#10B981',
        reputation: 68, winRate: 3.2,
        offers: [
          { offerId: 'B005-O-21', productName: 'Sparkasse Personal Loan', productType: 'personal_loan', interestRateApr: 3.19, effectiveRateApr: 3.39, processingFeePct: 1.0, minAmount: 5000, maxAmount: 75000, minTermMonths: 12, maxTermMonths: 84 },
          { offerId: 'B005-O-22', productName: 'Sparkasse Green Energy Loan', productType: 'green_energy_loan', interestRateApr: 2.75, effectiveRateApr: 2.95, processingFeePct: 1.0, minAmount: 10000, maxAmount: 100000, minTermMonths: 24, maxTermMonths: 120 },
          { offerId: 'B005-O-23', productName: 'Sparkasse Mortgage', productType: 'mortgage', interestRateApr: 3.8, effectiveRateApr: 4.0, processingFeePct: 0.5, minAmount: 100000, maxAmount: 800000, minTermMonths: 120, maxTermMonths: 360 },
        ],
        actions: [
          { timestep: 4, actionType: 'PricingManagement', detail: 'Lowering personal loan rate to attract more customers.', visibility: 'private' },
          { timestep: 7, actionType: 'PricingManagement', detail: 'Drastic price reduction on Personal and Green Energy loans in the price war.', visibility: 'private' },
        ],
        campaigns: [
          { timestep: 4, description: 'Targeted marketing campaign promoting competitive Green Energy and Personal Loan rates.' },
          { timestep: 9, description: "New phase of 'Price War Offensive' with 250,000 EUR budget." },
        ],
      },
      {
        bankId: 'B007', bankName: 'Targobank', shortName: 'TGO', color: '#F59E0B',
        reputation: 55, winRate: 1.1,
        offers: [
          { offerId: 'B007-O-25', productName: 'Targobank Personal Loan', productType: 'personal_loan', interestRateApr: 3.59, effectiveRateApr: 3.59, processingFeePct: 1.0, minAmount: 1000, maxAmount: 50000, minTermMonths: 12, maxTermMonths: 84 },
          { offerId: 'B007-O-26', productName: 'Targobank Car Loan', productType: 'car_loan', interestRateApr: 3.49, effectiveRateApr: 3.49, processingFeePct: 1.0, minAmount: 5000, maxAmount: 60000, minTermMonths: 24, maxTermMonths: 96 },
          { offerId: 'B007-O-28', productName: 'Targobank Small Credit Line', productType: 'small_credit', interestRateApr: 6.19, effectiveRateApr: 6.19, processingFeePct: 1.5, minAmount: 500, maxAmount: 10000, minTermMonths: 6, maxTermMonths: 48 },
        ],
        actions: [
          { timestep: 2, actionType: 'update_service_levels', detail: 'Enabled advisor callback, pre-approved offers, and instant document validation.', visibility: 'private' },
          { timestep: 5, actionType: 'new_offer', detail: 'New offers published across all product categories.', visibility: 'public' },
        ],
        campaigns: [],
      },
      {
        bankId: 'B006', bankName: 'Volksbanken', shortName: 'VB', color: '#94A3B8',
        reputation: 52, winRate: 1.0,
        offers: [
          { offerId: 'B006-GL-T9', productName: 'Green Energy Loan', productType: 'green_energy_loan', interestRateApr: 2.4, effectiveRateApr: 2.6, processingFeePct: 0.5, minAmount: 5000, maxAmount: 75000, minTermMonths: 24, maxTermMonths: 96 },
          { offerId: 'B006-L-1-T9', productName: 'Standard Loan (Small)', productType: 'personal_loan', interestRateApr: 3.8, effectiveRateApr: 4.0, processingFeePct: 1.0, minAmount: 1000, maxAmount: 10000, minTermMonths: 12, maxTermMonths: 36 },
          { offerId: 'B006-L-3-T9', productName: 'Standard Loan (Large)', productType: 'personal_loan', interestRateApr: 2.8, effectiveRateApr: 3.0, processingFeePct: 0.5, minAmount: 50001, maxAmount: 100000, minTermMonths: 73, maxTermMonths: 120 },
        ],
        actions: [
          { timestep: 1, actionType: 'UPDATE_OFFERS', detail: 'Initial launch of loan products.', visibility: 'public' },
          { timestep: 7, actionType: 'UPDATE_OFFERS', detail: 'Significant rate reduction to aggressively compete with market leader DKB.', visibility: 'public' },
        ],
        campaigns: [],
      },
    ],
  },

  // ---------- Consumer Intelligence ----------
  consumerIntel: {
    consumers: [
      { consumerId: 'C011', consumerName: 'Consumer C011', persona: 'Rate-Sensitive Salaried', funnelStage: 'Offer', selectedBank: 'DKB', approvalStatus: 'Approved', loanAmount: 25000, interestRate: 3.1, journey: [
        { timestep: 4, actionType: 'select_offer', funnelStageBefore: 'Application', funnelStageAfter: 'Offer', selectedBank: '' },
        { timestep: 7, actionType: 'select_bank', funnelStageBefore: 'Offer', funnelStageAfter: 'Offer', selectedBank: 'DKB' },
        { timestep: 9, actionType: 'select', funnelStageBefore: 'Offer', funnelStageAfter: 'Accepted', selectedBank: 'DKB' },
      ]},
      { consumerId: 'C012', consumerName: 'Consumer C012', persona: 'Speed-First Freelancer', funnelStage: 'Disbursed', selectedBank: 'ING', approvalStatus: 'Approved', loanAmount: 18000, interestRate: 3.08, journey: [
        { timestep: 4, actionType: 'select_offer', funnelStageBefore: 'Application', funnelStageAfter: 'Offer', selectedBank: '' },
        { timestep: 7, actionType: 'select_bank', funnelStageBefore: 'Offer', funnelStageAfter: 'Offer', selectedBank: 'ING' },
        { timestep: 8, actionType: 'select_loan', funnelStageBefore: 'Offer', funnelStageAfter: 'Accepted', selectedBank: 'ING' },
      ]},
      { consumerId: 'C015', consumerName: 'Consumer C015', persona: 'Branch-Preferred Traditional', funnelStage: 'Accepted', selectedBank: 'ING', approvalStatus: 'Approved', loanAmount: 30000, interestRate: 3.08, journey: [
        { timestep: 4, actionType: 'select_offer', funnelStageBefore: 'Application', funnelStageAfter: 'Offer', selectedBank: '' },
        { timestep: 7, actionType: 'select_bank', funnelStageBefore: 'Offer', funnelStageAfter: 'Offer', selectedBank: 'ING' },
        { timestep: 8, actionType: 'select_loan', funnelStageBefore: 'Offer', funnelStageAfter: 'Accepted', selectedBank: 'ING' },
      ]},
      { consumerId: 'C018', consumerName: 'Consumer C018', persona: 'Digital-Native Millennial', funnelStage: 'Accepted', selectedBank: 'ING', approvalStatus: 'Approved', loanAmount: 12000, interestRate: 3.08, journey: [
        { timestep: 6, actionType: 'start_search', funnelStageBefore: 'Lead', funnelStageAfter: 'Application', selectedBank: '' },
        { timestep: 7, actionType: 'browse_marketplace', funnelStageBefore: 'Application', funnelStageAfter: 'Application', selectedBank: '' },
        { timestep: 8, actionType: 'select_loan', funnelStageBefore: 'Application', funnelStageAfter: 'Accepted', selectedBank: 'ING' },
      ]},
      { consumerId: 'C007', consumerName: 'Consumer C007', persona: 'Rate-Sensitive Salaried', funnelStage: 'Dropped', selectedBank: 'Deutsche Bank', approvalStatus: 'Rejected', loanAmount: 0, interestRate: 0, journey: [
        { timestep: 6, actionType: 'research_offers', funnelStageBefore: 'Lead', funnelStageAfter: 'Application', selectedBank: '' },
        { timestep: 7, actionType: 'engage_with_marketplace', funnelStageBefore: 'Application', funnelStageAfter: 'Application', selectedBank: '' },
        { timestep: 9, actionType: 'select', funnelStageBefore: 'Application', funnelStageAfter: 'Dropped', selectedBank: 'Deutsche Bank' },
      ]},
      { consumerId: 'C001', consumerName: 'Consumer C001', persona: 'Premium High-Net-Worth', funnelStage: 'Application', selectedBank: '', approvalStatus: 'Pending', loanAmount: 50000, interestRate: 0, journey: [
        { timestep: 6, actionType: 'research_offers', funnelStageBefore: 'Lead', funnelStageAfter: 'Application', selectedBank: '' },
        { timestep: 7, actionType: 'engage_with_marketplace', funnelStageBefore: 'Application', funnelStageAfter: 'Application', selectedBank: '' },
        { timestep: 9, actionType: 'select', funnelStageBefore: 'Application', funnelStageAfter: 'Application', selectedBank: '' },
      ]},
    ],
  },

  // ---------- Simulation Health ----------
  health: {
    totalRows: 1085,
    validRows: 1012,
    repairedRows: 71,
    invalidRows: 2,
    issues: [
      { id: 'h1', timestep: 1, source: 'bank_actions.csv', status: 'repaired', errorCount: 12, repairStatus: 'Auto-repaired: action_details -> action_detail', message: 'Column name mismatch in action detail field' },
      { id: 'h2', timestep: 1, source: 'bank_offers.csv', status: 'valid', errorCount: 0, repairStatus: 'No issues', message: 'All offer rows validated successfully' },
      { id: 'h3', timestep: 4, source: 'bank_actions.csv', status: 'repaired', errorCount: 8, repairStatus: 'Auto-repaired: action_details -> action_detail', message: 'Column name mismatch in action detail field' },
      { id: 'h4', timestep: 7, source: 'consumer_actions.csv', status: 'valid', errorCount: 0, repairStatus: 'No issues', message: 'All consumer action rows validated' },
      { id: 'h5', timestep: 9, source: 'conversion_metrics.csv', status: 'valid', errorCount: 0, repairStatus: 'No issues', message: 'Conversion metrics validated' },
      { id: 'h6', timestep: 3, source: 'bank_offers.csv', status: 'invalid', errorCount: 2, repairStatus: 'Pending manual review', message: '2 rows with missing effective_interest_rate_apr' },
    ],
  },
};

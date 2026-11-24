import type { BillingCycle, PlanTierId } from '../types/synthesis';

export interface PricingTier {
  id: PlanTierId;
  name: string;
  summary: string;
  monthlyPerSeat: number | null;
  annualPerSeat: number | null;
  minimumSeats: number;
  ctaLabel: string;
  highlighted?: boolean;
  features: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'team',
    name: 'Team',
    summary: 'For product and engineering squads consolidating sprint status and delivery metrics.',
    monthlyPerSeat: 29,
    annualPerSeat: 24,
    minimumSeats: 5,
    ctaLabel: 'Select Team',
    features: [
      'Up to 3 source integrations (Linear, Jira, GitHub)',
      'Weekly automated stakeholder digests',
      'Cross-team dependency timeline',
      '90-day telemetry retention',
      'Standard email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    summary: 'For multi-squad organizations aligning roadmaps, incident posture, and revenue commitments.',
    monthlyPerSeat: 58,
    annualPerSeat: 48,
    minimumSeats: 15,
    ctaLabel: 'Select Growth',
    highlighted: true,
    features: [
      'Unlimited source integrations + Snowflake & BigQuery sync',
      'Role-specific executive and engineering workspaces',
      'Automated SLA drift & blocker alerts',
      '2-year historical trend retention',
      'SAML SSO & priority onboarding engineer',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    summary: 'For regulated enterprises requiring custom governance, dedicated VPC isolation, and tailored SLAs.',
    monthlyPerSeat: null,
    annualPerSeat: null,
    minimumSeats: 100,
    ctaLabel: 'Request Enterprise Quote',
    features: [
      'Dedicated single-tenant or regional VPC deployment',
      'Custom RBAC policies & audit log streaming',
      'Unlimited historical retention & custom schemas',
      '99.95% contractual uptime SLA',
      'Dedicated solutions architect & quarterly reviews',
    ],
  },
];

export interface SeatEstimate {
  seats: number;
  billingCycle: BillingCycle;
  recommendedTierId: PlanTierId;
  recommendedTierName: string;
  perSeatRate: number | null;
  monthlyTotal: number | null;
  annualTotal: number | null;
  annualSavings: number | null;
  isCustomEnterprise: boolean;
}

export function clampSeatCount(seats: number): number {
  if (!Number.isFinite(seats)) return 25;
  return Math.min(250, Math.max(5, Math.round(seats)));
}

export function calculateSeatEstimate(
  rawSeats: number,
  billingCycle: BillingCycle,
  preferredTierId?: PlanTierId
): SeatEstimate {
  const seats = clampSeatCount(rawSeats);
  const resolvedTierId: PlanTierId =
    preferredTierId ?? (seats >= 100 ? 'enterprise' : seats >= 15 ? 'growth' : 'team');
  const tier = PRICING_TIERS.find((t) => t.id === resolvedTierId) ?? PRICING_TIERS[1];

  if (tier.id === 'enterprise' || tier.monthlyPerSeat === null || tier.annualPerSeat === null) {
    return {
      seats,
      billingCycle,
      recommendedTierId: tier.id,
      recommendedTierName: tier.name,
      perSeatRate: null,
      monthlyTotal: null,
      annualTotal: null,
      annualSavings: null,
      isCustomEnterprise: true,
    };
  }

  const perSeatRate = billingCycle === 'annual' ? tier.annualPerSeat : tier.monthlyPerSeat;
  const monthlyTotal = seats * perSeatRate;
  const annualTotal = monthlyTotal * 12;
  const annualSavings =
    billingCycle === 'annual' ? (tier.monthlyPerSeat - tier.annualPerSeat) * seats * 12 : 0;

  return {
    seats,
    billingCycle,
    recommendedTierId: tier.id,
    recommendedTierName: tier.name,
    perSeatRate,
    monthlyTotal,
    annualTotal,
    annualSavings,
    isCustomEnterprise: false,
  };
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

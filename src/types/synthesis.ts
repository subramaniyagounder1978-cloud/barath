export type RouteKey =
  | 'home'
  | 'platform'
  | 'solutions'
  | 'pricing'
  | 'about'
  | 'faq'
  | 'demo';

export type BillingCycle = 'annual' | 'monthly';

export type PlanTierId = 'team' | 'growth' | 'enterprise';

export interface SelectedPlanContext {
  planId: PlanTierId;
  planName: string;
  seats: number;
  billingCycle: BillingCycle;
}

export interface DemoFormValues {
  fullName: string;
  workEmail: string;
  companyName: string;
  teamSize: string;
  primaryGoal: string;
  notes: string;
  selectedPlan: string;
}

export interface DemoFormErrors {
  fullName?: string;
  workEmail?: string;
  companyName?: string;
  teamSize?: string;
  primaryGoal?: string;
}

export interface FaqItem {
  id: string;
  category: 'Platform' | 'Security' | 'Onboarding' | 'Billing';
  question: string;
  answer: string;
}

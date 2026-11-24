import type { DemoFormErrors, DemoFormValues, FaqItem, RouteKey } from '../types/synthesis';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const VALID_ROUTES: RouteKey[] = [
  'home',
  'platform',
  'solutions',
  'pricing',
  'about',
  'faq',
  'demo',
];

export function parseRouteFromHash(hash: string): RouteKey {
  const cleaned = hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (VALID_ROUTES.includes(cleaned as RouteKey)) {
    return cleaned as RouteKey;
  }
  return 'home';
}

export function formatHashForRoute(route: RouteKey): string {
  return route === 'home' ? '#/' : `#/${route}`;
}

export function validateDemoForm(values: DemoFormValues): DemoFormErrors {
  const errors: DemoFormErrors = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const email = values.workEmail.trim();
  if (!email) {
    errors.workEmail = 'Work email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.workEmail = 'Enter a valid email address (for example, name@company.com).';
  }

  if (!values.companyName.trim()) {
    errors.companyName = 'Company or organization name is required.';
  }

  if (!values.teamSize.trim()) {
    errors.teamSize = 'Select your approximate team size.';
  }

  if (!values.primaryGoal.trim()) {
    errors.primaryGoal = 'Select what you want to review in the walkthrough.';
  }

  return errors;
}

export function hasValidationErrors(errors: DemoFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function filterFaqs(
  items: FaqItem[],
  category: 'All' | FaqItem['category'],
  query: string
): FaqItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.question.toLowerCase().includes(normalizedQuery) ||
      item.answer.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    );
  });
}

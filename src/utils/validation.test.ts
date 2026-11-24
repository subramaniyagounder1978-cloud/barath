import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterFaqs,
  formatHashForRoute,
  hasValidationErrors,
  parseRouteFromHash,
  validateDemoForm,
} from './validation';
import type { FaqItem } from '../types/synthesis';

test('route hash parsing defaults safely and preserves known routes', () => {
  assert.equal(parseRouteFromHash('#/pricing'), 'pricing');
  assert.equal(parseRouteFromHash('#/demo'), 'demo');
  assert.equal(parseRouteFromHash('#/unknown-path'), 'home');
  assert.equal(parseRouteFromHash(''), 'home');
  assert.equal(formatHashForRoute('home'), '#/');
  assert.equal(formatHashForRoute('solutions'), '#/solutions');
});

test('validateDemoForm catches missing or malformed fields and passes valid payloads', () => {
  const invalidErrors = validateDemoForm({
    fullName: 'A',
    workEmail: 'not-an-email',
    companyName: '',
    teamSize: '',
    primaryGoal: '',
    notes: '',
    selectedPlan: 'Growth',
  });

  assert.equal(hasValidationErrors(invalidErrors), true);
  assert.ok(invalidErrors.fullName);
  assert.ok(invalidErrors.workEmail);
  assert.ok(invalidErrors.companyName);
  assert.ok(invalidErrors.teamSize);
  assert.ok(invalidErrors.primaryGoal);

  const validErrors = validateDemoForm({
    fullName: 'Claire Bennett',
    workEmail: 'claire@northstar.io',
    companyName: 'Northstar Logistics',
    teamSize: '50-150',
    primaryGoal: 'Executive & engineering visibility',
    notes: 'Interested in Linear and Snowflake connectors',
    selectedPlan: 'Growth',
  });

  assert.equal(hasValidationErrors(validErrors), false);
});

test('filterFaqs filters by category and search text case-insensitively', () => {
  const sampleFaqs: FaqItem[] = [
    {
      id: '1',
      category: 'Security',
      question: 'Is Synthesis SOC 2 Type II certified?',
      answer: 'Yes, Synthesis maintains continuous SOC 2 Type II compliance.',
    },
    {
      id: '2',
      category: 'Billing',
      question: 'Can we switch between monthly and annual billing?',
      answer: 'Annual plans can be adjusted at renewal or seat expansion.',
    },
  ];

  assert.equal(filterFaqs(sampleFaqs, 'All', '').length, 2);
  assert.equal(filterFaqs(sampleFaqs, 'Security', '').length, 1);
  assert.equal(filterFaqs(sampleFaqs, 'All', 'soc 2').length, 1);
  assert.equal(filterFaqs(sampleFaqs, 'Billing', 'soc 2').length, 0);
});

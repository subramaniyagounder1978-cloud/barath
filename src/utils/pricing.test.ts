import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSeatEstimate, clampSeatCount, formatUsd } from './pricing';

test('clampSeatCount restricts bounds between 5 and 250', () => {
  assert.equal(clampSeatCount(1), 5);
  assert.equal(clampSeatCount(42), 42);
  assert.equal(clampSeatCount(999), 250);
  assert.equal(clampSeatCount(Number.NaN), 25);
});

test('calculateSeatEstimate applies annual discount for Growth tier', () => {
  const annual = calculateSeatEstimate(25, 'annual', 'growth');
  assert.equal(annual.perSeatRate, 48);
  assert.equal(annual.monthlyTotal, 1200);
  assert.equal(annual.annualTotal, 14400);
  assert.equal(annual.annualSavings, 3000);
  assert.equal(annual.isCustomEnterprise, false);

  const monthly = calculateSeatEstimate(25, 'monthly', 'growth');
  assert.equal(monthly.perSeatRate, 58);
  assert.equal(monthly.monthlyTotal, 1450);
  assert.equal(monthly.annualSavings, 0);
});

test('calculateSeatEstimate marks Enterprise tier as custom quote', () => {
  const enterprise = calculateSeatEstimate(120, 'annual');
  assert.equal(enterprise.recommendedTierId, 'enterprise');
  assert.equal(enterprise.isCustomEnterprise, true);
  assert.equal(enterprise.monthlyTotal, null);
});

test('formatUsd formats currency without decimals', () => {
  assert.equal(formatUsd(14400), '$14,400');
});

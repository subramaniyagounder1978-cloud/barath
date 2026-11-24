import { useState } from 'react';
import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import type { BillingCycle, PlanTierId, SelectedPlanContext } from '../types/synthesis';
import {
  calculateSeatEstimate,
  clampSeatCount,
  formatUsd,
  PRICING_TIERS,
} from '../utils/pricing';

interface PricingPageProps {
  onSelectPlanForDemo: (context: SelectedPlanContext) => void;
}

export function PricingPage({ onSelectPlanForDemo }: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [seats, setSeats] = useState<number>(25);

  const estimate = calculateSeatEstimate(seats, billingCycle);

  const handleStepSeats = (delta: number) => {
    setSeats((prev) => clampSeatCount(prev + delta));
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#1E40AF]">Transparent Pricing</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Predictable per-seat pricing without hidden connector fees
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Pay only for active workspace leads and builders. Read-only digest recipients are
            always included at no extra cost.
          </p>
        </div>

        {/* Billing Cycle Segmented Control */}
        <div
          role="group"
          aria-label="Billing cycle"
          className="inline-flex items-center gap-1 self-start rounded-lg border border-slate-200 bg-slate-100 p-1"
        >
          <button
            type="button"
            aria-pressed={billingCycle === 'annual'}
            onClick={() => setBillingCycle('annual')}
            className={`rounded-md px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
              billingCycle === 'annual'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Annual (Save 20%)
          </button>
          <button
            type="button"
            aria-pressed={billingCycle === 'monthly'}
            onClick={() => setBillingCycle('monthly')}
            className={`rounded-md px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
              billingCycle === 'monthly'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Interactive Seat Estimator */}
      <section
        aria-label="Team seat estimator"
        className="mt-10 rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <label htmlFor="seat-slider" className="font-display text-base font-semibold text-slate-900">
                Estimate Active Workspace Seats
              </label>
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Decrease seats by 5"
                  onClick={() => handleStepSeats(-5)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-[#FAFAFA] text-slate-700 hover:bg-slate-100"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span
                  data-testid="seat-count-display"
                  className="min-w-[4.5rem] text-center font-mono text-lg font-semibold text-slate-900 tabular-nums"
                >
                  {seats} seats
                </span>
                <button
                  type="button"
                  aria-label="Increase seats by 5"
                  onClick={() => handleStepSeats(5)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-[#FAFAFA] text-slate-700 hover:bg-slate-100"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <input
              id="seat-slider"
              type="range"
              min={5}
              max={250}
              step={5}
              value={seats}
              onChange={(e) => setSeats(clampSeatCount(Number(e.target.value)))}
              className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#1E40AF]"
            />
            <div className="mt-2 flex justify-between font-mono text-xs text-slate-500 tabular-nums">
              <span>5 seats</span>
              <span>85 seats</span>
              <span>170 seats</span>
              <span>250 seats</span>
            </div>
          </div>

          <div className="flex flex-col justify-between border-t border-slate-200 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xs font-medium text-slate-600">
                Recommended: <span className="font-semibold text-slate-900">{estimate.recommendedTierName}</span>
              </p>
              {estimate.annualSavings !== null && estimate.annualSavings > 0 && (
                <p className="font-mono text-xs font-medium text-[#1E40AF] tabular-nums">
                  Save {formatUsd(estimate.annualSavings)}/yr
                </p>
              )}
            </div>

            {estimate.isCustomEnterprise ? (
              <div className="mt-4">
                <p className="font-mono text-2xl font-semibold text-slate-900">Custom Volume Pricing</p>
                <p className="mt-1 text-xs text-slate-600">
                  Dedicated VPC isolation, SCIM, and volume discounts for {seats}+ seats.
                </p>
              </div>
            ) : (
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <p
                    data-testid="estimated-monthly-total"
                    className="font-mono text-3xl font-semibold tracking-tight text-slate-900 tabular-nums"
                  >
                    {formatUsd(estimate.monthlyTotal!)}
                    <span className="text-sm font-normal text-slate-500"> / mo</span>
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-600 tabular-nums">
                    {formatUsd(estimate.perSeatRate!)} per seat · {formatUsd(estimate.annualTotal!)} billed{' '}
                    {billingCycle === 'annual' ? 'annually' : 'across 12 months'}
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                onSelectPlanForDemo({
                  planId: estimate.recommendedTierId,
                  planName: estimate.recommendedTierName,
                  seats,
                  billingCycle,
                })
              }
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1E40AF] px-4 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              Book Demo with {estimate.recommendedTierName} ({seats} seats)
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 3-Tier Pricing Grid */}
      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {PRICING_TIERS.map((tier) => {
          const unitRate =
            billingCycle === 'annual' ? tier.annualPerSeat : tier.monthlyPerSeat;

          return (
            <article
              key={tier.id}
              className={`flex flex-col justify-between rounded-xl border p-8 ${
                tier.highlighted
                  ? 'border-[#1E40AF] bg-white shadow-xs'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-xl font-semibold text-slate-900">{tier.name}</h2>
                  {tier.highlighted && (
                    <span className="text-xs font-semibold text-[#1E40AF]">Most Selected</span>
                  )}
                </div>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-slate-600">
                  {tier.summary}
                </p>

                <div className="mt-6 border-y border-slate-100 py-5">
                  {unitRate !== null ? (
                    <div>
                      <p className="font-mono text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
                        {formatUsd(unitRate)}
                        <span className="text-sm font-normal text-slate-500"> / seat / mo</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Minimum {tier.minimumSeats} seats · Billed{' '}
                        {billingCycle === 'annual' ? 'annually' : 'monthly'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-mono text-3xl font-semibold tracking-tight text-slate-900">
                        Custom
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Starting at {tier.minimumSeats}+ seats · Annual contract
                      </p>
                    </div>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1E40AF]" aria-hidden="true" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSelectPlanForDemo({
                    planId: tier.id as PlanTierId,
                    planName: tier.name,
                    seats: Math.max(seats, tier.minimumSeats),
                    billingCycle,
                  })
                }
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
                  tier.highlighted
                    ? 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A]'
                    : 'border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {tier.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}

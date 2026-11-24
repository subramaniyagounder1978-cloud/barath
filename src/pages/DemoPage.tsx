import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { DemoFormErrors, DemoFormValues, RouteKey, SelectedPlanContext } from '../types/synthesis';
import { hasValidationErrors, validateDemoForm } from '../utils/validation';

interface DemoPageProps {
  selectedPlanContext: SelectedPlanContext | null;
  onNavigate: (route: RouteKey) => void;
}

const INITIAL_VALUES = (planContext: SelectedPlanContext | null): DemoFormValues => ({
  fullName: '',
  workEmail: '',
  companyName: '',
  teamSize: planContext
    ? planContext.seats >= 100
      ? '150+'
      : planContext.seats >= 50
        ? '50-150'
        : '15-50'
    : '',
  primaryGoal: '',
  notes: planContext
    ? `Interested in the ${planContext.planName} plan (${planContext.seats} seats, ${planContext.billingCycle} billing).`
    : '',
  selectedPlan: planContext ? planContext.planName : 'Growth',
});

export function DemoPage({ selectedPlanContext, onNavigate }: DemoPageProps) {
  const [values, setValues] = useState<DemoFormValues>(() => INITIAL_VALUES(selectedPlanContext));
  const [errors, setErrors] = useState<DemoFormErrors>({});
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    referenceId: string;
    submittedAt: string;
    values: DemoFormValues;
  } | null>(null);

  useEffect(() => {
    if (selectedPlanContext) {
      setValues((prev) => ({
        ...prev,
        selectedPlan: selectedPlanContext.planName,
        teamSize:
          selectedPlanContext.seats >= 100
            ? '150+'
            : selectedPlanContext.seats >= 50
              ? '50-150'
              : '15-50',
        notes:
          prev.notes ||
          `Interested in the ${selectedPlanContext.planName} plan (${selectedPlanContext.seats} seats, ${selectedPlanContext.billingCycle} billing).`,
      }));
    }
  }, [selectedPlanContext]);

  const handleFieldChange = (field: keyof DemoFormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof DemoFormErrors];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateDemoForm(values);
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    const referenceId = `SYN-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedReceipt({
      referenceId,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      values: { ...values },
    });
  };

  if (submittedReceipt) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <div
          data-testid="demo-confirmation-card"
          className="rounded-xl border border-slate-200 bg-white p-8 sm:p-10"
        >
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E40AF]">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            <span>Demo Request Confirmed</span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900">
            We have scheduled your walkthrough intake
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            A Synthesis solutions engineer will send calendar options to{' '}
            <span className="font-medium text-slate-900">{submittedReceipt.values.workEmail}</span>{' '}
            within one business day.
          </p>

          <dl className="mt-8 grid gap-4 border-y border-slate-200 py-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">Reference ID</dt>
              <dd className="mt-1 font-mono font-medium text-slate-900">
                {submittedReceipt.referenceId}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Organization</dt>
              <dd className="mt-1 font-medium text-slate-900">
                {submittedReceipt.values.companyName} ({submittedReceipt.values.teamSize} seats)
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Plan Focus</dt>
              <dd className="mt-1 font-medium text-slate-900">
                {submittedReceipt.values.selectedPlan}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Primary Objective</dt>
              <dd className="mt-1 font-medium text-slate-900">
                {submittedReceipt.values.primaryGoal}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center justify-center rounded-lg bg-[#1E40AF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1E3A8A]"
            >
              Return to Home
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmittedReceipt(null);
                setValues(INITIAL_VALUES(null));
              }}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Left Context Column */}
        <div className="lg:col-span-5">
          <p className="text-xs font-medium tracking-wide text-[#1E40AF]">Book a Live Walkthrough</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900">
            See Synthesis tailored to your engineering &amp; product stack
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Walk through live data unification, dependency tracking, and automated executive digests
            with a solutions engineer—never a scripted sales pitch.
          </p>

          <div className="mt-8 space-y-5 border-t border-slate-200 pt-8 text-sm">
            <div>
              <h2 className="font-display font-semibold text-slate-900">01. 30-Minute Technical Session</h2>
              <p className="mt-1 text-slate-600">
                Review your current Linear, Jira, GitHub, and warehouse setup with live examples.
              </p>
            </div>
            <div>
              <h2 className="font-display font-semibold text-slate-900">02. Security &amp; Deployment Plan</h2>
              <p className="mt-1 text-slate-600">
                Receive our SOC 2 Type II documentation, SSO checklist, and 14-day rollout schedule.
              </p>
            </div>
            <div>
              <h2 className="font-display font-semibold text-slate-900">03. Pilot Sandbox Option</h2>
              <p className="mt-1 text-slate-600">
                Test Synthesis on one product group with zero disruption to existing workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <form
            noValidate
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="demo-full-name" className="block text-sm font-medium text-slate-900">
                  Full Name
                </label>
                <input
                  id="demo-full-name"
                  type="text"
                  value={values.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  placeholder="Claire Bennett"
                  className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                    errors.fullName
                      ? 'border-red-600 focus:border-red-600'
                      : 'border-slate-300 focus:border-[#1E40AF]'
                  }`}
                />
                {errors.fullName && (
                  <p role="alert" className="mt-1.5 text-xs text-red-700">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="demo-work-email" className="block text-sm font-medium text-slate-900">
                  Work Email
                </label>
                <input
                  id="demo-work-email"
                  type="email"
                  value={values.workEmail}
                  onChange={(e) => handleFieldChange('workEmail', e.target.value)}
                  aria-invalid={Boolean(errors.workEmail)}
                  placeholder="claire@company.com"
                  className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                    errors.workEmail
                      ? 'border-red-600 focus:border-red-600'
                      : 'border-slate-300 focus:border-[#1E40AF]'
                  }`}
                />
                {errors.workEmail && (
                  <p role="alert" className="mt-1.5 text-xs text-red-700">
                    {errors.workEmail}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="demo-company" className="block text-sm font-medium text-slate-900">
                  Company Name
                </label>
                <input
                  id="demo-company"
                  type="text"
                  value={values.companyName}
                  onChange={(e) => handleFieldChange('companyName', e.target.value)}
                  aria-invalid={Boolean(errors.companyName)}
                  placeholder="Northstar Freight Systems"
                  className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none ${
                    errors.companyName
                      ? 'border-red-600 focus:border-red-600'
                      : 'border-slate-300 focus:border-[#1E40AF]'
                  }`}
                />
                {errors.companyName && (
                  <p role="alert" className="mt-1.5 text-xs text-red-700">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="demo-team-size" className="block text-sm font-medium text-slate-900">
                  Team Size
                </label>
                <select
                  id="demo-team-size"
                  value={values.teamSize}
                  onChange={(e) => handleFieldChange('teamSize', e.target.value)}
                  aria-invalid={Boolean(errors.teamSize)}
                  className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none ${
                    errors.teamSize
                      ? 'border-red-600 focus:border-red-600'
                      : 'border-slate-300 focus:border-[#1E40AF]'
                  }`}
                >
                  <option value="">Select team size</option>
                  <option value="5-15">5–15 seats</option>
                  <option value="15-50">15–50 seats</option>
                  <option value="50-150">50–150 seats</option>
                  <option value="150+">150+ seats</option>
                </select>
                {errors.teamSize && (
                  <p role="alert" className="mt-1.5 text-xs text-red-700">
                    {errors.teamSize}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="demo-plan" className="block text-sm font-medium text-slate-900">
                  Plan Interest
                </label>
                <select
                  id="demo-plan"
                  value={values.selectedPlan}
                  onChange={(e) => handleFieldChange('selectedPlan', e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#1E40AF] focus:outline-none"
                >
                  <option value="Team">Team ($24/seat annual)</option>
                  <option value="Growth">Growth ($48/seat annual)</option>
                  <option value="Enterprise">Enterprise (Custom VPC)</option>
                </select>
              </div>

              <div>
                <label htmlFor="demo-goal" className="block text-sm font-medium text-slate-900">
                  Primary Objective
                </label>
                <select
                  id="demo-goal"
                  value={values.primaryGoal}
                  onChange={(e) => handleFieldChange('primaryGoal', e.target.value)}
                  aria-invalid={Boolean(errors.primaryGoal)}
                  className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none ${
                    errors.primaryGoal
                      ? 'border-red-600 focus:border-red-600'
                      : 'border-slate-300 focus:border-[#1E40AF]'
                  }`}
                >
                  <option value="">Select primary goal</option>
                  <option value="Executive & engineering visibility">
                    Executive &amp; engineering visibility
                  </option>
                  <option value="Automated stakeholder digests">
                    Automated stakeholder digests
                  </option>
                  <option value="Cross-squad dependency tracking">
                    Cross-squad dependency tracking
                  </option>
                  <option value="Enterprise security & VPC evaluation">
                    Enterprise security &amp; VPC evaluation
                  </option>
                </select>
                {errors.primaryGoal && (
                  <p role="alert" className="mt-1.5 text-xs text-red-700">
                    {errors.primaryGoal}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="demo-notes" className="block text-sm font-medium text-slate-900">
                Current Tools or Specific Questions (Optional)
              </label>
              <textarea
                id="demo-notes"
                rows={3}
                value={values.notes}
                onChange={(e) => handleFieldChange('notes', e.target.value)}
                placeholder="Tell us which issue trackers, repositories, or warehouses you use today."
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1E40AF] focus:outline-none"
              />
            </div>

            <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
              <p className="text-xs text-slate-500">
                We respect your privacy and never share contact details with third parties.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-[#1E40AF] px-6 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
              >
                Request Walkthrough
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

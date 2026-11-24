import { ArrowRight } from 'lucide-react';
import {
  ASSETS,
  CUSTOMER_OUTCOMES,
  HOME_CAPABILITIES,
  HOME_PROOF_METRICS,
} from '../data/synthesisContent';
import type { RouteKey } from '../types/synthesis';
import { EditorialImage } from '../components/EditorialImage';
import { WorkflowPreviewer } from '../components/WorkflowPreviewer';

interface HomePageProps {
  onNavigate: (route: RouteKey) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 lg:pt-20 lg:pb-20">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-medium tracking-wide text-[#1E40AF]">
              Operational Intelligence Platform · Product &amp; Engineering
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-slate-900">
              Unify product telemetry, engineering workflows, and executive reporting.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Synthesis connects issue trackers, repositories, and warehouse metrics into a
              single operational workspace—giving leadership clear delivery visibility without
              adding status meetings.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('demo')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E40AF] px-6 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('platform')}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
              >
                Explore Platform
              </button>
            </div>
            <p className="mt-5 text-xs text-slate-500">
              SOC 2 Type II certified · 14-day enterprise onboarding · Works with Linear, Jira, GitHub &amp; Snowflake
            </p>
          </div>

          <div className="lg:col-span-6">
            <EditorialImage
              src={ASSETS.heroWorkspace}
              alt="Sunlit architectural conference room representing Synthesis operational clarity"
              aspectClass="aspect-video lg:aspect-auto lg:h-full lg:min-h-[380px]"
              fallbackTitle="Synthesis Operational Workspace"
            />
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Strip */}
        <div className="mt-14 grid gap-6 border-t border-slate-200 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_PROOF_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1.5">
              <p className="font-mono text-2xl font-semibold tracking-tight text-slate-900 tabular-nums sm:text-3xl">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-slate-900">{metric.label}</p>
              <p className="text-xs text-slate-500">{metric.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Capabilities Asymmetric Bento Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#1E40AF]">Core Capabilities</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Built to turn fragmented engineering activity into shared truth
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('solutions')}
            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-[#1E40AF] whitespace-nowrap shrink-0 hover:text-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF]"
          >
            View role solutions
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {HOME_CAPABILITIES.map((item) => (
            <article
              key={item.index}
              className={`flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-8 ${
                item.spanTwo ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div>
                <p className="font-mono text-xs font-medium text-slate-500">{item.index}.</p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{item.summary}</p>
              </div>
              <p className="mt-6 border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-500">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Workspace Previewer */}
      <WorkflowPreviewer onNavigate={onNavigate} />

      {/* Customer Outcomes (Claim-to-Proof Adjacency) */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#1E40AF]">Verified Customer Outcomes</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            How modern product and engineering teams operate on Synthesis
          </h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {CUSTOMER_OUTCOMES.map((study) => (
            <article
              key={study.organization}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-8"
            >
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {study.organization} · {study.industry}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-900">
                  {study.headlineMetric}
                </h3>

                <div className="mt-6 grid gap-5 border-y border-slate-100 py-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Before Synthesis</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{study.before}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1E40AF]">Measured Change</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{study.outcome}</p>
                  </div>
                </div>
              </div>

              <blockquote className="mt-6">
                <p className="text-sm leading-relaxed text-slate-700">“{study.quote}”</p>
                <footer className="mt-3 text-xs font-medium text-slate-900">
                  {study.person} · <span className="font-normal text-slate-500">{study.role}</span>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      {/* Conversion Band */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-start justify-between gap-8 rounded-xl border border-slate-200 bg-slate-900 p-8 text-white sm:p-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              See Synthesis mapped to your actual repositories and roadmap
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Schedule a 30-minute technical walkthrough or estimate annual seat pricing for your
              organization.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('demo')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Schedule Walkthrough
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('pricing')}
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-slate-400 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Estimate Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

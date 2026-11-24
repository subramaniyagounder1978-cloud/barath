import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ABOUT_PRINCIPLES, ASSETS } from '../data/synthesisContent';
import type { RouteKey } from '../types/synthesis';
import { EditorialImage } from '../components/EditorialImage';

interface AboutPageProps {
  onNavigate: (route: RouteKey) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
      <div className="grid items-stretch gap-10 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="text-xs font-medium tracking-wide text-[#1E40AF]">About Synthesis</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Built for teams that prefer evidence over status meetings
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Synthesis was founded by product and infrastructure engineers who watched growing
            organizations lose thousands of hours reconciling disconnected trackers, spreadsheets,
            and weekly slide decks.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Our headquarters in San Francisco and distributed engineering team across New York and
            Zurich serve high-trust technology enterprises across North America and Europe.
          </p>
        </div>

        <div className="lg:col-span-6">
          <EditorialImage
            src={ASSETS.aboutStudio}
            alt="Synthesis contemporary minimalist architectural office atrium in daylight"
            aspectClass="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[340px]"
            fallbackTitle="Synthesis Headquarters"
          />
        </div>
      </div>

      {/* Operating Principles */}
      <section className="mt-20 border-t border-slate-200 pt-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          How we design software
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {ABOUT_PRINCIPLES.map((principle) => (
            <article
              key={principle.index}
              className="rounded-xl border border-slate-200 bg-white p-7"
            >
              <p className="font-mono text-xs text-slate-500">{principle.index}.</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">
                {principle.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Security & Compliance Posture */}
      <section className="mt-16 rounded-xl border border-slate-200 bg-white p-8 sm:p-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E40AF]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>Enterprise Security &amp; Governance</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-900">
              Verified compliance from day one
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
              Synthesis maintains continuous SOC 2 Type II auditing, GDPR data processing agreements,
              AES-256 encryption at rest, TLS 1.3 in transit, and strict zero-training guarantees for
              customer operational data.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('faq')}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 whitespace-nowrap shrink-0 hover:bg-slate-50"
            >
              Read Security FAQ
            </button>
            <button
              type="button"
              onClick={() => onNavigate('demo')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E40AF] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#1E3A8A]"
            >
              Speak with Our Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

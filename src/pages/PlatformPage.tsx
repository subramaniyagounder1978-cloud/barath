import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ASSETS, INTEGRATIONS_LIST, PLATFORM_PILLARS } from '../data/synthesisContent';
import type { RouteKey } from '../types/synthesis';
import { EditorialImage } from '../components/EditorialImage';

interface PlatformPageProps {
  onNavigate: (route: RouteKey) => void;
}

export function PlatformPage({ onNavigate }: PlatformPageProps) {
  const [activePillarId, setActivePillarId] = useState<string>(PLATFORM_PILLARS[0].id);
  const activePillar =
    PLATFORM_PILLARS.find((pillar) => pillar.id === activePillarId) ?? PLATFORM_PILLARS[0];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
      {/* Intro Header */}
      <div className="grid items-stretch gap-10 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="text-xs font-medium tracking-wide text-[#1E40AF]">Platform Architecture</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Four foundational systems working as one operational layer
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Synthesis ingests signals from your existing engineering, product, and warehouse stack
            without requiring schema migrations or manual data entry.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('demo')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1E40AF] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              Request Technical Architecture Review
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="lg:col-span-6">
          <EditorialImage
            src={ASSETS.platformCollaboration}
            alt="Product and engineering leaders reviewing operational architecture in daylight"
            aspectClass="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[340px]"
            fallbackTitle="Synthesis Platform Architecture"
          />
        </div>
      </div>

      {/* Interactive Pillar Explorer */}
      <section className="mt-20">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Explore Core Platform Modules
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Select a capability module below to inspect how Synthesis models and governs data.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-2 lg:col-span-4" role="tablist" aria-label="Platform capabilities">
            {PLATFORM_PILLARS.map((pillar) => {
              const isSelected = pillar.id === activePillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
                    isSelected
                      ? 'border-[#1E40AF] bg-white shadow-xs'
                      : 'border-slate-200 bg-[#FAFAFA] hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="font-mono text-xs text-slate-500">{pillar.index}.</span>
                  <span className="mt-1 font-display text-base font-semibold text-slate-900">
                    {pillar.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            aria-label={activePillar.title}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-8 lg:col-span-8"
          >
            <div>
              <p className="font-mono text-xs text-[#1E40AF]">
                Module {activePillar.index} · {activePillar.technicalSpec}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-900">
                {activePillar.title}
              </h3>
              <p className="mt-2 text-base font-medium text-slate-700">{activePillar.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{activePillar.description}</p>

              <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                {activePillar.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1E40AF]" aria-hidden="true" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
              <p className="text-xs text-slate-500">
                Included across Growth and Enterprise deployments
              </p>
              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E40AF] whitespace-nowrap shrink-0 hover:text-[#1E3A8A]"
              >
                Compare Plan Availability
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Compatibility Matrix */}
      <section className="mt-20 border-t border-slate-200 pt-16">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#1E40AF]">Native Connectors</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Connect your existing stack in under an hour
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS_LIST.map((integration) => (
            <div
              key={integration.name}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <p className="text-xs text-slate-500">{integration.category}</p>
              <h3 className="mt-1 font-display text-base font-semibold text-slate-900">
                {integration.name}
              </h3>
              <p className="mt-2 text-xs font-medium text-slate-600">{integration.syncType}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

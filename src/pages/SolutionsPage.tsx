import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SOLUTIONS_TRACKS } from '../data/synthesisContent';
import type { RouteKey } from '../types/synthesis';

interface SolutionsPageProps {
  onNavigate: (route: RouteKey) => void;
}

export function SolutionsPage({ onNavigate }: SolutionsPageProps) {
  const [activeTrackId, setActiveTrackId] = useState<'product' | 'engineering' | 'revops'>('product');

  const activeTrack =
    SOLUTIONS_TRACKS.find((track) => track.id === activeTrackId) ?? SOLUTIONS_TRACKS[0];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
      <div className="max-w-3xl">
        <p className="text-xs font-medium tracking-wide text-[#1E40AF]">Solutions by Function</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Tailored operational clarity for every cross-functional team
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          Different leaders ask different questions of the same execution data. Switch views below
          to see how Synthesis supports Product, Engineering, and Revenue Operations.
        </p>
      </div>

      {/* Role Filter Controls */}
      <div
        role="tablist"
        aria-label="Filter solutions by team function"
        className="mt-10 inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1"
      >
        {SOLUTIONS_TRACKS.map((track) => {
          const isSelected = track.id === activeTrackId;
          return (
            <button
              key={track.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveTrackId(track.id)}
              className={`rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {track.roleTitle}
            </button>
          );
        })}
      </div>

      {/* Focused Role Breakdown */}
      <section
        role="tabpanel"
        aria-label={activeTrack.roleTitle}
        className="mt-8 rounded-xl border border-slate-200 bg-white p-8 sm:p-10"
      >
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-slate-500">{activeTrack.audience}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {activeTrack.headline}
            </h2>
          </div>
          <p className="font-mono text-sm font-semibold text-[#1E40AF]">{activeTrack.benchmark}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div>
              <h3 className="font-display text-sm font-semibold text-slate-900">
                Common Operational Bottleneck
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{activeTrack.painPoint}</p>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold text-[#1E40AF]">
                How Synthesis Solves It
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {activeTrack.synthesisApproach}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-[#FAFAFA] p-6 lg:col-span-5">
            <h3 className="font-display text-sm font-semibold text-slate-900">
              Included Workspace Deliverables
            </h3>
            <ul className="mt-4 space-y-3">
              {activeTrack.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1E40AF]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onNavigate('demo')}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1E40AF] px-4 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              Book {activeTrack.roleTitle} Demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* All Three Functions At a Glance */}
      <section className="mt-14 grid gap-6 md:grid-cols-3">
        {SOLUTIONS_TRACKS.map((track) => (
          <article
            key={track.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
          >
            <div>
              <p className="text-xs text-slate-500">{track.audience}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">
                {track.roleTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{track.headline}</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTrackId(track.id)}
              className="mt-5 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#1E40AF] hover:text-[#1E3A8A]"
            >
              Inspect {track.roleTitle}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

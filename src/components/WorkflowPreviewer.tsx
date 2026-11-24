import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WORKFLOW_ROLE_VIEWS } from '../data/synthesisContent';
import type { RouteKey } from '../types/synthesis';

interface WorkflowPreviewerProps {
  onNavigate: (route: RouteKey) => void;
}

export function WorkflowPreviewer({ onNavigate }: WorkflowPreviewerProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<'product' | 'engineering' | 'executive'>('product');

  const activeView =
    WORKFLOW_ROLE_VIEWS.find((view) => view.id === selectedRoleId) ?? WORKFLOW_ROLE_VIEWS[0];

  return (
    <section className="border-y border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#1E40AF]">
              Interactive Workspace Preview
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              One operational graph, tailored to every decision-maker
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Preview workspace by leadership role"
            className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1"
          >
            {WORKFLOW_ROLE_VIEWS.map((view) => {
              const isSelected = view.id === selectedRoleId;
              return (
                <button
                  key={view.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedRoleId(view.id)}
                  className={`rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {view.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          aria-label={`${activeView.label} preview`}
          className="mt-10 rounded-xl border border-slate-200 bg-[#FAFAFA] p-6 sm:p-8"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs text-slate-500">{activeView.timeframe}</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-slate-900">
                {activeView.headline}
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600">
                {activeView.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('platform')}
              className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              Inspect Platform Architecture
              <ArrowRight className="h-4 w-4 text-slate-500" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {activeView.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <p className="text-xs font-medium text-slate-500">{kpi.label}</p>
                <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
                  {kpi.value}
                </p>
                <p className="mt-1 text-xs text-slate-600">{kpi.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-medium text-slate-500">
              <div className="col-span-5 sm:col-span-4">Initiative / Stream</div>
              <div className="col-span-4 sm:col-span-3">Owner</div>
              <div className="col-span-3 sm:col-span-2">Status</div>
              <div className="hidden sm:col-span-3 sm:block">Latest Verified Signal</div>
            </div>
            <div className="divide-y divide-slate-200">
              {activeView.signals.map((signal) => (
                <div
                  key={signal.area}
                  className="grid grid-cols-12 items-start gap-2 px-5 py-4 text-sm"
                >
                  <div className="col-span-5 sm:col-span-4 font-medium text-slate-900">
                    {signal.area}
                  </div>
                  <div className="col-span-4 sm:col-span-3 text-slate-600">{signal.owner}</div>
                  <div className="col-span-3 sm:col-span-2 font-medium text-slate-800">
                    {signal.state}
                  </div>
                  <div className="col-span-12 mt-1 text-xs leading-relaxed text-slate-600 sm:col-span-3 sm:mt-0">
                    {signal.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

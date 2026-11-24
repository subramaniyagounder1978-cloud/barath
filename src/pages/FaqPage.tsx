import { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { FAQ_ITEMS } from '../data/synthesisContent';
import type { FaqItem, RouteKey } from '../types/synthesis';
import { filterFaqs } from '../utils/validation';

interface FaqPageProps {
  onNavigate: (route: RouteKey) => void;
}

const CATEGORIES: Array<'All' | FaqItem['category']> = [
  'All',
  'Platform',
  'Security',
  'Onboarding',
  'Billing',
];

export function FaqPage({ onNavigate }: FaqPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | FaqItem['category']>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>([FAQ_ITEMS[0].id]);

  const filteredItems = filterFaqs(FAQ_ITEMS, selectedCategory, searchQuery);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 lg:py-20">
      <div>
        <p className="text-xs font-medium tracking-wide text-[#1E40AF]">Frequently Asked Questions</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Technical, security, and billing clarity
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Direct answers to the most common questions from product, engineering, and procurement
          teams evaluating Synthesis.
        </p>
      </div>

      {/* Search & Category Controls */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Filter questions by topic"
          className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1"
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="faq-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-8 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1E40AF] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchQuery('')}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Accordion List */}
      <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {filteredItems.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-display text-base font-semibold text-slate-900">
              No matching questions found
            </p>
            <p className="mt-1.5 text-sm text-slate-600">
              Clear your search filter or ask our team directly during a live walkthrough.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div key={item.id} className="px-6 py-5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-start justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF]"
                >
                  <div>
                    <span className="text-xs font-medium text-slate-500">{item.category}</span>
                    <h2 className="mt-1 font-display text-base font-semibold text-slate-900 sm:text-lg">
                      {item.question}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-[#1E40AF]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${item.id}`}
                    className="mt-3 pr-8 text-sm leading-relaxed text-slate-600"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Follow-up prompt */}
      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-base font-semibold text-slate-900">
            Have a specific security questionnaire or architecture question?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Request our SOC 2 Type II report or schedule time with a solutions engineer.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('demo')}
          className="inline-flex items-center justify-center rounded-lg bg-[#1E40AF] px-4 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#1E3A8A]"
        >
          Contact Solutions Team
        </button>
      </div>
    </div>
  );
}

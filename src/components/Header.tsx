import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { RouteKey } from '../types/synthesis';

interface HeaderProps {
  activeRoute: RouteKey;
  onNavigate: (route: RouteKey) => void;
}

const NAV_ITEMS: { key: RouteKey; label: string }[] = [
  { key: 'platform', label: 'Platform' },
  { key: 'solutions', label: 'Solutions' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'about', label: 'About' },
  { key: 'faq', label: 'FAQ' },
];

export function Header({ activeRoute, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (route: RouteKey) => {
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#FAFAFA]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF]"
        >
          Synthesis
        </a>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeRoute === item.key;
            return (
              <a
                key={item.key}
                href={`#/${item.key}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.key);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E40AF] ${
                  isActive
                    ? 'text-[#1E40AF] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-[#1E40AF]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action CTA + mobile drawer button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('demo')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#1E40AF] px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          >
            Book a Demo
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
              aria-current={activeRoute === 'home' ? 'page' : undefined}
              className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium ${
                activeRoute === 'home' ? 'bg-slate-100 text-[#1E40AF]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </a>
            {NAV_ITEMS.map((item) => {
              const isActive = activeRoute === item.key;
              return (
                <a
                  key={item.key}
                  href={`#/${item.key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.key);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium ${
                    isActive ? 'bg-slate-100 text-[#1E40AF]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="mt-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => handleLinkClick('demo')}
                className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#1E40AF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1E3A8A]"
              >
                Book a Demo
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

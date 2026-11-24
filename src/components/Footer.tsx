import type { RouteKey } from '../types/synthesis';

interface FooterProps {
  onNavigate: (route: RouteKey) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLink = (route: RouteKey) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#/"
              onClick={handleLink('home')}
              className="font-display text-lg font-bold tracking-tight text-slate-900"
            >
              Synthesis
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
              Operational intelligence software for product, engineering, and executive teams.
              Headquartered in San Francisco with regional EU and US infrastructure.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              SOC 2 Type II Certified · GDPR Compliant · hello@synthesis.software
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className="font-display text-sm font-semibold text-slate-900">Product</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li>
                  <a href="#/platform" onClick={handleLink('platform')} className="hover:text-slate-900 transition-colors">
                    Platform Overview
                  </a>
                </li>
                <li>
                  <a href="#/solutions" onClick={handleLink('solutions')} className="hover:text-slate-900 transition-colors">
                    Solutions by Role
                  </a>
                </li>
                <li>
                  <a href="#/pricing" onClick={handleLink('pricing')} className="hover:text-slate-900 transition-colors">
                    Pricing & Estimator
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-sm font-semibold text-slate-900">Company</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li>
                  <a href="#/about" onClick={handleLink('about')} className="hover:text-slate-900 transition-colors">
                    About Synthesis
                  </a>
                </li>
                <li>
                  <a href="#/faq" onClick={handleLink('faq')} className="hover:text-slate-900 transition-colors">
                    Security & FAQ
                  </a>
                </li>
                <li>
                  <a href="#/demo" onClick={handleLink('demo')} className="hover:text-slate-900 transition-colors">
                    Book a Demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-sm font-semibold text-slate-900">Resources</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li>
                  <a href="#/platform" onClick={handleLink('platform')} className="hover:text-slate-900 transition-colors">
                    Integrations Catalog
                  </a>
                </li>
                <li>
                  <a href="#/faq" onClick={handleLink('faq')} className="hover:text-slate-900 transition-colors">
                    Deployment Guide
                  </a>
                </li>
                <li>
                  <a href="#/demo" onClick={handleLink('demo')} className="hover:text-slate-900 transition-colors">
                    Contact Sales
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Synthesis Software, Inc. All rights reserved.</p>
          <p>Privacy · Terms of Service · Security Trust Center</p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AboutPage } from './pages/AboutPage';
import { DemoPage } from './pages/DemoPage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { PricingPage } from './pages/PricingPage';
import { SolutionsPage } from './pages/SolutionsPage';
import type { RouteKey, SelectedPlanContext } from './types/synthesis';
import { formatHashForRoute, parseRouteFromHash } from './utils/validation';

const ROUTE_TITLES: Record<RouteKey, string> = {
  home: 'Synthesis – Operational Intelligence & Workflow Platform',
  platform: 'Platform Architecture – Synthesis',
  solutions: 'Solutions by Role – Synthesis',
  pricing: 'Pricing & Seat Estimator – Synthesis',
  about: 'About Synthesis – Principles & Security',
  faq: 'Frequently Asked Questions – Synthesis',
  demo: 'Book a Demo – Synthesis',
};

export default function App() {
  const [activeRoute, setActiveRoute] = useState<RouteKey>(() =>
    parseRouteFromHash(typeof window !== 'undefined' ? window.location.hash : '')
  );
  const [selectedPlanContext, setSelectedPlanContext] = useState<SelectedPlanContext | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveRoute(parseRouteFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.title = ROUTE_TITLES[activeRoute];
  }, [activeRoute]);

  const navigate = (route: RouteKey) => {
    setActiveRoute(route);
    const nextHash = formatHashForRoute(route);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleSelectPlanForDemo = (context: SelectedPlanContext) => {
    setSelectedPlanContext(context);
    navigate('demo');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-[#0F172A]">
      <Header activeRoute={activeRoute} onNavigate={navigate} />

      <main className="flex-1">
        {activeRoute === 'home' && <HomePage onNavigate={navigate} />}
        {activeRoute === 'platform' && <PlatformPage onNavigate={navigate} />}
        {activeRoute === 'solutions' && <SolutionsPage onNavigate={navigate} />}
        {activeRoute === 'pricing' && (
          <PricingPage onSelectPlanForDemo={handleSelectPlanForDemo} />
        )}
        {activeRoute === 'about' && <AboutPage onNavigate={navigate} />}
        {activeRoute === 'faq' && <FaqPage onNavigate={navigate} />}
        {activeRoute === 'demo' && (
          <DemoPage selectedPlanContext={selectedPlanContext} onNavigate={navigate} />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

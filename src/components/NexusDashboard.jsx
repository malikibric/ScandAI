import {
  Shield,
  Sparkles,
  Recycle,
  ArrowLeft,
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import TrustVault from './TrustVault';
import SymbiosisAgent from './SymbiosisAgent';
import AIMatchmaker from './AIMatchmaker';

const tabs = [
  {
    id: 'trust-vault',
    label: 'Trust Vault',
    icon: Shield,
    color: 'text-primary',
    bg: 'bg-primary-light',
    description: 'Anonymous Problem Solving',
  },
  {
    id: 'symbiosis',
    label: 'Symbiosis Agent',
    icon: Recycle,
    color: 'text-success',
    bg: 'bg-success-light',
    description: 'Resource Matching',
  },
  {
    id: 'matchmaker',
    label: 'AI Matchmaker',
    icon: Sparkles,
    color: 'text-accent',
    bg: 'bg-accent-light',
    description: 'Partner Discovery',
  },
];

export default function NexusDashboard() {
  const { activeTab, setActiveTab, setActivePage } = useNexus();

  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <section className="min-h-screen bg-bg">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setActivePage('home')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-text-muted" />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-text tracking-tight">
                NEXUS Dashboard
              </h1>
              <p className="text-sm text-text-muted">
                AI-powered collaboration modules for Swedish industry leaders
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-col sm:flex-row gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer flex-1 ${
                    isActive
                      ? `bg-white border-2 border-primary/20 shadow-md shadow-primary/5`
                      : 'bg-bg border-2 border-transparent hover:border-border hover:bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? tab.bg : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? tab.color : 'text-text-light'
                      }`}
                    />
                  </div>
                  <div>
                    <div
                      className={`text-sm font-bold ${
                        isActive ? 'text-text' : 'text-text-muted'
                      }`}
                    >
                      {tab.label}
                    </div>
                    <div className="text-[11px] text-text-light">
                      {tab.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'trust-vault' && <TrustVault />}
        {activeTab === 'symbiosis' && <SymbiosisAgent />}
        {activeTab === 'matchmaker' && <AIMatchmaker />}
      </div>
    </section>
  );
}

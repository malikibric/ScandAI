import {
  Sparkles,
  MapPin,
  Users,
  ChevronRight,
  Check,
  Loader2,
  Star,
  Filter,
  Zap,
  Building2,
} from 'lucide-react';
import { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { companies } from '../data/mockData';

export default function AIMatchmaker() {
  const { connections, initiateConnection } = useNexus();
  const [filter, setFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);

  const matchableCompanies = companies.filter((c) => c.matchScore !== null);

  const filteredCompanies =
    filter === 'all'
      ? matchableCompanies
      : matchableCompanies.filter((c) => {
          if (filter === 'high') return c.matchScore >= 90;
          if (filter === 'startup') return parseInt(c.employees) < 2000 || c.employees.includes('500') || c.employees.includes('200') || c.employees.includes('800');
          return true;
        });

  const sortedCompanies = [...filteredCompanies].sort(
    (a, b) => (b.matchScore || 0) - (a.matchScore || 0)
  );

  const getConnectionButton = (companyId) => {
    const status = connections[companyId];
    if (status === 'connected') {
      return (
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-success-light text-success text-sm font-semibold cursor-default">
          <Check className="w-4 h-4" />
          Connected
        </button>
      );
    }
    if (status === 'pending') {
      return (
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-warning-light text-warning text-sm font-semibold cursor-default">
          <Loader2 className="w-4 h-4 animate-spin" />
          Pending...
        </button>
      );
    }
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          initiateConnection(companyId);
        }}
        className="btn-primary text-sm px-4 py-2"
      >
        <Zap className="w-4 h-4" />
        Connect
      </button>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success-light';
    if (score >= 80) return 'text-primary bg-primary-light';
    return 'text-warning bg-warning-light';
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-text">AI-Recommended Partners</h3>
            <p className="text-xs text-text-muted">
              Based on your R&D focus in Electrification & Autonomous Driving
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-text-muted" />
          {[
            { id: 'all', label: 'All' },
            { id: 'high', label: '90%+ Match' },
            { id: 'startup', label: 'Startups' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filter === f.id
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border text-text-muted hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedCompanies.map((company, index) => (
          <div
            key={company.id}
            className={`glass-card overflow-hidden cursor-pointer animate-fade-in-up ${
              expandedCard === company.id ? 'ring-2 ring-primary/30' : ''
            }`}
            style={{ animationDelay: `${index * 0.06}s` }}
            onClick={() =>
              setExpandedCard(
                expandedCard === company.id ? null : company.id
              )
            }
          >
            {/* Match Score Bar */}
            <div className="h-1 bg-gray-100">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-700"
                style={{ width: `${company.matchScore}%` }}
              />
            </div>

            <div className="p-5">
              {/* Top Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-bg flex items-center justify-center text-2xl">
                    {company.logo}
                  </div>
                  <div>
                    <h4 className="font-bold text-text text-[15px]">
                      {company.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Building2 className="w-3 h-3" />
                      {company.sector}
                    </div>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-sm ${getScoreColor(company.matchScore)}`}
                >
                  <Star className="w-3.5 h-3.5" />
                  {company.matchScore}%
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-text-muted leading-relaxed mb-3">
                {company.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {company.rdFocus.map((focus) => (
                  <span
                    key={focus}
                    className="tag bg-bg text-text-muted text-[11px]"
                  >
                    {focus}
                  </span>
                ))}
              </div>

              {/* Meta Row */}
              <div className="flex items-center gap-3 text-xs text-text-light mb-4">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {company.employees}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {company.hq}
                </span>
              </div>

              {/* Expanded Details */}
              {expandedCard === company.id && (
                <div className="pt-3 border-t border-border space-y-3 animate-fade-in">
                  <div>
                    <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1.5">
                      Why this match?
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      AI analysis indicates strong synergy between your
                      electrification roadmap and {company.name}'s expertise in{' '}
                      {company.rdFocus[0].toLowerCase()}. Collaborative R&D could
                      accelerate time-to-market by 18-24 months.
                    </p>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1.5">
                      Potential collaboration areas
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Joint R&D', 'Pilot Project', 'Knowledge Exchange', 'Supply Chain'].map((area) => (
                        <span key={area} className="tag bg-primary-light text-primary text-[11px]">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="flex items-center justify-between mt-4">
                {getConnectionButton(company.id)}
                <button className="flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors cursor-pointer">
                  Full Profile
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedCompanies.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Sparkles className="w-8 h-8 text-text-light mx-auto mb-3" />
          <p className="text-sm text-text-muted">
            No partners match the current filter. Try adjusting your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

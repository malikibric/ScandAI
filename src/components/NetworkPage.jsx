import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Users,
  Building2,
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Loader2,
  Database,
  Globe,
  X,
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { parseMemberCSV, getSectorCategory } from '../data/csvParser';
import csvUrl from '../data/TE-medlemmar.csv?url';

const ITEMS_PER_PAGE = 30;

const CITY_FILTERS = [
  'Alla', 'GÖTEBORG', 'STOCKHOLM', 'MALMÖ', 'VÄSTERÅS', 'LINKÖPING',
  'JÖNKÖPING', 'LUND', 'ESKILSTUNA', 'BORÅS', 'SKELLEFTEÅ',
];

const SECTOR_FILTERS = [
  'Alla', 'Automotive', 'Machinery & Equipment', 'Metal Products',
  'Electrical Equipment', 'Software & IT', 'Aerospace & Marine',
  'Engineering & Architecture', 'Electronics & Optics', 'R&D',
  'Energy & Utilities',
];

export default function NetworkPage() {
  const { setActivePage } = useNexus();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('Alla');
  const [sectorFilter, setSectorFilter] = useState('Alla');
  const [showCities, setShowCities] = useState(false);
  const [showSectors, setShowSectors] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [expandedMember, setExpandedMember] = useState(null);

  // Load and parse CSV
  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseMemberCSV(text);
        setMembers(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load member data:', err);
        setLoading(false);
      });
  }, []);

  // Filtered results
  const filtered = useMemo(() => {
    let result = members;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.fullName.toLowerCase().includes(q) ||
          m.sector.toLowerCase().includes(q) ||
          m.city.toLowerCase().includes(q) ||
          m.municipality.toLowerCase().includes(q) ||
          m.ceo.toLowerCase().includes(q)
      );
    }

    if (cityFilter !== 'Alla') {
      result = result.filter(
        (m) => m.city.toUpperCase() === cityFilter.toUpperCase()
      );
    }

    if (sectorFilter !== 'Alla') {
      result = result.filter(
        (m) => getSectorCategory(m.sniCode) === sectorFilter
      );
    }

    return result;
  }, [members, search, cityFilter, sectorFilter]);

  const visible = filtered.slice(0, visibleCount);

  const resetFilters = () => {
    setSearch('');
    setCityFilter('Alla');
    setSectorFilter('Alla');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const hasActiveFilters = search || cityFilter !== 'Alla' || sectorFilter !== 'Alla';

  return (
    <section className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => setActivePage('home')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-text-muted" />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-text tracking-tight flex items-center gap-3">
                <Database className="w-6 h-6 text-primary" />
                Member Network
              </h1>
              <p className="text-sm text-text-muted">
                {loading
                  ? 'Loading member database...'
                  : `${members.length.toLocaleString()} Teknikföretagen member organizations`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                placeholder="Sök företag, stad, VD, bransch..."
                className="input-field pl-10"
              />
            </div>

            {/* City Filter */}
            <div className="relative">
              <button
                onClick={() => { setShowCities(!showCities); setShowSectors(false); }}
                className={`input-field flex items-center justify-between gap-2 min-w-[180px] cursor-pointer ${
                  cityFilter !== 'Alla' ? 'border-primary text-primary' : ''
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {cityFilter === 'Alla' ? 'Stad' : cityFilter}
                </span>
                {showCities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showCities && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-border rounded-xl shadow-lg p-1.5 animate-fade-in max-h-64 overflow-y-auto">
                  {CITY_FILTERS.map((city) => (
                    <button
                      key={city}
                      onClick={() => { setCityFilter(city); setShowCities(false); setVisibleCount(ITEMS_PER_PAGE); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                        cityFilter === city ? 'bg-primary-light text-primary font-medium' : 'hover:bg-gray-50 text-text-muted'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sector Filter */}
            <div className="relative">
              <button
                onClick={() => { setShowSectors(!showSectors); setShowCities(false); }}
                className={`input-field flex items-center justify-between gap-2 min-w-[220px] cursor-pointer ${
                  sectorFilter !== 'Alla' ? 'border-primary text-primary' : ''
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" />
                  {sectorFilter === 'Alla' ? 'Bransch' : sectorFilter}
                </span>
                {showSectors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showSectors && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-border rounded-xl shadow-lg p-1.5 animate-fade-in max-h-64 overflow-y-auto">
                  {SECTOR_FILTERS.map((sector) => (
                    <button
                      key={sector}
                      onClick={() => { setSectorFilter(sector); setShowSectors(false); setVisibleCount(ITEMS_PER_PAGE); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                        sectorFilter === sector ? 'bg-primary-light text-primary font-medium' : 'hover:bg-gray-50 text-text-muted'
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-accent hover:bg-accent-light transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Rensa
              </button>
            )}
          </div>

          {/* Results summary */}
          <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
            <span>
              Visar {visible.length} av {filtered.length.toLocaleString()} företag
              {hasActiveFilters && ` (filtrerat från ${members.length.toLocaleString()})`}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Sorterade efter antal anställda
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="glass-card p-16 text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
            <p className="text-sm text-text-muted">Laddar medlemsdatabas...</p>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <div className="space-y-2">
            {visible.map((member, index) => (
              <div
                key={member.id + index}
                className="glass-card overflow-hidden animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${Math.min(index * 0.02, 0.5)}s` }}
                onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
              >
                <div className="p-4 flex items-center gap-4">
                  {/* Rank / Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center text-sm font-bold text-text-muted shrink-0">
                    {index + 1}
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-text text-[15px] truncate">
                        {member.name}
                      </h4>
                      {member.employees > 0 && (
                        <span className="tag bg-primary-light text-primary text-[11px]">
                          <Users className="w-3 h-3" /> {member.employees.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-text-muted">
                      {member.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {member.city}
                        </span>
                      )}
                      {member.sector && (
                        <span className="flex items-center gap-1 truncate">
                          <Building2 className="w-3 h-3" /> {member.sector.substring(0, 50)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category tag */}
                  <span className="tag bg-bg text-text-muted text-[11px] hidden sm:flex shrink-0">
                    {getSectorCategory(member.sniCode)}
                  </span>

                  {/* Expand indicator */}
                  {expandedMember === member.id ? (
                    <ChevronUp className="w-4 h-4 text-text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                  )}
                </div>

                {/* Expanded details */}
                {expandedMember === member.id && (
                  <div className="px-4 pb-4 pt-0 border-t border-border animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                      <div className="p-3 rounded-xl bg-bg">
                        <div className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-1">Juridiskt namn</div>
                        <div className="text-sm font-medium text-text">{member.fullName}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-bg">
                        <div className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-1">Org.nummer</div>
                        <div className="text-sm font-medium text-text">{member.orgNr || '—'}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-bg">
                        <div className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-1">Medlemskap</div>
                        <div className="text-sm font-medium text-text">{member.membership || '—'}</div>
                      </div>
                      {member.ceo && (
                        <div className="p-3 rounded-xl bg-bg">
                          <div className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-1">VD</div>
                          <div className="text-sm font-medium text-text">{member.ceo.replace(/"/g, '')}</div>
                        </div>
                      )}
                      {member.email && (
                        <div className="p-3 rounded-xl bg-bg">
                          <div className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-1">E-post</div>
                          <a href={`mailto:${member.email}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {member.email}
                          </a>
                        </div>
                      )}
                      <div className="p-3 rounded-xl bg-bg">
                        <div className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-1">SNI-kod</div>
                        <div className="text-sm font-medium text-text">{member.sniCode.substring(0, 5) || '—'}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Load more */}
            {visibleCount < filtered.length && (
              <div className="text-center py-6">
                <button
                  onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                  className="btn-secondary"
                >
                  Visa fler ({Math.min(ITEMS_PER_PAGE, filtered.length - visibleCount)} till av {(filtered.length - visibleCount).toLocaleString()})
                </button>
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && !loading && (
              <div className="glass-card p-12 text-center">
                <Search className="w-8 h-8 text-text-light mx-auto mb-3" />
                <p className="text-sm font-medium text-text mb-1">Inga träffar</p>
                <p className="text-xs text-text-muted">
                  Försök med andra sökord eller rensa filtren.
                </p>
                <button onClick={resetFilters} className="btn-primary mt-4 text-sm">
                  Rensa alla filter
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

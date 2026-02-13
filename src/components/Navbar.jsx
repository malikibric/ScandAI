import {
  Menu,
  X,
  ChevronDown,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { useNexus } from '../context/NexusContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { activePage, setActivePage } = useNexus();
  const { logout, user, isLoggedIn } = useAuth();

  const navLinks = [
    { id: 'events', label: 'Events' },
    { id: 'network', label: 'Circles' },
    { id: 'home', label: 'Mentorships' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-50 pt-5 pb-2 px-6 lg:px-10 bg-bg">
      <div className="max-w-[1400px] mx-auto bg-[#7C3AED] rounded-2xl px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">

          {/* Left: Logo + Initiative */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setActivePage('home')}
              className="text-white text-[22px] font-light tracking-wide lowercase cursor-pointer bg-transparent border-none"
            >
              tech forward
            </button>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/30" />

            {/* Initiative text */}
            <div className="hidden lg:flex items-center gap-3 text-white/70 text-[13px]">
              <div className="leading-tight">
                <div>An initiative</div>
                <div>by</div>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-semibold text-white/90 text-[11px] tracking-wide leading-tight">
                  Technology Industries<br />of Sweden
                </span>
              </div>
            </div>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`text-[15px] font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none ${
                  activePage === link.id
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: ScandAI + Auth */}
          <div className="hidden md:flex items-center gap-5">
            {/* ScandAI button - special link to nexus dashboard */}
            <button
              onClick={() => setActivePage('nexus')}
              className={`text-[15px] font-semibold cursor-pointer bg-transparent border-none flex items-center gap-2 transition-colors duration-200 ${
                activePage === 'nexus'
                  ? 'text-white'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ScandAI
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-white/30" />

            {/* Auth Section */}
            {isLoggedIn && user ? (
              /* Logged-in: show profile dropdown */
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">
                    {user.initials}
                  </div>
                  <span className="text-[13px] font-semibold text-white/90 hover:text-white transition-colors">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/70" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-bg-card rounded-xl shadow-2xl border border-border py-2 animate-fade-in">
                    <div className="px-4 py-2.5 border-b border-border">
                      <div className="text-sm font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-text-muted">{user.role}</div>
                      <div className="text-xs text-primary-light">{user.company}</div>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-text-muted hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" /> Profile Settings
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); logout(); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in: show Log In + Join buttons */
              <>
                <button
                  onClick={() => setActivePage('nexus')}
                  className="text-[13px] font-semibold uppercase tracking-[0.15em] text-white/90 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                >
                  Log In
                </button>
                <button
                  onClick={() => setActivePage('nexus')}
                  className="text-[13px] font-semibold uppercase tracking-[0.15em] text-white px-6 py-2.5 rounded-md bg-[#1a0a2e] border border-white/20 hover:bg-[#2d1b4e] transition-colors cursor-pointer"
                >
                  Join
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/15 animate-fade-in">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-[15px] font-medium cursor-pointer ${
                  activePage === link.id
                    ? 'bg-white/15 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* ScandAI link in mobile */}
            <button
              onClick={() => {
                setActivePage('nexus');
                setMobileOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-[15px] font-semibold cursor-pointer flex items-center gap-2 ${
                activePage === 'nexus'
                  ? 'bg-white/15 text-white'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ScandAI
            </button>
          </div>

          <div className="px-6 py-4 border-t border-white/15 space-y-3">
            {isLoggedIn && user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold">
                    {user.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{user.name}</div>
                    <div className="text-xs text-white/70">{user.company}</div>
                  </div>
                </div>
                <button
                  onClick={() => { setMobileOpen(false); logout(); }}
                  className="w-full text-[13px] font-semibold uppercase tracking-[0.15em] text-red-400 px-6 py-2.5 rounded-md bg-red-400/10 border border-red-400/30 hover:bg-red-400/20 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setActivePage('nexus'); setMobileOpen(false); }}
                  className="w-full text-[13px] font-semibold uppercase tracking-[0.15em] text-white/90 px-6 py-2.5 rounded-md border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => { setActivePage('nexus'); setMobileOpen(false); }}
                  className="w-full text-[13px] font-semibold uppercase tracking-[0.15em] text-white px-6 py-2.5 rounded-md bg-[#1a0a2e] border border-white/20 hover:bg-[#2d1b4e] transition-colors cursor-pointer"
                >
                  Join
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

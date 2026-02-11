import {
  Menu,
  X,
  Bell,
  ChevronDown,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { useNexus } from '../context/NexusContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { activePage, setActivePage, notifications } = useNexus();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'network', label: 'Network' },
    { id: 'nexus', label: 'ScandAI' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setActivePage('home')}
          >
            <div className="flex flex-col">
              <span className="text-[20px] font-light tracking-wide text-white leading-tight lowercase">
                ScandAI
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activePage === link.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                } ${link.id === 'nexus' ? 'flex items-center gap-1.5' : ''}`}
              >
                {link.id === 'nexus' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                )}
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">
                  EL
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-sm font-semibold text-white leading-tight">Erik Lindström</div>
                  <div className="text-[11px] text-white/70 leading-tight">Volvo Personvagnar</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white/70" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-bg-card rounded-xl shadow-lg border border-border py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-border">
                    <div className="text-sm font-semibold text-white">Erik Lindström</div>
                    <div className="text-xs text-text-muted">Head of Innovation</div>
                    <div className="text-xs text-primary-light">Volvo Personvagnar</div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-text-muted hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" /> Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 cursor-pointer">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                  activePage === link.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold">
              EL
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Erik Lindström</div>
              <div className="text-xs text-white/70">Volvo Personvagnar</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

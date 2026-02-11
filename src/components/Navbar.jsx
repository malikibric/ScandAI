import {
  Menu,
  X,
  Bell,
  ChevronDown,
  Zap,
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
    { id: 'nexus', label: 'NEXUS' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setActivePage('home')}
          >
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold tracking-tight text-text leading-tight">
                Tech Forward
              </span>
              <span className="text-[10px] font-semibold text-primary tracking-widest uppercase leading-tight">
                NEXUS
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
                    ? 'bg-primary-light text-primary'
                    : 'text-text-muted hover:text-text hover:bg-gray-100'
                } ${link.id === 'nexus' ? 'flex items-center gap-1.5' : ''}`}
              >
                {link.id === 'nexus' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                )}
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-text-muted hover:text-text hover:bg-gray-100 transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  EL
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-sm font-semibold text-text leading-tight">Erik Lindström</div>
                  <div className="text-[11px] text-text-muted leading-tight">Volvo Group</div>
                </div>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-border py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-border">
                    <div className="text-sm font-semibold">Erik Lindström</div>
                    <div className="text-xs text-text-muted">Head of Innovation</div>
                    <div className="text-xs text-primary">Volvo Group</div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-text-muted hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" /> Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-accent hover:bg-accent-light cursor-pointer">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
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
                    ? 'bg-primary-light text-primary'
                    : 'text-text-muted hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
              EL
            </div>
            <div>
              <div className="text-sm font-semibold">Erik Lindström</div>
              <div className="text-xs text-text-muted">Volvo Group</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-text">Tech Forward</span>
                <span className="text-[9px] font-semibold text-primary tracking-widest uppercase ml-1">
                  NEXUS
                </span>
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Accelerating innovation across Swedish industry through
              AI-powered collaboration, anonymous problem solving, and
              industrial symbiosis.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2">
              {['Trust Vault', 'Symbiosis Agent', 'AI Matchmaker', 'Events Hub'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-text-muted hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Members */}
          <div>
            <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-3">
              For Members
            </h4>
            <ul className="space-y-2">
              {[
                'Membership Benefits',
                'R&D Collaboration',
                'Industry Reports',
                'Support & FAQ',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-3">
              Teknikföretagen
            </h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>Storgatan 5</li>
              <li>114 85 Stockholm</li>
              <li>Sweden</li>
              <li className="pt-1">
                <a href="#" className="text-primary hover:underline">
                  info@techforward.se
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-light">
            © 2026 Teknikföretagen — Swedish Association of Engineering Industries. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-light">
            <a href="#" className="hover:text-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg-card text-white mt-auto border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center gap-2.5 justify-center mb-4">
            <span className="text-xl font-light tracking-wide lowercase">ScandAI</span>
          </div>
          <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed mb-6">
            An initiative bringing together the tech community for knowledge sharing and industry connections
          </p>
          <div className="mb-6">
            <a href="mailto:hello@techforward.se" className="text-primary hover:text-primary-light hover:underline font-medium transition-colors">
              hello@techforward.se
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-text-muted">
          <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
          <span className="hidden sm:inline text-border-dark">•</span>
          <a href="#" className="hover:text-white transition-colors">Cookies policy</a>
        </div>
      </div>
    </footer>
  );
}

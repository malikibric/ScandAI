import { useNexus } from '../context/NexusContext';

export default function Footer() {
  const { setActivePage } = useNexus();

  return (
    <footer className="bg-bg text-white mt-auto border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left: Branding */}
          <div>
            <span className="text-2xl font-light tracking-wide lowercase block mb-4">tech forward</span>
            <p className="text-sm text-text-muted max-w-md leading-relaxed">
              Tech Forward is a new initiative by Technology Industries of Sweden to increase knowledge sharing and build new connections in the tech industry.
            </p>
          </div>

          {/* Right: Navigation */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <button onClick={() => setActivePage('home')} className="block text-sm text-text-muted hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                Home
              </button>
              <button className="block text-sm text-text-muted hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                This is Tech Forward
              </button>
              <button onClick={() => setActivePage('events')} className="block text-sm text-text-muted hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                Events
              </button>
              <button onClick={() => setActivePage('network')} className="block text-sm text-text-muted hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                Circles
              </button>
            </div>
            <div className="space-y-3">
              <button className="block text-sm text-text-muted hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                Mentorships
              </button>
              <button className="block text-sm text-text-muted hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                About
              </button>
              <button onClick={() => setActivePage('nexus')} className="block text-sm text-text-muted hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-4">
            <a href="https://www.teknikforetagen.se/om-oss/personuppgiftspolicy/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              Privacy policy
            </a>
            <span className="text-border-dark">•</span>
            <a href="https://www.teknikforetagen.se/om-oss/personuppgiftspolicy/om-cookies/" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              Cookies
            </a>
          </div>
          <a href="mailto:hello@techforward.se" className="text-primary hover:text-primary-light hover:underline font-medium transition-colors">
            hello@techforward.se
          </a>
        </div>
      </div>
    </footer>
  );
}

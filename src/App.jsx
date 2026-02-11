import { NexusProvider, useNexus } from './context/NexusContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NexusDashboard from './components/NexusDashboard';
import NetworkPage from './components/NetworkPage';
import Footer from './components/Footer';

function AppContent() {
  const { activePage } = useNexus();

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      {activePage === 'nexus' ? (
        <NexusDashboard />
      ) : activePage === 'network' ? (
        <NetworkPage />
      ) : (
        <>
          <Hero />
          <Footer />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <NexusProvider>
      <AppContent />
    </NexusProvider>
  );
}

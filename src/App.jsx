import { AuthProvider, useAuth } from './context/AuthContext';
import { NexusProvider, useNexus } from './context/NexusContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NexusDashboard from './components/NexusDashboard';
import NetworkPage from './components/NetworkPage';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';

function AppContent() {
  const { activePage } = useNexus();
  const { isLoggedIn } = useAuth();

  // If user clicks ScandAI / nexus but is not logged in → show login page
  const needsAuth = activePage === 'nexus' && !isLoggedIn;

  return (
    <div className="min-h-screen flex flex-col bg-bg text-white">
      <Navbar />
      {needsAuth ? (
        <LoginPage />
      ) : activePage === 'nexus' ? (
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
    <AuthProvider>
      <NexusProvider>
        <AppContent />
      </NexusProvider>
    </AuthProvider>
  );
}

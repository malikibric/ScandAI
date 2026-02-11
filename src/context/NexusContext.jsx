import { createContext, useContext, useState, useCallback } from 'react';

const NexusContext = createContext(null);

export function NexusProvider({ children }) {
  // Connection states for AI Matchmaker
  const [connections, setConnections] = useState({});
  
  // Trust Vault problems
  const [problems, setProblems] = useState([]);
  
  // Trade modal state
  const [tradeModal, setTradeModal] = useState({ open: false, opportunity: null });
  
  // Active dashboard tab
  const [activeTab, setActiveTab] = useState('trust-vault');

  // Active page
  const [activePage, setActivePage] = useState('home');

  // Notification count
  const [notifications, setNotifications] = useState(3);

  // Handle connect button
  const initiateConnection = useCallback((companyId) => {
    setConnections(prev => ({ ...prev, [companyId]: 'pending' }));
    
    setTimeout(() => {
      setConnections(prev => ({ ...prev, [companyId]: 'connected' }));
    }, 2000);
  }, []);

  // Submit a burning problem
  const submitProblem = useCallback((problem) => {
    const newProblem = {
      id: `prob_new_${Date.now()}`,
      anonymousLabel: `Hidden Industry Giant #${Math.floor(Math.random() * 90) + 10}`,
      tag: problem.tag || 'General',
      description: problem.description,
      timestamp: 'Just now',
      proposals: 0,
      isAnonymous: problem.isAnonymous,
      company: problem.isAnonymous ? null : 'Volvo Personvagnar',
    };
    setProblems(prev => [newProblem, ...prev]);
  }, []);

  // Open trade modal
  const openTradeModal = useCallback((opportunity) => {
    setTradeModal({ open: true, opportunity });
  }, []);

  // Close trade modal
  const closeTradeModal = useCallback(() => {
    setTradeModal({ open: false, opportunity: null });
  }, []);

  const value = {
    connections,
    initiateConnection,
    problems,
    submitProblem,
    tradeModal,
    openTradeModal,
    closeTradeModal,
    activeTab,
    setActiveTab,
    activePage,
    setActivePage,
    notifications,
    setNotifications,
  };

  return (
    <NexusContext.Provider value={value}>
      {children}
    </NexusContext.Provider>
  );
}

export function useNexus() {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider');
  }
  return context;
}

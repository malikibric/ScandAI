import { useState } from 'react';
import {
  Recycle,
  TrendingUp,
  Zap,
  MapPin,
  Thermometer,
  Package,
  ArrowRight,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bell,
  ArrowRightLeft,
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import {
  wasteStreams,
  marketOpportunities,
  aiAlerts,
  contractPreview,
} from '../data/mockData';

export default function SymbiosisAgent() {
  const { tradeModal, openTradeModal, closeTradeModal } = useNexus();
  const [contractSigned, setContractSigned] = useState(false);

  const statusColors = {
    available: 'bg-success-light text-success',
    matched: 'bg-primary-light text-primary',
  };

  const priorityColors = {
    high: 'border-l-accent',
    medium: 'border-l-primary',
    low: 'border-l-border-dark',
  };

  return (
    <div className="space-y-6">
      {/* AI Alerts Bar */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <h3 className="font-bold text-sm text-text">AI Symbiosis Alerts</h3>
          <span className="pulse-dot ml-1" />
        </div>
        <div className="space-y-2">
          {aiAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-xl bg-bg border-l-3 ${priorityColors[alert.priority]} animate-slide-in-right`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-lg mt-0.5">{alert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-text">{alert.title}</div>
                <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                  {alert.message}
                </p>
                <div className="text-[11px] text-text-light mt-1 flex items-center gap-1">
                  <Bell className="w-3 h-3" />
                  {alert.timestamp}
                </div>
              </div>
              <button
                onClick={() =>
                  alert.type === 'resource_match'
                    ? openTradeModal(marketOpportunities[0])
                    : null
                }
                className="btn-primary text-xs px-3 py-1.5 shrink-0"
              >
                {alert.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Waste Streams */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Recycle className="w-5 h-5 text-success" />
            <h3 className="font-bold text-text">My Waste Streams</h3>
          </div>
          <div className="space-y-3">
            {wasteStreams.map((stream, index) => (
              <div
                key={stream.id}
                className="glass-card p-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-text">{stream.type}</h4>
                      <span className={`tag text-[11px] ${statusColors[stream.status]}`}>
                        {stream.status === 'matched' ? '✓ Matched' : 'Available'}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{stream.source}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Package className="w-3 h-3" />
                    <span>{stream.quantity}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <MapPin className="w-3 h-3" />
                    <span>{stream.location}</span>
                  </div>
                  {stream.temperature !== 'N/A' && (
                    <div className="flex items-center gap-1.5 text-text-muted col-span-2">
                      <Thermometer className="w-3 h-3" />
                      <span>{stream.temperature}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Market Opportunities */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-text">Market Opportunities</h3>
          </div>
          <div className="space-y-3">
            {marketOpportunities.map((opp, index) => (
              <div
                key={opp.id}
                className="glass-card p-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-text">{opp.company}</h4>
                    <p className="text-xs text-primary font-medium">{opp.need}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary-light">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-primary">
                      {opp.matchConfidence}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-text-muted leading-relaxed mb-3">
                  {opp.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-success">
                    {opp.potential}
                  </span>
                  <button
                    onClick={() => openTradeModal(opp)}
                    className="btn-primary text-xs px-3 py-1.5"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    Initiate Trade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trade / Contract Modal */}
      {tradeModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center">
                  <FileText className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-bold text-text">{contractPreview.title}</h3>
                  <p className="text-xs text-text-muted">
                    {contractPreview.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  closeTradeModal();
                  setContractSigned(false);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Parties */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-bg">
                  <div className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-1">
                    Resource Provider
                  </div>
                  <div className="text-sm font-semibold text-text">
                    {contractPreview.parties.provider}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-bg">
                  <div className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-1">
                    Resource Receiver
                  </div>
                  <div className="text-sm font-semibold text-text">
                    {contractPreview.parties.receiver}
                  </div>
                </div>
              </div>

              {/* Resource */}
              <div className="p-3 rounded-xl bg-primary-light/50 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {contractPreview.resource}
                </span>
              </div>

              {/* Terms */}
              <div>
                <h4 className="text-sm font-semibold text-text mb-3">
                  Agreement Terms
                </h4>
                <ul className="space-y-2">
                  {contractPreview.terms.map((term, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      {term}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Value & Impact */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-success-light text-center">
                  <div className="text-xs text-success font-medium mb-1">
                    Estimated Value
                  </div>
                  <div className="text-lg font-bold text-success">
                    {contractPreview.estimatedValue}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-primary-light text-center">
                  <div className="text-xs text-primary font-medium mb-1">
                    Carbon Impact
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {contractPreview.carbonImpact}
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-warning-light text-xs text-warning">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  This is a preliminary framework agreement. Final terms
                  require legal review and board-level approval from both
                  parties before binding commitment.
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    closeTradeModal();
                    setContractSigned(false);
                  }}
                  className="btn-secondary flex-1 justify-center"
                >
                  Review Later
                </button>
                <button
                  onClick={() => setContractSigned(true)}
                  disabled={contractSigned}
                  className={`flex-1 justify-center font-semibold py-2.5 px-6 rounded-xl text-sm transition-all cursor-pointer inline-flex items-center gap-2 ${
                    contractSigned
                      ? 'bg-success text-white'
                      : 'bg-accent text-white hover:bg-[#CF2F3C] shadow-lg shadow-accent/20'
                  }`}
                >
                  {contractSigned ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Agreement Initiated
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      Sign Framework Agreement
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

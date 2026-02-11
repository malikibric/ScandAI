import { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
  Send,
  Lock,
  Lightbulb,
  MessageSquare,
  Clock,
  ChevronRight,
  Handshake,
  Tag,
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { burningProblems as initialProblems } from '../data/mockData';

const TAG_OPTIONS = [
  'Battery Recycling',
  'Predictive Maintenance',
  'Carbon Capture',
  'Supply Chain',
  'Electrification',
  'Automation',
  'Materials Science',
  'Hydrogen',
  'Digital Twin',
  'Circular Economy',
];

export default function TrustVault() {
  const { problems: newProblems, submitProblem } = useNexus();
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedTag, setSelectedTag] = useState('');
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [proposalModal, setProposalModal] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const allProblems = [...newProblems, ...initialProblems];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    submitProblem({
      description: description.trim(),
      tag: selectedTag || 'General',
      isAnonymous,
    });

    setDescription('');
    setSelectedTag('');
    setIsAnonymous(true);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Submission Form */}
      <div className="lg:col-span-2">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-text">Post a Burning Problem</h3>
              <p className="text-xs text-text-muted">Encrypted & secure submission</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Technical Challenge
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your technical challenge in detail. Be specific about requirements, scale, and constraints..."
                className="input-field min-h-[120px] resize-none"
                rows={4}
              />
            </div>

            {/* Tag Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-text mb-1.5">
                Category Tag
              </label>
              <button
                type="button"
                onClick={() => setShowTagPicker(!showTagPicker)}
                className="input-field text-left flex items-center justify-between cursor-pointer"
              >
                <span className={selectedTag ? 'text-text' : 'text-text-light'}>
                  {selectedTag || 'Select a category...'}
                </span>
                <Tag className="w-4 h-4 text-text-muted" />
              </button>

              {showTagPicker && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-xl shadow-lg p-2 animate-fade-in max-h-48 overflow-y-auto">
                  {TAG_OPTIONS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSelectedTag(tag);
                        setShowTagPicker(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                        selectedTag === tag
                          ? 'bg-primary-light text-primary font-medium'
                          : 'hover:bg-gray-50 text-text-muted'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-bg">
              <div className="flex items-center gap-2.5">
                {isAnonymous ? (
                  <EyeOff className="w-4 h-4 text-primary" />
                ) : (
                  <Eye className="w-4 h-4 text-text-muted" />
                )}
                <div>
                  <div className="text-sm font-medium text-text">Anonymous Mode</div>
                  <div className="text-[11px] text-text-muted">
                    {isAnonymous
                      ? 'Your identity is hidden from all participants'
                      : 'Your company name will be visible'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                  isAnonymous ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    isAnonymous ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-primary-light/50 text-xs text-primary">
              <Lock className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                All submissions are end-to-end encrypted. Identity is only
                revealed during a mutually agreed Double-Blind Handshake.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!description.trim()}
              className={`btn-primary w-full justify-center py-3 ${
                submitted ? 'bg-success hover:bg-success' : ''
              }`}
            >
              {submitted ? (
                <>
                  <ShieldCheck className="w-4 h-4" /> Securely Submitted
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Challenge
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Problems Feed */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-warning" />
            Active Challenges
            <span className="tag bg-warning-light text-warning">{allProblems.length}</span>
          </h3>
        </div>

        <div className="space-y-3">
          {allProblems.map((problem, index) => (
            <div
              key={problem.id}
              className="glass-card p-5 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {problem.isAnonymous ? (
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                        <Shield className="w-3.5 h-3.5" />
                        {problem.anonymousLabel}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-text">
                        {problem.company}
                      </span>
                    )}
                    <span className="tag bg-primary-light text-primary">
                      {problem.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-muted leading-relaxed mb-3">
                    {problem.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-text-light">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {problem.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {problem.proposals} proposals
                    </span>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => setProposalModal(problem.id)}
                  className="btn-secondary text-xs px-3 py-2 shrink-0"
                >
                  <Handshake className="w-3.5 h-3.5" />
                  Propose Solution
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proposal Modal */}
      {proposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Handshake className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text">Double-Blind Handshake</h3>
                <p className="text-xs text-text-muted">
                  Your identity remains protected until both parties agree to connect
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Your Proposed Solution
                </label>
                <textarea
                  placeholder="Describe how your expertise or technology can address this challenge..."
                  className="input-field min-h-[100px] resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Relevant Capabilities
                </label>
                <input
                  type="text"
                  placeholder="e.g., Machine Learning, Process Optimization, Sensor Tech"
                  className="input-field"
                />
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl bg-success-light text-xs text-success">
                <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  Both parties will review anonymized proposals. Identities
                  are only revealed after mutual acceptance of the handshake.
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setProposalModal(null)}
                  className="btn-secondary flex-1 justify-center"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setProposalModal(null)}
                  className="btn-primary flex-1 justify-center"
                >
                  <Send className="w-4 h-4" />
                  Submit Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

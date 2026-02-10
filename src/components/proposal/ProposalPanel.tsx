import { useAppStore } from '../../store/useAppStore';
import { AgentPanel } from '../agents/AgentPanel';
import { ImageComparison } from './ImageComparison';
import { PromptInput } from './PromptInput';
import './ProposalPanel.css';

export function ProposalPanel() {
  const { selectedHotspot, selectedProposal, showProposalPanel, clearSelection } = useAppStore();

  if (!showProposalPanel || !selectedHotspot) return null;

  return (
    <div className="proposal-panel-overlay">
      <div className="proposal-panel">
        {/* Close button */}
        <button className="panel-close" onClick={clearSelection} aria-label="Close">
          ✕
        </button>

        {/* Left side: Location + Images */}
        <div className="panel-left">
          {/* Location header */}
          <div className="panel-header">
            <div className="location-badge">{selectedHotspot.type}</div>
            <h2>{selectedHotspot.name}</h2>
            <p className="text-secondary text-sm">{selectedHotspot.neighborhood}</p>
          </div>

          {/* User info */}
          {selectedProposal && (
            <div className="user-info">
              <div className="user-avatar">
                {selectedProposal.userName.charAt(0)}
              </div>
              <div>
                <span className="user-name">{selectedProposal.userName}</span>
                <span className="user-age">{selectedProposal.userAge} years old</span>
              </div>
            </div>
          )}

          {/* Proposal prompt */}
          {selectedProposal && (
            <div className="proposal-prompt">
              <span className="prompt-label">Proposed change</span>
              <p>"{selectedProposal.prompt}"</p>
            </div>
          )}

          {/* Image comparison */}
          {selectedProposal ? (
            <ImageComparison
              originalImage={selectedProposal.originalImage}
              generatedImage={selectedProposal.generatedImage}
              locationName={selectedHotspot.name}
            />
          ) : (
            <div className="no-proposal">
              <p className="text-secondary">No proposals yet for this location.</p>
            </div>
          )}

          {/* Prompt input (non-functional placeholder for PoC) */}
          <PromptInput />

          {/* Location metadata */}
          <div className="location-meta">
            <div className="meta-item">
              <span className="meta-label">Area</span>
              <span className="meta-value">{selectedHotspot.area}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Climate</span>
              <span className="meta-value">{selectedHotspot.yearlyWeather}</span>
            </div>
          </div>
        </div>

        {/* Right side: Agent feedback */}
        <div className="panel-right">
          {selectedProposal ? (
            <AgentPanel feedback={selectedProposal.agentFeedback} />
          ) : (
            <div className="no-agents">
              <p className="text-secondary text-sm">
                Agent analysis will appear here after a proposal is submitted.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

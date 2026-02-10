import type { AgentFeedback } from '../../types';
import './AgentCard.css';

interface Props {
  agent: AgentFeedback;
}

function getScoreColor(score: number): string {
  if (score >= 4) return 'var(--color-green)';
  if (score >= 3) return 'var(--color-amber)';
  return 'var(--color-red)';
}

function getScoreDots(score: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <div
      key={i}
      className={`score-dot ${i < score ? 'active' : ''}`}
      style={i < score ? { backgroundColor: getScoreColor(score) } : undefined}
    />
  ));
}

export function AgentCard({ agent }: Props) {
  return (
    <div className="agent-card">
      <div className="agent-card-header">
        <span className="agent-icon">{agent.icon}</span>
        <span className="agent-name">{agent.name}</span>
        <div className="score-dots">{getScoreDots(agent.score)}</div>
      </div>
      <p className="agent-feedback">{agent.feedback}</p>
    </div>
  );
}

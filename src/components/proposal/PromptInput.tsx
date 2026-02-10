import { useState } from 'react';
import './PromptInput.css';

/**
 * Prompt input — placeholder for PoC.
 * Shows the text input + a voice icon hint for the future.
 * Non-functional: pressing submit shows a toast-like message.
 */
export function PromptInput() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (value.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="prompt-input-wrapper">
      <label className="prompt-input-label">
        Suggest a change
        <span className="voice-hint">🎤 Voice input coming soon</span>
      </label>
      <div className="prompt-input-row">
        <input
          type="text"
          className="prompt-input"
          placeholder="Describe the change you'd like to see…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          className="prompt-submit"
          onClick={handleSubmit}
          disabled={!value.trim()}
        >
          Submit
        </button>
      </div>
      {submitted && (
        <div className="prompt-toast">
          ✓ In the full version, this would generate an AI image and trigger agent analysis.
        </div>
      )}
    </div>
  );
}

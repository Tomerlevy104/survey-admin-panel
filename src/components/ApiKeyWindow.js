import { useState } from "react";
import "./ApiKeyWindow.css";

/**
 * ApiKeyWindow
 * One-time window shown after successful registration.
 */
export default function ApiKeyWindow({ apiKey, onClose }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="api-key-window__backdrop" role="dialog" aria-modal="true">
      <div className="api-key-window__card">
        <button
          type="button"
          className="api-key-window__close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="api-key-window__title">Your API Key</h2>

        <p className="api-key-window__subtitle">
          Please store this key securely. You may not see it again.
        </p>

        <div className="api-key-window__row">
          <code className="api-key-window__value">{apiKey}</code>

          <button
            type="button"
            className="api-key-window__copy"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="api-key-window__actions">
          <button
            type="button"
            className="api-key-window__primary"
            onClick={onClose}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

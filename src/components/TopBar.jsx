export default function TopBar({ prUrl, onPrUrlChange }) {
  return (
    <header className="topbar">
      <div className="logo">
        <div className="logo-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="12" y1="3" x2="12" y2="21" opacity="0.45" />
          </svg>
        </div>
        <span className="logo-name">CodeSentinel</span>
        <span className="badge-ai">AI Review</span>
      </div>

      <div className="topbar-spacer" />

      <label className="pr-field" aria-label="GitHub PR URL">
        <span className="pr-prefix">github.com/</span>
        <input
          value={prUrl}
          onChange={(e) => onPrUrlChange(e.target.value)}
          placeholder="owner/repo/pull/123"
          aria-label="PR path"
        />
      </label>
    </header>
  );
}

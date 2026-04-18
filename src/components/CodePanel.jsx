import { LANGUAGES } from "../utils/samples";

export default function CodePanel({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onAnalyze,
  onLoadSample,
  onClear,
  loading,
}) {
  return (
    <section className="code-panel" aria-label="Code input">
      <div className="panel-header">
        <h2 className="panel-title">Paste diff or code snippet</h2>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          aria-label="Select language"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder="Paste your PR diff or code here…"
        spellCheck={false}
        aria-label="Code editor"
      />

      <div className="panel-footer">
        <button
          className="btn-primary"
          onClick={onAnalyze}
          disabled={loading || !code.trim()}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Analyzing…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Analyze code
            </>
          )}
        </button>
        <button className="btn-ghost" onClick={onLoadSample} disabled={loading}>
          Load example
        </button>
        <button className="btn-ghost" onClick={onClear} disabled={loading}>
          Clear
        </button>
      </div>
    </section>
  );
}

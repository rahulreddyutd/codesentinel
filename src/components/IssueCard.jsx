import { useState } from "react";

const SEV_CLASS = {
  critical: "sev-critical",
  high:     "sev-high",
  medium:   "sev-medium",
  low:      "sev-low",
  info:     "sev-info",
};

export default function IssueCard({ issue }) {
  const [open, setOpen] = useState(false);
  const sev = (issue.severity || "info").toLowerCase();

  return (
    <article className="issue-card">
      <button
        className="issue-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={`sev-badge ${SEV_CLASS[sev] ?? "sev-info"}`}>{sev}</span>
        <div className="issue-meta">
          <span className="issue-title">{issue.title}</span>
          <span className="issue-category">{issue.category}</span>
        </div>
        <span className="chevron" aria-hidden="true" style={{ transform: open ? "rotate(90deg)" : "none" }}>›</span>
      </button>

      {open && (
        <div className="issue-body">
          <p className="issue-desc">{issue.description}</p>
          {issue.affected_code && (
            <pre className="code-snippet">{issue.affected_code}</pre>
          )}
          {issue.suggestion && (
            <div className="suggestion-box">
              <span aria-hidden="true">💡</span> {issue.suggestion}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

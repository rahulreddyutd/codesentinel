import { useState, useEffect } from "react";
import IssueCard from "./IssueCard";
import ArchCard from "./ArchCard";
import ScoreRing from "./ScoreRing";

const DEMO_FILES = ["src/auth/login.js", "src/api/users.js"];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "security", label: "Security", countKey: "security_issues" },
  { id: "arch", label: "Architecture", countKey: "architecture_suggestions" },
  { id: "quality", label: "Code quality", countKey: "quality_issues" },
];

export default function ReviewPanel({ reviewData, loading, error }) {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => { if (reviewData) setActiveTab("overview"); }, [reviewData]);

  function count(key) {
    return reviewData?.[key]?.length ?? 0;
  }

  function tabClass(id) {
    return `tab-btn ${activeTab === id ? "active" : ""}`;
  }

  function badgeClass(key) {
    if (key === "security_issues") return "badge-danger";
    if (key === "architecture_suggestions") return "badge-warning";
    return "badge-info";
  }

  return (
    <section className="review-panel" aria-label="Review results">
      <nav className="tab-bar" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            className={tabClass(t.id)}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
            {t.countKey && reviewData && (
              <span className={`tab-badge ${badgeClass(t.countKey)}`}>
                {count(t.countKey)}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="review-body" role="tabpanel">
        {loading && (
          <div className="state-center">
            <span className="spinner lg" />
            <p>Running AI code review…</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-center">
            <span className="state-icon error">⚠</span>
            <p className="state-msg">{error}</p>
          </div>
        )}

        {!loading && !error && !reviewData && (
          <div className="state-center">
            <p className="state-msg">Paste code and click <strong>Analyze code</strong> to get AI-powered feedback.</p>
          </div>
        )}

        {!loading && !error && reviewData && (
          <>
            {activeTab === "overview" && (
              <div>
                <div className="file-row">
                  <span className="muted">Files reviewed:</span>
                  {DEMO_FILES.map((f) => (
                    <span key={f} className="file-chip">{f}</span>
                  ))}
                </div>
                <div className="scores-row">
                  {["security", "architecture", "quality"].map((k) => (
                    <ScoreRing key={k} label={k} value={reviewData.scores?.[k] ?? 0} />
                  ))}
                </div>
                <div className="summary-box">{reviewData.summary}</div>
                <p className="tally muted">
                  {count("security_issues")} security issues · {count("architecture_suggestions")} architecture suggestions · {count("quality_issues")} quality improvements
                </p>
              </div>
            )}

            {activeTab === "security" && (
              reviewData.security_issues?.length
                ? reviewData.security_issues.map((iss, i) => <IssueCard key={i} issue={iss} />)
                : <div className="state-center"><p className="state-msg">No security issues found.</p></div>
            )}

            {activeTab === "arch" && (
              reviewData.architecture_suggestions?.length
                ? reviewData.architecture_suggestions.map((a, i) => <ArchCard key={i} item={a} />)
                : <div className="state-center"><p className="state-msg">No architectural suggestions.</p></div>
            )}

            {activeTab === "quality" && (
              reviewData.quality_issues?.length
                ? reviewData.quality_issues.map((iss, i) => <IssueCard key={i} issue={iss} />)
                : <div className="state-center"><p className="state-msg">No quality issues found.</p></div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

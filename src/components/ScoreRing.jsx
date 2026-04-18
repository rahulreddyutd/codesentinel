const R = 28;
const CIRC = 2 * Math.PI * R;

function color(v) {
  if (v >= 75) return "#16a34a";
  if (v >= 50) return "#d97706";
  return "#dc2626";
}

export default function ScoreRing({ label, value }) {
  const pct = Math.min(100, Math.max(0, value));
  const dash = (pct / 100) * CIRC;
  const c = color(pct);

  return (
    <div className="score-ring-wrap">
      <svg width="72" height="72" viewBox="0 0 72 72" aria-label={`${label} score: ${pct}`}>
        <circle cx="36" cy="36" r={R} fill="none" stroke="var(--border)" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={R}
          fill="none"
          stroke={c}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${CIRC}`}
          strokeDashoffset={CIRC * 0.25}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
        <text x="36" y="40" textAnchor="middle" fontSize="16" fontWeight="500" fill={c}>{pct}</text>
      </svg>
      <span className="score-label">{label}</span>
    </div>
  );
}

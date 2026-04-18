export default function ArchCard({ item }) {
  return (
    <article className="arch-card">
      <header className="arch-header">
        <span className="arch-title">{item.title}</span>
        <span className="arch-type-badge">{item.type || "Pattern"}</span>
      </header>
      <p className="arch-desc">{item.description}</p>
      {item.impact && (
        <p className="arch-impact">
          <strong>Impact:</strong> {item.impact}
        </p>
      )}
    </article>
  );
}

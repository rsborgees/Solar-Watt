export default function ChapterDivider({ label }) {
  return (
    <div className="chapter-divider" role="presentation">
      <span className="chapter-divider-line" />
      <span className="chapter-divider-label">{label}</span>
      <span className="chapter-divider-line" />
    </div>
  )
}

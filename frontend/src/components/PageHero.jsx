export default function PageHero({ eyebrow, title, description }) {
  return (
    <header className="page-hero">
      {eyebrow && <span className="section-label">{eyebrow}</span>}
      <h1>{title}</h1>
      {description && <p className="page-hero-desc">{description}</p>}
    </header>
  )
}

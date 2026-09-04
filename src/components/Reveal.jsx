// Lightweight reveal wrapper. Renders any tag, applies the `.reveal` class
// (animated by the global useReveal observer) plus an optional stagger delay.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

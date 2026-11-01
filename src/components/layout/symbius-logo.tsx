type SymbiusLogoProps = {
  size?: number
  className?: string
  onDark?: boolean
}

export function SymbiusLogo({ size = 36, className, onDark = false }: SymbiusLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      strokeWidth={6}
      strokeLinecap="round"
      aria-label="Symbius"
      role="img"
      className={className}
    >
      <path d="M35 13A12 12 0 1 0 24 30" stroke={onDark ? '#7fd0d4' : 'var(--primary)'} />
      <path d="M13 35A12 12 0 1 0 24 18" stroke={onDark ? '#2f9aa0' : 'var(--brand-accent)'} />
    </svg>
  )
}
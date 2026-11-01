export type StatusBadgeVariant = 'neutral' | 'info' | 'warning' | 'success' | 'danger'

// Cores definidas em index.css (--badge-*), com versão clara e escura.
const variantClassName: Record<StatusBadgeVariant, string> = {
  neutral: 'bg-badge-neutral text-badge-neutral-foreground',
  info: 'bg-badge-info text-badge-info-foreground',
  warning: 'bg-badge-warning text-badge-warning-foreground',
  success: 'bg-badge-success text-badge-success-foreground',
  danger: 'bg-badge-danger text-badge-danger-foreground',
}

type StatusBadgeProps = {
  label: string
  variant?: StatusBadgeVariant
  className?: string
}

export function StatusBadge({ label, variant = 'neutral', className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClassName[variant]} ${className}`.trim()}
    >
      {label}
    </span>
  )
}
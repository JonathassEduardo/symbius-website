import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    element.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-6px)`
    element.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
    element.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }

  function handlePointerLeave() {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group/tilt relative transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)',
        }}
      />
    </div>
  )
}
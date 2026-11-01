'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

type TruncatedAxisTickProps = {
  x?: number
  y?: number
  payload?: { value: number | string }
  formatter: (value: number | string) => string
  maxLength?: number
  align?: 'start' | 'end'
  className?: string
}

export function TruncatedAxisTick({
  x = 0,
  y = 0,
  payload,
  formatter,
  maxLength = 9,
  align = 'end',
  className,
}: TruncatedAxisTickProps) {
  const [tooltipPos, setTooltipPos] = useState<{
    x: number
    y: number
  } | null>(null)

  if (payload?.value === undefined) return null

  const fullValue = formatter(payload.value)

  const displayValue =
    fullValue.length > maxLength
      ? `${fullValue.slice(0, maxLength - 1)}…`
      : fullValue

  const isTruncated = displayValue !== fullValue

  return (
    <>
      <text
        x={x}
        y={y}
        dy={4}
        textAnchor={align === 'end' ? 'end' : 'start'}
        fontSize={12}
        className={cn(
          'fill-muted-foreground',
          isTruncated && 'cursor-default',
          className,
        )}
        onMouseEnter={(e) =>
          isTruncated &&
          setTooltipPos({ x: e.clientX, y: e.clientY })
        }
        onMouseMove={(e) =>
          isTruncated &&
          setTooltipPos({ x: e.clientX, y: e.clientY })
        }
        onMouseLeave={() => setTooltipPos(null)}
      >
        {displayValue}
      </text>

      {isTruncated &&
        tooltipPos &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs text-white shadow-xl"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y - 8,
            }}
          >
            {fullValue}
          </div>,
          document.body,
        )}
    </>
  )
}
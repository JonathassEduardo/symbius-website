import type { CSSProperties } from 'react'
import { Cpu, Dna, HeartPulse, Plus, ShieldCheck, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Particle = {
  left: string
  top: string
  size: number
  delay: number
}

const particles: Particle[] = [
  { left: '6%', top: '18%', size: 6, delay: 0 },
  { left: '14%', top: '64%', size: 4, delay: 1.2 },
  { left: '22%', top: '38%', size: 5, delay: 2.4 },
  { left: '31%', top: '82%', size: 6, delay: 0.6 },
  { left: '38%', top: '14%', size: 4, delay: 3.1 },
  { left: '47%', top: '58%', size: 5, delay: 1.8 },
  { left: '55%', top: '24%', size: 6, delay: 2.9 },
  { left: '63%', top: '76%', size: 4, delay: 0.3 },
  { left: '71%', top: '42%', size: 5, delay: 2.1 },
  { left: '78%', top: '12%', size: 6, delay: 1.5 },
  { left: '84%', top: '68%', size: 4, delay: 3.4 },
  { left: '90%', top: '34%', size: 5, delay: 0.9 },
  { left: '95%', top: '86%', size: 6, delay: 2.6 },
  { left: '42%', top: '90%', size: 4, delay: 1.1 },
]

const sectionParticles: Particle[] = [
  { left: '10%', top: '20%', size: 5, delay: 0.4 },
  { left: '24%', top: '78%', size: 4, delay: 1.9 },
  { left: '48%', top: '12%', size: 5, delay: 2.7 },
  { left: '66%', top: '70%', size: 4, delay: 1.1 },
  { left: '82%', top: '28%', size: 5, delay: 3.2 },
  { left: '92%', top: '82%', size: 4, delay: 2.3 },
]

// Dois batimentos completos (onda P, complexo QRS e onda T) numa linha só.
const ecgPath =
  'M0 60 H300 C315 60 320 48 335 48 C350 48 355 60 370 60 H410 L425 70 L450 8 L478 108 L495 60 H540 C565 60 570 34 600 34 C630 34 635 60 660 60 ' +
  'H920 C935 60 940 48 955 48 C970 48 975 60 990 60 H1030 L1045 70 L1070 8 L1098 108 L1115 60 H1160 C1185 60 1190 34 1220 34 C1250 34 1255 60 1280 60 H1400'

// As variáveis --px e --py (de -1 a 1) vêm da seção do hero, atualizadas pelo mouse.
function parallax(strength: number): CSSProperties {
  return {
    transform: `translate3d(calc(var(--px, 0) * ${strength}px), calc(var(--py, 0) * ${strength}px), 0)`,
  }
}

function EcgLine() {
  return (
    <svg
      viewBox="0 0 1400 120"
      preserveAspectRatio="none"
      className="text-brand-accent absolute inset-x-0 top-[80%] h-24 w-full"
    >
      <path
        d={ecgPath}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.15"
        className="[vector-effect:non-scaling-stroke]"
      />
      <path
        d={ecgPath}
        pathLength={1000}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="260 740"
        className="drop-shadow-[0_0_8px_rgba(127,208,212,0.9)] [vector-effect:non-scaling-stroke] motion-safe:animate-ecg"
      />
    </svg>
  )
}

type FloatingIconProps = {
  icon: LucideIcon
  className: string
  delay: number
}

function FloatingIcon({ icon: Icon, className, delay }: FloatingIconProps) {
  return (
    <div
      style={{ animationDelay: `${delay}s` }}
      className={`absolute rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_24px_rgba(127,208,212,0.15)] backdrop-blur-sm motion-safe:animate-float ${className}`}
    >
      <Icon className="text-brand-accent size-6 sm:size-7" />
    </div>
  )
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 transition-transform duration-500 ease-out" style={parallax(24)}>
        <div className="bg-brand-accent/20 absolute -top-24 -left-24 size-96 rounded-full blur-3xl motion-safe:animate-pulse [animation-duration:6s]" />
        <div className="bg-primary/30 absolute -right-24 bottom-0 size-[28rem] rounded-full blur-3xl motion-safe:animate-pulse [animation-duration:8s]" />

        {/* grade de pontos, com cara de tecnologia */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(127, 208, 212, 0.18) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      <div className="absolute inset-0 transition-transform duration-500 ease-out" style={parallax(-18)}>
        <EcgLine />
      </div>

      <div className="absolute inset-0 transition-transform duration-500 ease-out" style={parallax(-36)}>
        {particles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="bg-brand-accent absolute rounded-full opacity-20 motion-safe:animate-twinkle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
              boxShadow: '0 0 12px 3px rgba(127, 208, 212, 0.7)',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 transition-transform duration-500 ease-out" style={parallax(-64)}>
        <FloatingIcon icon={HeartPulse} delay={0} className="top-[16%] right-[8%] sm:right-[14%]" />
        <FloatingIcon icon={Cpu} delay={-2} className="top-[10%] right-[36%] hidden md:block" />
        <FloatingIcon icon={Dna} delay={-4} className="top-[42%] right-[28%] hidden md:block" />
        <FloatingIcon icon={Stethoscope} delay={-6} className="top-[46%] right-[8%]" />
        <FloatingIcon icon={ShieldCheck} delay={-3} className="top-[64%] right-[22%] hidden md:block" />
      </div>
    </div>
  )
}

// Decoração leve para as seções do corpo do site (usa as cores do tema claro/escuro).
export function SectionDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <HeartPulse className="text-primary/15 absolute top-10 right-[6%] size-16 motion-safe:animate-float" />
      <Dna
        className="text-brand-accent/20 absolute bottom-12 left-[4%] size-12 motion-safe:animate-float"
        style={{ animationDelay: '-4s' }}
      />
      <Plus
        className="text-primary/15 absolute top-[46%] left-[48%] size-8 motion-safe:animate-float"
        style={{ animationDelay: '-2s' }}
      />

      {sectionParticles.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="bg-primary absolute rounded-full opacity-20 motion-safe:animate-twinkle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 10px 2px color-mix(in oklab, var(--primary) 60%, transparent)',
          }}
        />
      ))}
    </div>
  )
}
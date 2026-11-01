import type { CSSProperties, PointerEvent } from 'react'
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { pillars, siteInfo, solutions, whatsappLink } from '@/lib/site-content'
import { HeroScene, SectionDecor } from './components/hero-scene'
import { Reveal } from './components/reveal'
import { TiltCard } from './components/tilt-card'

function riseDelay(milliseconds: number): CSSProperties {
  return { animationDelay: `${milliseconds}ms` }
}

// Atualiza a posição do mouse como variáveis CSS (sem re-render): brilho e parallax do hero.
function handlePointerMove(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const style = event.currentTarget.style

  style.setProperty('--x', `${x}px`)
  style.setProperty('--y', `${y}px`)
  style.setProperty('--px', String((x / rect.width - 0.5) * 2))
  style.setProperty('--py', String((y / rect.height - 0.5) * 2))
}

function handlePointerLeave(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--px', '0')
  event.currentTarget.style.setProperty('--py', '0')
}

export function HomePage() {
  return (
    <>
      <section
        id="inicio"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="bg-brand-panel text-brand-panel-foreground group relative scroll-mt-16 overflow-hidden"
      >
        <HeroScene />

        {/* brilho que acompanha o mouse */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_320px_at_var(--x,50%)_var(--y,50%),rgba(127,208,212,0.18),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[1280px] flex-col justify-center px-5 py-20">
          <span
            style={riseDelay(100)}
            className="border-brand-accent/40 text-brand-accent flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm motion-safe:animate-rise"
          >
            <span className="relative flex size-2">
              <span className="bg-brand-accent absolute inline-flex size-full rounded-full opacity-75 motion-safe:animate-ping" />
              <span className="bg-brand-accent relative inline-flex size-2 rounded-full" />
            </span>
            {siteInfo.slogan}
          </span>

          <h1
            style={riseDelay(250)}
            className="mt-6 max-w-3xl text-[clamp(40px,7vw,76px)] leading-[1.02] font-semibold motion-safe:animate-rise"
          >
            Saúde e tecnologia,{' '}
            <span className="from-brand-accent via-champagne to-brand-accent bg-linear-to-r bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-shimmer">
              no mesmo ritmo.
            </span>
          </h1>

          <p
            style={riseDelay(400)}
            className="text-brand-panel-foreground/70 mt-6 max-w-xl text-lg motion-safe:animate-rise"
          >
            O Symbius conecta clínicas e pacientes em um só lugar, com gestão simples, informação
              segura e cuidado que acompanha cada etapa.
          </p>

          <div style={riseDelay(550)} className="mt-10 flex flex-wrap gap-3 motion-safe:animate-rise">
            <Button asChild size="lg" className="rounded-full">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <MessageCircle />
                Falar no WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-brand-panel-foreground rounded-full border-white/20 bg-transparent hover:bg-white/10 hover:text-white"
            >
              <a href="#solucoes">
                Conhecer soluções
                <ArrowRight />
              </a>
            </Button>
          </div>
        </div>

        <a
          href="#sobre"
          aria-label="Rolar para baixo"
          className="text-brand-panel-foreground/60 hover:text-brand-accent absolute bottom-6 left-1/2 -translate-x-1/2 transition-colors"
        >
          <ChevronDown className="size-7 motion-safe:animate-bounce" />
        </a>
      </section>

      <section id="sobre" className="relative scroll-mt-16 overflow-hidden">
        <SectionDecor />

        <div className="relative mx-auto w-full max-w-[1280px] px-5 py-24">
          <Reveal>
            <h2 className="max-w-2xl text-4xl font-semibold">Onde a saúde encontra a tecnologia</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                Acreditamos que o cuidado evolui quando pessoas e tecnologia trabalham juntas.
              </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 150} className="h-full">
                <TiltCard className="h-full">
                  <div className="bg-secondary group hover:shadow-primary/10 h-full rounded-2xl p-6 transition-shadow duration-300 hover:shadow-xl">
                    <pillar.icon className="text-primary size-8 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <h3 className="mt-4 text-xl font-semibold">{pillar.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">{pillar.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="solucoes" className="bg-muted relative scroll-mt-16 overflow-hidden">
        <SectionDecor/>

        <div className="relative mx-auto w-full max-w-[1280px] px-5 py-24">
          <Reveal>
            <h2 className="text-4xl font-semibold">Soluções</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
              Tudo o que a clínica e o paciente precisam, conectado.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, index) => (
              <Reveal key={solution.title} delay={index * 120} className="h-full">
                <TiltCard className="h-full">
                  <div className="bg-card group hover:border-primary/40 hover:shadow-primary/10 h-full rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-xl">
                    <div className="bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground flex size-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <solution.icon className="size-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{solution.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">{solution.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto w-full max-w-[1280px] scroll-mt-16 px-5 py-24">
        <Reveal>
          <div className="bg-brand-panel text-brand-panel-foreground relative overflow-hidden rounded-[2rem] px-8 py-16 text-center">
            <div className="bg-brand-accent/20 absolute -top-20 -left-20 size-72 rounded-full blur-3xl motion-safe:animate-pulse [animation-duration:6s]" />
            <div className="bg-primary/30 absolute -right-20 -bottom-20 size-72 rounded-full blur-3xl motion-safe:animate-pulse [animation-duration:8s]" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold">
                Vamos conversar sobre o futuro da sua clínica?
              </h2>
              <p className="text-brand-panel-foreground/70 mx-auto mt-4 max-w-xl">
                Chame a gente no WhatsApp e conheça a Symbius.
              </p>

              <div className="relative mt-8 inline-flex">
                <span className="bg-primary/40 absolute inset-0 rounded-full motion-safe:animate-ping" />
                <Button asChild size="lg" className="relative rounded-full">
                  <a href={whatsappLink} target="_blank" rel="noreferrer">
                    <MessageCircle />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
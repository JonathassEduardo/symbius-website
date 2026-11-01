import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { ArrowUp, Menu, MessageCircle, X } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { routes } from '@/lib/routes'
import { SymbiusLogo } from './symbius-logo'
import { navItems, siteInfo, whatsappLink } from '@/lib/site-content'

export function SiteLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const maxScroll = scrollHeight - clientHeight
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0

      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
      setIsScrolled(scrollTop > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    rootRef.current?.style.setProperty('--mx', `${event.clientX}px`)
    rootRef.current?.style.setProperty('--my', `${event.clientY}px`)
  }

  const headerState = isScrolled
    ? 'bg-background/90 shadow-primary/5 shadow-lg'
    : 'bg-background/70'

  return (
    <div ref={rootRef} onPointerMove={handlePointerMove} className="flex min-h-screen flex-col">
      {/* barra de progresso da rolagem */}
      <div
        ref={progressRef}
        style={{ transform: 'scaleX(0)' }}
        className="from-primary via-brand-accent to-champagne fixed top-0 right-0 left-0 z-[60] h-0.5 origin-left bg-linear-to-r"
      />

      {/* brilho suave que acompanha o mouse no site todo */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 hidden md:block"
        style={{
          background:
            'radial-gradient(circle 360px at var(--mx, 50%) var(--my, -30%), color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)',
        }}
      />

      <header
        className={`sticky top-0 z-50 border-b backdrop-blur transition-all duration-300 motion-safe:animate-drop ${headerState}`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1280px] items-center gap-6 px-5 transition-[height] duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}
        >
          <Link to={routes.home} className="group flex items-center gap-2">
            <span className="transition-transform duration-700 group-hover:rotate-[360deg]">
              <SymbiusLogo size={32} />
            </span>
            <span className="font-serif text-xl font-semibold">{siteInfo.name}</span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground after:bg-primary relative rounded-lg px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.title}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <Button asChild className="hidden rounded-full sm:inline-flex">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <MessageCircle />
                Fale conosco
              </a>
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="animate-in fade-in slide-in-from-top-2 grid gap-1 border-t px-5 py-3 duration-300 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-accent rounded-lg px-3 py-2 text-sm font-medium"
              >
                {item.title}
              </a>
            ))}
            <Button asChild className="mt-2 rounded-full">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <MessageCircle />
                Fale conosco
              </a>
            </Button>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
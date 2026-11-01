import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  contactItems,
  navItems,
  siteInfo,
  socialLinks,
  whatsappLink,
} from '@/lib/site-content'
import { Reveal } from './reveal'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-panel text-brand-panel-foreground relative overflow-hidden">
      <div className="bg-brand-accent/10 absolute -bottom-32 -left-24 size-80 rounded-full blur-3xl motion-safe:animate-pulse [animation-duration:8s]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pt-16 pb-8">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
            {/* marca */}
            <div>
              <h3 className="text-2xl font-semibold">{siteInfo.name}</h3>
              <p className="text-brand-accent mt-1 text-sm">{siteInfo.slogan}</p>
              <p className="text-brand-panel-foreground/70 mt-4 max-w-sm text-sm">
                Conectamos clínicas e pacientes com gestão simples, informação segura e cuidado em
                cada etapa.
              </p>
            </div>

            {/* navegação */}
            <nav aria-label="Rodapé">
              <h4 className="text-sm font-semibold tracking-wide uppercase">Navegação</h4>
              <ul className="mt-4 space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-brand-panel-foreground/70 hover:text-brand-accent text-sm transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* contato e redes */}
            <div>
              <h4 className="text-sm font-semibold tracking-wide uppercase">Contato</h4>
              <ul className="mt-4 space-y-3">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-sm">
                    <item.icon className="text-brand-accent size-4 shrink-0" />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-brand-panel-foreground/70 hover:text-brand-accent transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-brand-panel-foreground/70">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="hover:bg-brand-accent hover:text-brand-panel flex size-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <social.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="text-brand-panel-foreground/50 mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:justify-between">
          <span>
            © {currentYear} {siteInfo.name}. Todos os direitos reservados.
          </span>
          <span>{siteInfo.slogan}</span>
        </div>
      </div>
    </footer>
  )
}
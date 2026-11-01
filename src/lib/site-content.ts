import { InstagramIcon, LinkedinIcon } from '@/pages/private/home-page/components/social-icons'
import {
  CalendarDays,
  Cpu,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Mail,
  MapPin,
  Network,
  Phone,
  UserRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ComponentType } from 'react'

export type NavItem = {
  title: string
  href: string
}

export type ContentCard = {
  title: string
  description: string
  icon: LucideIcon
}

export type ContactItem = {
  label: string
  icon: LucideIcon
  href?: string
}

export type SocialLink = {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export const siteInfo = {
  name: 'Symbius',
  slogan: 'Conectar para evoluir',
}

export const navItems: NavItem[] = [
  { title: 'Início', href: '#inicio' },
  { title: 'Sobre', href: '#sobre' },
  { title: 'Soluções', href: '#solucoes' },
  { title: 'Contato', href: '#contato' },
]

export const pillars: ContentCard[] = [
  { title: 'Saúde', description: 'O paciente no centro de cada decisão e de cada fluxo.', icon: HeartPulse },
  { title: 'Tecnologia', description: 'Ferramentas modernas que simplificam a rotina da clínica.', icon: Cpu },
  { title: 'Conexão', description: 'Clínica e paciente no mesmo lugar, com informação sempre à mão.', icon: Network },
]

export const solutions: ContentCard[] = [
  { title: 'Ambiente da clínica', description: 'Gestão completa da operação em um só painel.', icon: LayoutDashboard },
  { title: 'Área do paciente', description: 'Acesso fácil a agendamentos, exames e dados.', icon: UserRound },
  { title: 'Agenda e atendimentos', description: 'Organização de horários sem complicação.', icon: CalendarDays },
  { title: 'Exames e resultados', description: 'Resultados disponíveis com segurança e rapidez.', icon: FileText },
]

export const contactItems: ContactItem[] = [
  { label: 'contato@symbius.com.br', icon: Mail, href: 'mailto:contato@symbius.com.br' },
  { label: '(81) 00000-0000', icon: Phone, href: 'tel:+5581000000000' },
  { label: 'Recife, PE', icon: MapPin },
]

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/symbius', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/symbius', icon: LinkedinIcon },
]

const whatsappNumber = '55DDDNUMERO'
const whatsappMessage = 'Olá! Gostaria de saber mais sobre a Symbius.'

export const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
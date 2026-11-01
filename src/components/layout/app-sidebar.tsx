import { ChevronLeft } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { navGroups } from '@/config/nav'
import { NavUser } from '@/components/layout/nav-user'
import { ROUTES } from '@/lib/routes'
import { SymbiusLogo } from '@/pages/public/login/symbius-logo'

// Casca do sidebar: arredondada só à direita, borda petróleo de 2px e sombra suave.
// O "!" é para vencer as classes do variant="floating" do shadcn.
const shell = [
  '[&_[data-slot=sidebar-inner]]:rounded-l-none!',
  '[&_[data-slot=sidebar-inner]]:rounded-r-[3.5rem]!',
  '[&_[data-slot=sidebar-inner]]:border-2',
  '[&_[data-slot=sidebar-inner]]:border-l-0',
  '[&_[data-slot=sidebar-inner]]:border-sidebar-border',
  '[&_[data-slot=sidebar-inner]]:ring-0!',
  '[&_[data-slot=sidebar-inner]]:shadow-[6px_0_30px_rgba(0,24,64,0.08)]!',
].join(' ')

// Recolhido: centraliza os ícones (a largura é maior que a padrão do shadcn).
const centerWhenCollapsed = 'group-data-[collapsible=icon]:items-center'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, state } = useSidebar()
  const label = state === 'collapsed' ? 'Expandir menu' : 'Recolher menu'

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className={`px-0 py-3.5 ${shell}`}
      {...props}
    >
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={label}
        title={label}
        className="bg-sidebar text-primary hover:bg-sidebar-accent absolute top-11 -right-[15px] z-20 hidden size-7 items-center justify-center rounded-full border shadow-sm transition-colors md:flex"
      >
        <ChevronLeft className="size-4 transition-transform duration-300 group-data-[state=collapsed]:rotate-180" />
      </button>

      <SidebarHeader className="px-4 pt-4 pb-2">
        <SidebarMenu className={centerWhenCollapsed}>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="rounded-xl">
              <NavLink to={ROUTES.home}>
                <div className="flex aspect-square size-8 items-center justify-center">
                  <SymbiusLogo size={34} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-serif text-[21px] font-semibold">Symbius</span>
                  <span className="text-muted-foreground truncate text-xs">Área do paciente</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.title} className="px-4 py-1">
            <SidebarGroupLabel className="h-7 px-3 text-[11px] font-semibold tracking-[0.08em] uppercase">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className={centerWhenCollapsed}>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild tooltip={item.title} className="h-9 rounded-xl">
                      <NavLink
                        to={item.url}
                        className="aria-[current=page]:bg-sidebar-accent aria-[current=page]:text-sidebar-accent-foreground aria-[current=page]:font-medium"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-4 pb-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
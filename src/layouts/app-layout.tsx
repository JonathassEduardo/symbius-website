import type { CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/layout/theme-toggle'

export function AppLayout() {

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '13.625rem',
          '--sidebar-width-icon': '3.625rem',
        } as CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 md:hidden" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 md:hidden"
          />
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
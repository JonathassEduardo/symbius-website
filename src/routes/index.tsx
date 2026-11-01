import { Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '@/pages/not-found-page'
import { routes } from '@/lib/routes'
import { SiteLayout } from '@/components/layout/site-layout'
import { HomePage } from '@/pages/private/home-page/home-page'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path={routes.home} element={<HomePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
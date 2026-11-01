import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { routes } from '@/lib/routes'
import { FullPageLoader } from '@/components/layout/full-page-loader'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <FullPageLoader />

  if (!isAuthenticated) {
    return <Navigate to={routes.home} state={{ from: location }} replace />
  }

  return <Outlet />
}

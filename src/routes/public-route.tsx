import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { routes } from '@/lib/routes'
import { FullPageLoader } from '@/components/layout/full-page-loader'

/** Prevents an already authenticated user from going back to the login screen. */
export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <FullPageLoader />

  if (isAuthenticated) return <Navigate to={routes.home} replace />

  return <Outlet />
}

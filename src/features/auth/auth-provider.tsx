import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './auth-context'
import { signInRequest } from './auth-service'
import type { Credentials, User } from './types'

const STORAGE_KEY = 'xpay-usa-admin:user'

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // The session is read from localStorage synchronously, so it starts resolved.
  // When switching to API token validation, move this into an effect and
  // initialize `isLoading` as `true`.
  const [user, setUser] = useState<User | null>(readStoredUser)
  const isLoading = false

  const signIn = useCallback(async (credentials: Credentials) => {
    const authenticated = await signInRequest(credentials)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticated))
    setUser(authenticated)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      signIn,
      signOut,
    }),
    [user, isLoading, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

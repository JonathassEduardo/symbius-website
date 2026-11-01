export type User = {
  id: string
  name: string
  email: string
}

export type Credentials = {
  email: string
  password: string
}

export type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  /** `true` while the persisted session is still being restored. */
  isLoading: boolean
  signIn: (credentials: Credentials) => Promise<void>
  signOut: () => void
}

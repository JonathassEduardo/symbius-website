import type { Credentials, User } from './types'

/**
 * Isolated authentication layer. It currently resolves locally; to plug in the
 * real API, just swap the body of this function for an HTTP call.
 */
export async function signInRequest({ email, password }: Credentials): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (!email || !password) {
    throw new Error('Enter your email and password.')
  }

  return {
    id: '1',
    name: email.split('@')[0],
    email,
  }
}

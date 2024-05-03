import { auth } from '@heimdall-logs/auth'

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

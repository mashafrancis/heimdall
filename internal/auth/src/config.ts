import type {
  DefaultSession,
  NextAuthConfig,
  Session as NextAuthSession,
} from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { env } from '../env'
import { prismaAdapter } from './adapter'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const isSecureContext = env.NODE_ENV !== 'development'

export const authConfig = {
  adapter: prismaAdapter,
  // In development, we need to skip checks to allow Expo to work
  ...(!isSecureContext
    ? {
        // skipCSRFCheck: skipCSRFCheck,
        trustHost: true,
      }
    : {}),
  trustHost: true,
  providers: [GitHub({ allowDangerousEmailAccountLinking: true })],
  callbacks: {
    session: (opts) => {
      if (!('user' in opts))
        throw new Error('unreachable with session strategy')

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      }
    },
  },
} satisfies NextAuthConfig

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const sessionToken = token.slice('Bearer '.length)
  const session = await prismaAdapter.getSessionAndUser?.(sessionToken)
  return session
    ? {
        user: {
          ...session.user,
        },
        expires: session.session.expires.toISOString(),
      }
    : null
}

export const invalidateSessionToken = async (token: string) => {
  await prismaAdapter.deleteSession?.(token)
}

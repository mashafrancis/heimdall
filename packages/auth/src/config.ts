import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db, schema } from '@heimdall-logs/db'
import type { DefaultSession, NextAuthConfig } from 'next-auth'
import Discord from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [Discord],
  callbacks: {
    session: (opts) => {
      if (!('user' in opts)) throw 'unreachable with session strategy'

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      }
    },
  },
  pages: {
    signIn: '/dashboard',
  },
} satisfies NextAuthConfig

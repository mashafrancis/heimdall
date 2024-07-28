import { env } from '@/env'
import jwt from 'jsonwebtoken'
import { User } from 'next-auth'

export const generateToken = (payload: User & { website: string }) => {
  return jwt.sign(payload, env.AUTH_SECRET)
}

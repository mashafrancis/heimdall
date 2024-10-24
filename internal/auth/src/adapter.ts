import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@heimdall-logs/db'

export const prismaAdapter = {
  ...PrismaAdapter(db),
}

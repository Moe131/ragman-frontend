import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'


declare module 'next-auth/jwt' {
  interface JWT {
    uid: number
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      uid: number
    }
  }
}
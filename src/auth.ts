import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from './db/drizzle';
import authConfig from './auth.config';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string | undefined;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string | undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out'
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  ...authConfig
});

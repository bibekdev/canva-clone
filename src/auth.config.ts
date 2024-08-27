import { type NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export default {
  providers: [Github, Google]
} satisfies NextAuthConfig;

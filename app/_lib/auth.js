import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
// import Credentials from 'next-auth/providers/credentials';

import { createGuest, getGuest } from '@/app/_lib/data-service';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // Credentials({
    //   credentials: {
    //     username: { label: 'Username' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(request) {
    //     const response = await fetch(request);
    //     if (!response.ok) return null;
    //     return (await response.json()) ?? null;
    //   },
    // }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);

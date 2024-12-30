import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
// import Credentials from 'next-auth/providers/credentials';

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
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);

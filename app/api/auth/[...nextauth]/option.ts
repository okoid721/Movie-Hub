import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '@/lib/mongoDB';
import { compare } from 'bcryptjs';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await connectToDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user?.password) {
          throw new Error('User not found or Password is incorrect');
        }

        /* Compare password */
        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error('Invalid password');
        }

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
};

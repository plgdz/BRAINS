import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import pool from '@/app/lib/db/db';
import bcrypt from "bcryptjs";

async function getUser(email: string) {
    const user = await pool.users.findUnique({
        include: {
            passwords: true,
        },
        where: {
            courriel: email,
        }
    });
    return user;
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            // @ts-ignore
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(8)})
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const match = await bcrypt.compare(password, user.passwords[0].password);
                    if(match) {
                        return user;
                    };
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // @ts-ignore
                token.userId = user.user_id; // Assure-toi que 'user.id' est la bonne propriété pour l'ID de l'utilisateur.
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // @ts-ignore
                session.user.id = token.userId;
            }
            return session;
        }
    }
});
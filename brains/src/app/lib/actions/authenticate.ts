//authenticate.ts
// Ce fichier contient la fonction qui permet de connecter un utilisateur.
// Auteur : Paul Agudze, Thomas Garneau

'use server';
import { signIn } from '@/auth';
import {AuthError} from "next-auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const res = await signIn(
            'credentials',
            {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: true,
                redirectTo: '/dashboard',
            });
    } catch (error) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin" :
                    return "Invalid credentials";
                default:
                    return "An error occurred";
            }
        }
        throw error;
    }
}
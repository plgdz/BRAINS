// register.ts
// Ce fichier contient la fonction qui permet de créer un nouvel utilisateur.
// Auteur : Paul Agudze, Thomas Garneau

'use server';
import {register} from "@/app/lib/db/createUser";
import {signIn} from "@/auth";


export async function registerUser(
    formData: {
        email?: string,
        username?: string,
        password?: string,
        passwordConfirmation?: string,
    },
) {
    try {
        const res = await register(
            // @ts-ignore
            formData.email,
            formData.username,
            formData.password,
            formData.passwordConfirmation,
        );
        if(res.status === "success"){
            await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: true,
                redirectTo: '/dashboard',
            });
        } else {
            return res.message;
        }

    } catch (error) {
        throw error;
    }
}
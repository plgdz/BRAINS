//user.ts
// Ce fichier contient les fonctions qui permettent de gérer les utilisateurs.
// Auteur : Paul Agudze, Thomas Garneau

'use server';
import {auth} from "@/auth";
import {getUser, getPasswords, updateUser, updatePassword} from "@/app/lib/db/user";

export async function userMiddleware(
    method: string,
    formData: { id?: string, pseudo?: string, courriel?: string, newPassword?: string, currentPassword?: string},
) {
    const session = await auth();
     if (!session) {
        throw new Error('Unauthorized');
     }
    switch (method) {
        case 'getUser':
            // @ts-ignore
            return getUser       (session.user.id, formData);
        case 'update':
            // @ts-ignore
            return updateUser    (session.user.id, formData);
        case 'getPasswords':
            // @ts-ignore
            return getPasswords (session.user.id, formData);
        case 'updatePassword':
            // @ts-ignore
            return updatePassword(session.user.id, formData);
        default:
            throw new Error('Invalid method');
    }
}

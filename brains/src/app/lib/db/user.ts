// user.ts
// Ce fichier contient les fonctions qui permettent de récupérer et de mettre à jour les informations de l'utilisateur.
// Auteur : Paul Agudze, Thomas Garneau

import pool from '@/app/lib/db/db';
import bcrypt from "bcryptjs";

export async function getUser(
    userId: string,
) {
    try {
        const result = await pool.users.findUnique({
            where: {
                user_id: Number(userId),
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser(
    userId: string,
    formData: { pseudo: string, courriel: string }
) {
    try {
        const result = await pool.users.update({
            where: {
                user_id: Number(userId),
            },
            data: {
                pseudo: formData.pseudo,
                courriel: formData.courriel,
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getPasswords(
    userId: string,
    formData: { id: string }
) {
    try {
        const result = await pool.passwords.findMany({
            where: {
                user_id: Number(userId),
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function updatePassword(
    userId: string,
    formData: {
        currentPassword: string,
        newPassword: string
    }
) {
    try {
        const currentPassword = await pool.passwords.findFirst({
            where: {
                user_id: Number(userId),
            }
        });

        if (!currentPassword) {
            return false;
        }

        const match = await bcrypt.compare(formData.currentPassword, currentPassword.password);

        if (!match) {
            return false;
        }

        const hashedPassword = await bcrypt.hash(formData.newPassword, 10);

        const result = await pool.passwords.update({
            where: {
                id: currentPassword.id,
                user_id: Number(userId),
            },
            data: {
                password: hashedPassword,
            }
        });

        return true;


    } catch (error) {
        console.log(error);
    }
}
// db/notes.ts
// Ce fichier contient les fonctions qui permettent de créer, modifier, supprimer et récupérer des notes dans la base de donnees.
// Auteur : Paul Agudze, Thomas Garneau

import pool from '@/app/lib/db/db';

export async function createNote(
    userId: string,
    formData: { noteTitle: string, noteDescription: string },
){
    try {
        const result = await pool.tasks.create({
            data: {
                user_id: Number(userId),
                title: formData.noteTitle,
                description: formData.noteDescription,
                date: new Date(),
                users: []
            }
        });
    } catch (error) {
        console.log(error)
    }
}

export async function updateNote(
    userId: string,
    formData: { id: string, title: string, description: string },
){
    try {
        const result = await pool.tasks.update({
            where: {
                task_id: Number(formData.id),
            },
            data: {
                title: formData.title,
                description: formData.description
            }
        });
    } catch (error) {
        console.log(error)
    }
}

export async function deleteNote(
    userId: string,
    formData: { id: string },
) {
    try {
        const result = await pool.tasks.delete({
            where: {
                task_id: Number(formData.id),
            }
        });
    } catch (error) {
        console.log(error)
    }
}

export async function getNote(
    userId: string,
    formData: { id: string },
) {
    try {
        const result = await pool.tasks.findUnique({
            where: {
                user_id: Number(userId),
                task_id: Number(formData.id),
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getNotes(
    userId: string,
    formData: FormData,
) {
    try {
        const result = await pool.tasks.findMany({
            where: {
                user_id: Number(userId),
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}
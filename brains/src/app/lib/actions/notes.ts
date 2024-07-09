// notes.ts
// Ce fichier contient les fonctions qui permettent de créer, modifier, supprimer et récupérer des notes.
// Auteur : Paul Agudze, Thomas Garneau

'use server';
import {auth} from "@/auth";
import {createNote, deleteNote, updateNote, getNote, getNotes} from "@/app/lib/db/notes";

export async function notesMiddleware (
    method: string,
    formData: {
        id?: string,
        title?: string,
        content?: string,
        tags?: string[],
        createdAt?: string,
        updatedAt?: string,
        noteTitle?: string,
        noteContent?: string,
        noteTags?: string[],
        noteCreatedAt?: string,
        noteUpdatedAt?: string,
        noteDescription?: string,
        note?: any,
        description?: string,
    },
) {
    const session = await auth();
     if (!session) {
         throw new Error('Unauthorized');
     }
    switch (method) {
        case 'create':
            // @ts-ignore
            return createNote    (session.user.id, formData);
        case 'update':
            // @ts-ignore
            return updateNote    (session.user.id, formData);
        case 'delete':
            // @ts-ignore
            return deleteNote    (session.user.id, formData);
        case 'getNote':
            // @ts-ignore
            return getNote       (session.user.id, formData);
        case 'getNotes':
            // @ts-ignore
            return getNotes      (session.user.id, formData);
        default:
            throw new Error('Invalid method');
    }
}

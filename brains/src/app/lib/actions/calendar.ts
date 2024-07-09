// calendar.ts
// Ce fichier contient les fonctions qui permettent de gérer les événements du calendrier.
// Auteur : Paul Agudze, Thomas Garneau

'use server';
import { auth } from "@/auth";
import { createEvent, getEvents, updateEvent, deleteEvent, getSingleEvent } from "../db/calendar";

export async function calendarMiddleWare(
    method: string,
    formData: {
        title?: string,
        date?: Date,
        eventId?: string,
        type?: string
        reference_id?: string
    }
) {
    const session = await auth();
    if (!session) {
        throw new Error('Unauthorized');
    }
    switch (method) {
        case 'createEvent':
            // @ts-ignore
            return createEvent(session.user.id, formData);
        case 'getEvents':
            // @ts-ignore
            return await getEvents(session.user.id, formData);
        case 'getSingleEvent':
            // @ts-ignore
            return getSingleEvent(session.user.id, formData);
        case 'updateEvent':
            // @ts-ignore
            return updateEvent(session.user.id, formData);
        case 'deleteEvent':
            // @ts-ignore
            return deleteEvent(session.user.id, formData);
        default:
            throw new Error('Invalid method');
    }
}


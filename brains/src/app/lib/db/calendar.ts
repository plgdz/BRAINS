// db/calendar.ts
// Ce fichier contient les fonctions qui permettent de créer, modifier, supprimer et récupérer des événements dans la base de données.
// Auteur : Paul Agudze, Thomas Garneau

import pool from '@/app/lib/db/db';
import { type_id } from '@prisma/client';
import { title } from 'process';

export async function getEvents(
    userId: string,
    formData: { type: string }
) {
    try {
        const result = await pool.events.findMany({
            where: {
                user_id: Number(userId),
                type: formData.type as type_id,
            }
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getSingleEvent(
    userId: string,
    formData: {
        type: string,
        reference_id: string
    }
) {
    try {
        const result = await pool.events.findMany({
            where: {
                user_id: Number(userId),
                type: formData.type as type_id,
                // @ts-ignore
                reference_id: formData.reference_id,
            }
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createEvent(
    userId: string,
    formData: {
        title: string,
        date: Date,
        type: string,
        reference_id: string
    }
) {
    try {
        const result = await pool.events.create({
            data: {
                type: formData.type as type_id,
                title: formData.title,
                date: formData.date,
                user_id: Number(userId),
                // @ts-ignore
                reference_id: formData.reference_id
            }
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateEvent(
    userId: string,
    formData: { eventId: string, title: string, date: Date},
) {
    try {
        const result = await pool.events.update({
            where: {
                event_id: Number(formData.eventId),
            },
            data: {
                // @ts-ignore
                title: formData.title,
                date: formData.date,
            }
        });       
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteEvent(
    userId: string,
    formData: { eventId: string},
) {
    try {
        const result = await pool.events.delete({
            where: {
                event_id: Number(formData.eventId),
            }
        });       
    } catch (error) {
        console.error(error);
        throw error;
    }
}
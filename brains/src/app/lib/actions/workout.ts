// workouts.ts
// Ce fichier contient les fonctions qui permettent de gérer les entraînements.
// Auteur : Paul Agudze, Thomas Garneau

'use server';

import { auth } from "@/auth";
import {cookies} from 'next/headers';
import {createWorkout, getWorkouts, getWorkoutExercise, deleteWorkout, setCompleteWorkout, getCompletedWorkouts, scheduleWorkout} from "@/app/lib/db/workout";

export async function WorkoutMiddleware (
    method: string,
    formData: {
        title?: string;
        exercises?: Exercise[];
        notes?: string;
        duration?: number;
        workout_id?: number;
    },
) {
    const session = await auth();
    if (!session) {
        throw new Error('Unauthorized');
    }

    switch (method) {
        case 'createWorkout':
            // @ts-ignore
            return createWorkout(session.user.id, formData);
        case 'getWorkouts':
            // @ts-ignore
            return getWorkouts(session.user.id);
        case 'getWorkoutExercises':
            // @ts-ignore
            return getWorkoutExercise(session.user.id, formData);
        case 'deleteWorkout':
            // @ts-ignore
            return deleteWorkout(session.user.id, formData);
        case 'completeWorkout':
            cookies().delete('workout');
            // @ts-ignore
            return setCompleteWorkout(session.user.id, formData);
        case 'getCompletedWorkouts':
            // @ts-ignore
            return getCompletedWorkouts(session.user.id);
        case 'scheduleWorkout':
            // @ts-ignore
            return scheduleWorkout(session.user.id, formData);
        default:
            throw new Error('Invalid method');
    }
}

export async function StoreWorkout(workout: Workout) {
    cookies().set(
        'workout',
        JSON.stringify(workout),
        {
            maxAge: 60 * 60 * 24,
        }
    )
}

export async function GetStoredWorkout() {
    return await cookies().get('workout');
}

export async function ClearStoredWorkout() {
    cookies().delete('workout');
}
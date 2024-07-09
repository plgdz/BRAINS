// SessionWorkoutWrapper.tsx
// Ce composant affiche un entraînement en cours.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect } from 'react';
import { GetStoredWorkout } from "@/app/lib/actions/workout";
import { TrainingWrapper } from "@/app/ui/dashboard/workouts/SessionWorkout/TrainingWrapper";

export function SessionWorkoutWrapper() {
    const [loaded, setLoaded] = useState(false);
    const [started, setStarted] = useState(false);
    const [workout, setWorkout] = useState(0)
    const [session, setSession] = useState([{}])
    const exercises: Exercise[] = [];

    useEffect(() => {
        const getWorkout = async () => {
            const storedWorkout = await GetStoredWorkout()
            let value = ''
            if (storedWorkout) {
                value = storedWorkout.value;
            }
            const converted: Workout = JSON.parse(value);
            setWorkout(converted.workout_id);
            setSession(converted.exercises);
            setLoaded(true);
        }
        getWorkout();
    }, []);


    return (
        <div className={'w-full h-full grid grid-rows-12 grid-cols-12'}>
            {started && loaded ?
                // @ts-ignore
                <TrainingWrapper session={session} workout_id={workout} /> :
                <div
                    className={'bg-black h-64 w-64 rounded-full flex justify-center align-middle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer'}
                    onClick={() => setStarted(true)}
                >
                    <h1 className={'self-center text-3xl text-white'}>
                        START
                    </h1>
                </div>
            }
        </div>
    )
}
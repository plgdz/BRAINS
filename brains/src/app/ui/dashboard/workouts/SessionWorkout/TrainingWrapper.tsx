// TrainingWrapper.tsx
// Ce composant affiche les exercices d'un entraînement.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect } from 'react';

import { ComingUp } from "@/app/ui/dashboard/workouts/SessionWorkout/ComingUp";
import { SetSessionWrapper } from "@/app/ui/dashboard/workouts/SessionWorkout/SetSession";
import { ModalEndWorkout } from "@/app/ui/dashboard/workouts/SessionWorkout/ModalEndWorkout";

interface WorkoutWrapperProps {
    session: Exercise[],
    workout_id: number;
}

export function TrainingWrapper(props: WorkoutWrapperProps): React.ReactElement {
    const [index, setIndex] = useState(0)
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [endOpen, setEndOpen] = useState(false);

    useEffect(() => {
        setStart(performance.now());
    }, []);

    const changeIndex = (idx: number) => {
        setIndex(idx);
    }

    const toggleEnd = () => {
        const end = performance.now();
        setEnd(end);
        setEndOpen(!endOpen);
    }

    return (
        <div className={'grid grid-cols-1 md:grid-cols-8 grid-rows-12 md:grid-rows-12 col-span-full'}>
            <SetSessionWrapper exercises={props.session} changeIndex={changeIndex} toggleEnd={toggleEnd} />
            <ComingUp exercises={props.session} idx={index} />
            <ModalEndWorkout open={endOpen} toggleEnd={toggleEnd} t_start={start} t_end={end} workout_id={props.workout_id} />
        </div>
    );
}
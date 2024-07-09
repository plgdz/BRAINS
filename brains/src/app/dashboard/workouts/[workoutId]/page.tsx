"use client";

import React from 'react';
import {SessionWorkoutWrapper} from '@/app/ui/dashboard/workouts/SessionWorkout/SessionWorkoutWrapper';

const workouts = [
    {
        id: 1,
        title: 'Push',
        exercises: [
        { name: 'Bench Press', sets: '3x10', weight: '185lbs', rest: '90' },
        { name: 'Shoulder Press', sets: '3x8', weight: '135lbs', rest: '90' },
        ],
    },
];

export default function WorkoutSessionPage({ params }: { params: any }): React.ReactNode {
    return (
        <>
            <SessionWorkoutWrapper />
        </>
    )
}
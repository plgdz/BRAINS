// InformationsWrapper.tsx
// Ce composant est le composant parent des composants InformationsTotalDuration et InformationsDurationByDay. Il affiche les informations générales sur les entraînements.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect } from 'react';
import { WorkoutMiddleware } from "@/app/lib/actions/workout";
import { InformationsTotalDuration } from "@/app/ui/dashboard/workouts/informations/TotalDuration";
import { InformationsDurationByDay } from "@/app/ui/dashboard/workouts/informations/InformationsDurationByDay";

export function InformationsWrapper() {

    const [completedWorkouts, setCompletedWorkouts] = useState([]);
    const [totalDuration, setTotalDuration] = useState(0);
    const [durationsByDay, setDurationsByDay] = useState([
        { day: 'Monday', duration: 0 },
        { day: 'Tuesday', duration: 0 },
        { day: 'Wednesday', duration: 0 },
        { day: 'Thursday', duration: 0 },
        { day: 'Friday', duration: 0 },
        { day: 'Saturday', duration: 0 },
        { day: 'Sunday', duration: 0 },
    ]);

    function getDayOfWeek(date: Date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }


    useEffect(() => {
        const fetchCompletedWorkouts = async () => {
            // @ts-ignore
            const fetchedWorkouts = await WorkoutMiddleware('getCompletedWorkouts', {});
            // @ts-ignore
            setCompletedWorkouts(fetchedWorkouts);
        }

        fetchCompletedWorkouts();
    }, []);

    useEffect(() => {
        let totalDuration = 0;
        let durationsByDay = [
            { day: 'Monday', duration: 0 },
            { day: 'Tuesday', duration: 0 },
            { day: 'Wednesday', duration: 0 },
            { day: 'Thursday', duration: 0 },
            { day: 'Friday', duration: 0 },
            { day: 'Saturday', duration: 0 },
            { day: 'Sunday', duration: 0 },
        ];

        completedWorkouts.forEach((workout: any) => {
            totalDuration += workout.duration;
            const day = getDayOfWeek(new Date(workout.completed_at));
            durationsByDay = durationsByDay.map((dayObj: any) => {
                if (dayObj.day === day) {
                    return {
                        ...dayObj,
                        duration: dayObj.duration + workout.duration / 60,
                    }
                }
                return dayObj;
            });
        });

        setTotalDuration(totalDuration);
        setDurationsByDay(durationsByDay);
    }, [completedWorkouts]);



    return (
        <div
            className={'h-1/4'}
        >
            <h1>Informations</h1>
            <div className={'flex flex-row'}>
                <InformationsTotalDuration totalDuration={totalDuration} />
                <InformationsDurationByDay durationsByDay={durationsByDay} />
            </div>
        </div>
    );
}

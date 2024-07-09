// WorkoutDetails.tsx
// Ce composant affiche les détails d'un entraînement. Il permet de programmer un entraînement et de le supprimer.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WorkoutMiddleware, StoreWorkout } from "@/app/lib/actions/workout";
import { CalendarDate, parseDate } from "@internationalized/date";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    SelectItem,
    Checkbox,
    DateInput
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

export function WorkoutDetails(
    props: {
        isDetailOpen: boolean,
        toggleDetail: () => void,
        workout: Workout | null,
        handleDeleteWorkout: (workout: Workout) => void
    }
) {
    const router = useRouter();
    const [workoutData, setWorkoutData] = useState<Workout | null>(null);
    const [exercises, setExercises] = useState<Exercise[] | void>([]);
    const [isProgrammed, setIsProgrammed] = useState(false);
    const [value, setValue] = useState('Daily');
    const [date, setDate] = useState(new Date());
    const timeFrame = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Bi-weekly', label: 'Bi-Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Yearly', label: 'Yearly' },
    ];

    useEffect(() => {
        // Vérifiez si la prop workout a une valeur
        if (props.workout) {
            const workout = props.workout;
            const fetchExercises = async () => {
                const fetchedExercises = await WorkoutMiddleware('getWorkoutExercises', workout);
                // @ts-ignore
                setExercises(fetchedExercises);
                // @ts-ignore
                workout.exercises = fetchedExercises;
                setWorkoutData(workout);
            };
            fetchExercises();
        }
    }, [props.workout]);

    if (!props.workout) {
        return null;
    }

    const handleSchedule = async () => {
        const data = {
            // @ts-ignore
            workout_id: workoutData.workout_id,
            is_recurring: isProgrammed,
            recuring_period: value,
            date: date
        };
        await WorkoutMiddleware('scheduleWorkout', data);
    }

    return (
        <Modal
            isOpen={props.isDetailOpen}
            onClose={props.toggleDetail}
            classNames={{
                header: 'bg-white',
                body: 'bg-white',
                footer: 'bg-white',
            }}
        >
            {workoutData && (
                <ModalContent>
                    <ModalHeader className={'text-black text-2xl font-bold'}>{
                        // @ts-ignore
                        workoutData.title
                    }</ModalHeader>
                    <ModalBody>
                        <p>{
                            // @ts-ignore
                            workoutData.description
                        }</p>
                        {exercises ? (
                            exercises.map((exercise, index) => (
                                <Card key={index} fullWidth className={'mb-2'} isBlurred>
                                    <CardBody>
                                        <div className={'flex justify-between font-bold'}>
                                            <p>
                                                {
                                                    // @ts-ignore
                                                    exercise.title
                                                }
                                            </p>
                                            <p>
                                                {
                                                    // @ts-ignore
                                                    exercise.sets
                                                } x {
                                                    // @ts-ignore
                                                    exercise.reps
                                                } - {
                                                    // @ts-ignore
                                                    exercise.weight
                                                } {
                                                    // @ts-ignore
                                                    exercise.unit
                                                }
                                            </p>
                                        </div>
                                        {
                                            // @ts-ignore
                                            exercise.notes && <p>{exercise.notes}</p>
                                        }
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <Spinner label={'Chargement des exercices...'} />
                        )}

                    </ModalBody>
                    <div className='ml-6'>
                        {isProgrammed && (
                            <div className={'flex-col bg-white text-black mb-6'}>
                                <DateInput
                                    label={"Date: "}
                                    defaultValue={parseDate(new Date().toISOString().split('T')[0])}
                                    placeholderValue={new CalendarDate(1995, 11, 6)}
                                    onChange={(e) => {
                                        const dateObject = new Date(e.year, e.month - 1, e.day + 1);
                                        setDate(dateObject);
                                    }}
                                    labelPlacement='outside'
                                    className='mx-1 mb-5'
                                    classNames={{ inputWrapper: 'w-96' }}
                                />
                                <Select
                                    label="Cycle"
                                    variant="bordered"
                                    placeholder="Select a cycle"
                                    className="max-w-xs mr-9 mx-1"
                                    // @ts-ignore
                                    onSelectionChange={(e) => (setValue(e.currentKey))}
                                >
                                    {timeFrame.map((time) => (
                                        <SelectItem key={time.value} value={time.value}>
                                            {time.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Button
                                    isIconOnly
                                    onPress={handleSchedule}
                                    className='ml-5'
                                >
                                    <img width="30" height="35" src="https://img.icons8.com/ios-filled/50/save--v1.png"
                                        alt="save--v1" />
                                </Button>
                            </div>
                        )}
                    </div>
                    <ModalFooter>
                        <Button
                            onClick={() => {
                                props.handleDeleteWorkout(workoutData);
                                props.toggleDetail();
                            }}
                            color={'danger'}
                        >
                            Supprimer
                        </Button>
                        <Button
                            onClick={() => setIsProgrammed(!isProgrammed)}
                            color={isProgrammed ? 'warning' : 'default'}
                        >
                            {isProgrammed ? 'Annuler' : 'Programmer'}
                        </Button>
                        <Button
                            onClick={() => {
                                StoreWorkout(workoutData);
                                // @ts-ignore
                                router.push(`/dashboard/workouts/${workoutData.workout_id}`);
                            }}
                            color={'primary'}
                        >
                            Commencer
                        </Button>

                    </ModalFooter>
                </ModalContent>
            )}
        </Modal>
    );
}

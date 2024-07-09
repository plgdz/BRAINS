// DrawerNewWorkout.tsx
// Ce composant permet de créer une nouvelle séance d'entraînement. Il permet de créer un nouvel exercice, de l'ajouter à la séance et de l'enregistrer.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { ButtonNewExercise } from "@/app/ui/dashboard/workouts/wrapper/button/ButtonNewExercise";
import { NewExercise } from "@/app/ui/dashboard/workouts/wrapper/cards/NewExercise";
import { ExerciseCard } from "@/app/ui/dashboard/workouts/wrapper/cards/ExerciseCard";

export function DrawerNewWorkout(
    props: {
        isOpen: boolean,
        toggleDrawer: () => void,
        handleAddWorkout: (workout: {
            title: string;
            exercises: Exercise[];
            notes: string;
            duration: number;
        }
        ) => void
    }
) {
    const [nom, setNom] = useState('');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [notes, setNotes] = useState('');

    const [isNewExerciseOpen, setIsNewExerciseOpen] = useState(false);
    const [editExercise, setEditExercise] = useState<Exercise | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const toggleNewExercise = () => {
        setIsNewExerciseOpen(!isNewExerciseOpen);
    }

    const handleAddExercise = (exercise: Exercise) => {
        setExercises([...exercises, exercise]);
    }

    const handleDeleteExercise = (index: number) => {
        const newExercises = exercises.filter((exercise, i) => i !== index);
        setExercises(newExercises);
    }

    const toggleEditExercise = (index: number, exercise: Exercise) => {
        setEditExercise(exercise);
        setEditIndex(index);
        toggleNewExercise();
    }

    const calculateDuration = (exercises: Exercise[]) => {
        let duration = 0;
        exercises.map((exercise) => {
            duration += ((5 * exercise.reps) + exercise.rest) * exercise.sets;
        })
        return duration;
    }

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                onClose={props.toggleDrawer}
                placement={'bottom-center'}
                size={'3xl'}
                classNames={
                    {
                        base: 'min-h-1/3',
                        header: 'bg-white h-20 text-black',
                        body: 'w-full',
                        footer: 'bg-white h-20 text-black'
                    }
                }
            >
                <ModalContent>
                    <ModalHeader className={'flex-row'}>
                        <Input
                            variant={'underlined'} label={'Nom de la séance'} className={'text-black'}
                            onChange={(e) => {
                                setNom(e.target.value)
                            }}
                        />
                    </ModalHeader>
                    <ModalBody className={'flex-col'}>
                        <div className={'h-full w-full p-6'}>
                            <h1 className={'text-xl font-bold'}>Exercices</h1>
                            {exercises ? exercises.map((exercise, index) => {
                                return (
                                    <div key={index} className={'flex justify-between'}>
                                        <ExerciseCard
                                            exercise={exercise}
                                            index={index}
                                            handleDeleteExercise={handleDeleteExercise}
                                            handleEditExercise={toggleEditExercise} />
                                    </div>
                                )
                            })
                                :
                                null
                            }

                            <ButtonNewExercise onPress={toggleNewExercise} />
                        </div>
                        <Textarea
                            label={'Notes'}
                            placeholder={'Entrez vos notes, descriptions...'}
                            className={'w-full'}
                            maxRows={3}
                            onChange={(e) => {
                                setNotes(e.target.value)
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className={'w-1/2 ml-auto mr-auto'}
                            variant={'solid'}
                            color={'primary'}
                            onPress={
                                () => {
                                    props.handleAddWorkout({
                                        title: nom,
                                        exercises: exercises,
                                        notes: notes,
                                        duration: calculateDuration(exercises)
                                    });
                                    props.toggleDrawer();
                                }
                            }
                        >
                            <p>Enregister la séance</p>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <NewExercise
                isOpen={isNewExerciseOpen}
                toggleNewExercise={toggleNewExercise}
                handleAddExercise={handleAddExercise}
            />
        </>
    );
}
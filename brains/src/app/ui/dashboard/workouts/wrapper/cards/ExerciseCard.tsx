// ExerciseCard.tsx
// Ce composant affiche les informations d'un exercice.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";


export function ExerciseCard(
    props: {
        exercise: Exercise,
        index: number,
        handleDeleteExercise: (index: number) => void,
        handleEditExercise: (index: number, exercise: Exercise) => void
    }
) {
    const [idx, setIndex] = useState<number>(props.index);


    return (
        <Dropdown>
            <DropdownTrigger>
                <Card
                    fullWidth
                    className={'mb-2'}
                    isBlurred
                    isPressable
                >
                    <CardBody>
                        <div className={'flex justify-between font-bold'}>
                            <p>{props.exercise.title}</p>
                            <p>{props.exercise.sets} x {props.exercise.reps} - {props.exercise.weight}{props.exercise.unit}</p>
                        </div>
                        {props.exercise.notes ? <p>{props.exercise.notes}</p> : null}
                    </CardBody>
                </Card>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownSection>
                    <DropdownItem
                        isDisabled
                    >
                        Modifier
                    </DropdownItem>
                    <DropdownItem
                        color={'danger'}
                        onClick={() => props.handleDeleteExercise(idx)}
                    >
                        Supprimer
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}
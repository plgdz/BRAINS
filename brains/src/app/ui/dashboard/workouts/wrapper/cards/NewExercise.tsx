// NewExercise.tsx
// Ce composant permet de créer un nouvel exercice.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";

import { NumbersSelection } from "@/app/ui/dashboard/workouts/wrapper/cards/NumbersSelection";
import { Button } from "@nextui-org/button";
import { ModalContent, Textarea } from "@nextui-org/react";
import { Modal } from "@nextui-org/react";


export function NewExercise(
    props: {
        isOpen: boolean,
        toggleNewExercise: () => void,
        handleAddExercise: (exercise: Exercise) => void
    }
) {
    const [nbSets, setNbSets] = useState<number>(0);
    const [nbReps, setNbReps] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [unit, setUnit] = useState<string>('kg');
    const [rest, setRest] = useState<number>(0);
    const [exerciseTitle, setExerciseTitle] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [err, setErr] = useState<boolean>(false);

    const handleNbSetsChange = (e: number) => {
        const newValue = e;
        if (!isNaN(newValue)) {
            setNbSets(newValue);
        }
    }

    const handleNbRepsChange = (e: number) => {
        const newValue = e;
        if (!isNaN(newValue)) {
            setNbReps(newValue);
        }
    }

    const handleWeightChange = (e: number) => {
        const newValue = e;
        if (!isNaN(newValue)) {
            setWeight(newValue);
        }
    }

    const handleRestChange = (e: number) => {
        const newValue = e;
        if (!isNaN(newValue)) {
            setRest(newValue);
        }
    }

    const handleUnitChange = (e: string) => {
        setUnit(e);
    }

    const handleSubmit = () => {
        if (exerciseTitle != '') {
            const newExercise: Exercise = {
                id: null,
                title: exerciseTitle,
                sets: nbSets,
                reps: nbReps,
                weight: weight,
                unit: unit,
                rest: rest,
                notes: notes
            }
            props.handleAddExercise(newExercise);
            resetValues();
            props.toggleNewExercise();
        } else {
            setErr(true)
        }
    }

    const resetValues = () => {
        setNbSets(0);
        setNbReps(0);
        setWeight(0);
        setRest(0);
        setExerciseTitle('');
        setUnit('kg')
        setErr(false);
    }




    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.toggleNewExercise}
            placement={'bottom-center'}
            size={'3xl'}
            classNames={
                {
                    wrapper: 'm-0 p-0',
                    base: 'm-0 p-0',
                    header: 'm-0 p-0',
                    body: 'm-0 p-0',

                }
            }
        >
            <ModalContent>
                <Card
                    fullWidth={true}
                >
                    <CardHeader className={'flex'}>
                        <div className={'flex-row w-full'}>
                            <h1 className='text-lg font-bold text-center'>Créer un exercice</h1>
                            <Input
                                variant={'underlined'}
                                color={err ? 'danger' : 'default'}
                                label={'Nom de l\'exercice'}
                                isRequired
                                onChange={(e) => {
                                    setExerciseTitle(e.target.value)
                                }}
                            />
                        </div>
                    </CardHeader>
                    <CardBody className={'flex-col'}>
                        <div className={'flex justify-around mb-5'}>
                            <NumbersSelection
                                title={'Nombre de répétitions'}
                                value={nbReps}
                                step={1}
                                min={0}
                                max={100}
                                endUnit={null}
                                endSec={null}
                                handleUnitChange={null}
                                handleInputChange={handleNbRepsChange}
                            />
                            <NumbersSelection
                                title={'Poids'}
                                value={weight}
                                step={5}
                                min={0}
                                max={1000}
                                endUnit={true}
                                endSec={null}
                                handleUnitChange={handleUnitChange}
                                handleInputChange={handleWeightChange}
                            />
                        </div>
                        <div className={'flex justify-around mb-5'}>
                            <NumbersSelection
                                title={'Nombre de séries'}
                                value={nbSets}
                                step={1}
                                min={0}
                                max={30}
                                endUnit={null}
                                endSec={null}
                                handleUnitChange={null}
                                handleInputChange={handleNbSetsChange}
                            />
                            <NumbersSelection
                                title={'Temps de repos'}
                                value={rest}
                                step={10}
                                min={0}
                                max={600}
                                endUnit={null}
                                endSec={true}
                                handleInputChange={handleRestChange}
                                handleUnitChange={null}

                            />
                        </div>
                        <Textarea
                            label={'Notes'}
                            variant={'bordered'}
                            placeholder={'Ajouter des notes'}
                            fullWidth={false}
                            className={'w-11/12 ml-auto mr-auto mb-5'}
                            onChange={(e) => {
                                setNotes(e.target.value)
                            }}
                        />
                        <Button
                            className={'w-1/2 ml-auto mr-auto'}
                            variant={'solid'}
                            color={'primary'}
                            onClick={handleSubmit}
                        >
                            <p>Ajouter l&apos;exercice</p>
                        </Button>
                    </CardBody>
                </Card>
            </ModalContent>
        </Modal>
    )
}
// SetSession.tsx
// Ce composant affiche un exercice en cours.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { RestSession } from "@/app/ui/dashboard/workouts/SessionWorkout/RestSession";

export function SetSessionWrapper(props: {
    exercises: Exercise[],
    changeIndex: (index: number) => void,
    toggleEnd: () => void
}) {
    const [index, setIndex] = useState(0);
    const [current, setCurrent] = useState(props.exercises[index]);
    const [currentSet, setCurrentSet] = useState(1);
    const [list, setList] = useState(props.exercises);
    const [showTimer, setShowTimer] = useState(false);

    const next = () => {
        if (currentSet < current.sets) {
            setCurrentSet(currentSet + 1);
            handleToggleTimer();
        } else {
            if (index < list.length) {
                const nextIndex = index + 1;
                if (nextIndex === list.length) {
                    props.toggleEnd();
                    return;
                }
                handleToggleTimer();
                props.changeIndex(nextIndex);
                setIndex(nextIndex);
                setCurrent(list[nextIndex]);
                setCurrentSet(1);
            }
        }
    }

    const handleToggleTimer = () => {
        setShowTimer(prevState => !prevState);
    }

    return (
        <Card className={'col-span-1 md:col-span-3 md:col-start-2 row-start-1 md:top-1/2 h-full '}>
            <h1 className={'text-center font-bold text-2xl h-16 text-4xl mt-5'}>{current.title}</h1>
            <h1 className={'text-3xl text-center font-bold'}>{currentSet} / {current.sets}</h1>
            <div className={'flex h-1/2'}>
                <div className={'w-1/2 flex justify-center'}>
                    <Card className={'h-48 w-48 self-center'}>
                        <CardHeader>
                            <h1 className={'w-full text-center font-bold'}>Répétitions</h1>
                        </CardHeader>
                        <CardBody className={'p-6'}>
                            <h1 className={'text-center text-6xl'}>{current.reps}</h1>
                        </CardBody>
                    </Card>
                </div>
                <div className={'w-1/2 flex justify-center'}>
                    <Card className={'h-48 w-48 self-center'}>
                        <CardHeader>
                            <h1 className={'w-full text-center font-bold'}>Poids</h1>
                        </CardHeader>
                        <CardBody className={'p-6'}>
                            <h1 className={'text-center text-5xl'}>{current.weight}</h1>
                            <h1 className={'text-center text-xl'}>{current.unit}</h1>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className={'flex justify-center h-32'}>
                <Button
                    className={'center self-center'}
                    size={'lg'}
                    onClick={next}
                >
                    Repos
                </Button>
            </div>
            {showTimer && (
                <RestSession restTime={current.rest} toggleTimer={handleToggleTimer} isOpen={showTimer} /> // Afficher le timer s'il est ouvert
            )}
        </Card>
    )
}

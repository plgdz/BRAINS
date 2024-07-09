// ComingUp.tsx
// Ce composant affiche les exercices à venir.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, {useEffect, useState} from 'react';
import {Card, CardBody} from "@nextui-org/card";

export function ComingUp(props :{
        exercises: Exercise[],
        idx: number
}) {
    const [index, setIndex] = useState(props.idx)
    const [list, setList] = useState(props.exercises)

    useEffect(() => {
        setIndex(props.idx)
    }, [props.idx])

    return (
        <Card className={'h-full col-span-1 col-start-1 md:col-start-6 md:col-span-2  row-start-2 md:top-1/2 md:row-auto rounded-0 h-full p-4'}>
            <CardBody>
                <h1 className={'text-center mb-4 font-bold'}>Coming Up</h1>
                {list.map((exercise: Exercise, idx) => {
                    return (
                        <Card
                            key={index}
                            className={'mb-4'}
                            isDisabled={props.idx == idx ? false : true}
                        >
                            <CardBody className={'flex justify-between'}>
                                <h1>{exercise.title}</h1>
                                <h2>{exercise.sets} x {exercise.reps}</h2>
                            </CardBody>
                        </Card>
                    )})
                }
            </CardBody>
        </Card>
    )
}
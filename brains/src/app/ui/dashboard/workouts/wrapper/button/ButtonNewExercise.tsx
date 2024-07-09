// ButtonNewExercise.tsx
// Ce composant est un bouton qui permet d'ajouter un exercice.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import { Card, CardBody } from "@nextui-org/card";
import React from "react";


export function ButtonNewExercise(
    props: {
        onPress: () => void
    }
) {
    return (
        <Card
            isPressable={true}
            fullWidth={true}
            onPress={props.onPress}
        >
            <CardBody className={'flex-col align-middle'}>
                <div className={'flex'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                            d="M12 4v16m8-8H4" />
                    </svg>
                    <h1 className='text-md ml-3'>Ajouter un exercice</h1>
                </div>
            </CardBody>
        </Card>
    )
}
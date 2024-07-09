// ButtonAddWorkout.tsx
// Ce composant est un bouton qui permet d'ajouter un entraînement.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import { Button } from "@nextui-org/react";
import React from "react";

export function ButtonAddWorkout(
    props: {
        onClick: () => void
    }
) {
    return (
        <Button
            className='absolute right-5 bottom-5 p-6'
            variant="solid"
            color="primary"
            onClick={props.onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            <h1 className='text-xl'>Add Workout</h1>
        </Button>
    );
}

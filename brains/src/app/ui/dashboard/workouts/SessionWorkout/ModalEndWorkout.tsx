// ModalEndWorkout.tsx
// Ce composant affiche un modal pour terminer un entraînement.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { WorkoutMiddleware } from "@/app/lib/actions/workout";
import { useRouter } from "next/navigation";

export function ModalEndWorkout(props: {
    open: boolean,
    toggleEnd: () => void
    t_start: number,
    t_end: number,
    workout_id: number
}) {
    const router = useRouter();
    const [notes, setNotes] = useState('');
    const duration = Math.floor((props.t_end - props.t_start) / 1000);
    const workout_id: number = props.workout_id;
    const completed_at = new Date();

    const saveWorkout = async () => {
        const data = {
            workout_id: workout_id,
            duration: duration,
            notes: notes,
            completed_at: completed_at
        }
        WorkoutMiddleware('completeWorkout', data);
        router.push('/dashboard/workouts');
    }

    return (
        <Modal isOpen={props.open} >
            <ModalContent>
                <ModalHeader className={'bg-white'}>Fin de l&apos;entraînement</ModalHeader>
                <ModalBody>
                    <h1>Bravo ! Vous avez terminé votre entraînement</h1>
                    <p>Durée: {Math.round(duration / 60)} minutes</p>
                    <p>id : {props.workout_id}</p>
                    <Textarea
                        label="Notes"
                        variant={'underlined'}
                        placeholder="Ressenti, notes, commentaires..."
                        className="max-w-xs"
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter className={'bg-white'}>
                    <Button onClick={saveWorkout}>Enregister</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
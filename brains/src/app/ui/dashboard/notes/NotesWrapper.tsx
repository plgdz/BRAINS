// NotesWrapper.tsx
// Composant qui affiche les notes de l'utilisateur
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState, useEffect } from 'react';
import { notesMiddleware } from '@/app/lib/actions/notes';
import { NoteCard } from './noteCard';
import { NewNote } from './newNote';
import { NewNoteButton } from './newNoteButton';
import { CircularProgress, Divider } from "@nextui-org/react";

export function NotesDisplay() {
    const [notes, setNotes] = useState<{ task_id: string | number }[]>([]);
    const [onChange, setOnChange] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            const notes = await notesMiddleware('getNotes', {});
            // @ts-ignore
            setNotes(notes);
            setLoading(false);
        };

        fetchNotes();
    }, [onChange]);

    const reloadNotes = () => {
        console.log('Reloading notes');
        setOnChange(!onChange);
    }

    return (
        <>
            <div className='max-w-md full-w scrollable-div'>
                <div className="space-y-1 fixed bg-white shadow-md z-30 w-full">
                    <h1 className="text-3xl font-medium p-6 text-center md:text-left">Notes</h1>
                </div>
                <Divider className="mb-4" />
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <CircularProgress size="lg" aria-label="Loading..." />
                    </div>
                ) : (
                    <>
                        {notes.filter((note) => !(note as any).project_id).length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-screen">
                                <h1 className="text-2xl font-bold">Aucune note trouvée</h1>
                                <NewNoteButton reload={reloadNotes} />
                            </div>
                        ) : (
                            <div className='grid grid-flow-col gap-4 pt-24 justify-start'>
                                {notes
                                    .filter((note) => !(note as any).project_id)
                                    .sort((a: any, b: any) => a.task_id - b.task_id)
                                    .reverse()
                                    .map((note) => (
                                        <NoteCard key={note.task_id} reload={reloadNotes} note={note} />
                                    ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="fixed bottom-0 right-0 p-6">
                <NewNote reload={reloadNotes} />
            </div>
        </>
    );    
}

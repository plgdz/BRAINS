// page.tsx
// Page principale des notes de l'utilisateur
// Auteurs : Paul Agudze, Thomas Garneau

"use client";
import React, {useState} from 'react';
import { NotesDisplay } from '@/app/ui/dashboard/notes/NotesWrapper';

export default function Notes(): any {
    return (
        <NotesDisplay />
    );
};
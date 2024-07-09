// page.tsx
// Page principale de note
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import Link from 'next/link';
import { NoteWrapper } from '@/app/ui/dashboard/notes/NoteWrapper';
import React, { useState } from 'react';

export default function Note({ params }: { params: any }): React.ReactNode {
    return (
        <NoteWrapper nid={params}/>
    )
}
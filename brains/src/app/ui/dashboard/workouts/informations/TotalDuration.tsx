// TotalDuration.tsx
// Ce composant affiche la durée totale des entraînements.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect } from 'react';

export function InformationsTotalDuration(
    props: {
        totalDuration: number,
    }
) {

    return (
        <div
            className={'flex flex-col items-center justify-center h-24 w-24 border-black border-8 rounded-full'}
        >
            <p>{Math.round(props.totalDuration / 60)}</p>
            <p>min</p>
        </div>
    );
}
// providers.tsx
// Fichier qui contient les providers de l'application
// Auteurs : Paul Agudze, Thomas Garneau

'use client'

import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}
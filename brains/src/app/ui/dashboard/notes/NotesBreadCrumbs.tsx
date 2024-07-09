// NotesBreadCrumbs.tsx
// Composant qui affiche le fil d'ariane des notes
// Auteurs : Paul Agudze, Thomas Garneau

'use client'

import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/breadcrumbs";
import React from "react";

export function NotesBreadCrumds( props: any ) {
    return (
        <div className={'w-full m-2.5 hidden md:block'}>
            <Breadcrumbs size={'md'} variant={'solid'}>
                <BreadcrumbItem
                    key={0}
                    href={`/dashboard/notes`}
                >Notes
                </BreadcrumbItem>
                <BreadcrumbItem
                    key={1}
                    href={`/dashboard/notes/${props.ids.note_title}`}
                >{props.ids.note_title}
                </BreadcrumbItem>
            </Breadcrumbs>
        </div>
    );
}
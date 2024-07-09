'use client';
import React from 'react';
import {ProjectsWrapper} from "@/app/ui/dashboard/projects/ProjectsWrapper";


export default function Project( {params}: {params: any}) {
    const [breadcrumbs, setBreadcrumbs] = React.useState([]);

    return (
        <ProjectsWrapper pid={params.project[0]} />
    )
}
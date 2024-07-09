// ProjectWrapper.tsx
// Ce composant est le composant parent de tous les composants de la page de projet. Il contient les composants ProjectInfo, ProjectSubWrapper et ProjectTaskWrapper.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';
import  React, {useState, useEffect, Suspense } from "react";

import {ProjectSubWrapper} from "@/app/ui/dashboard/projects/ProjectSubWrapper";
import {ProjectTaskWrapper} from "@/app/ui/dashboard/projects/ProjectTaskWrapper";
import {ProjectInfo, ProjectInfoSkeleton} from "@/app/ui/dashboard/projects/ProjectInfo";
import {Skeleton} from "@nextui-org/skeleton";
import { projectMiddleware } from "@/app/lib/actions/projects";



export function ProjectsWrapper(
    props:{
        pid: string
    }
) {
    const [parentProject, setParentProject] = useState(null);
    const [subProjects, setSubProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const ids = props.pid.split('-')
    const data = {
        project_id: ids[0],
        id: ids[1]
    }

    useEffect(() => {
        const fetchParent = async () => {
            const fetchedProject = await projectMiddleware('getProject', data);
            // @ts-ignore
            setParentProject(fetchedProject);
        };
        fetchParent();
    }, []);

    return (
        <div>
            {parentProject ? (<ProjectInfo projectData={parentProject} />) : (<ProjectInfoSkeleton/>)}
            <div className={'w-full flex-row md:grid md:grid-cols-4'}>
                <ProjectSubWrapper ids={data}/>
                <ProjectTaskWrapper ids={data}/>
            </div>
        </div>

    );
}
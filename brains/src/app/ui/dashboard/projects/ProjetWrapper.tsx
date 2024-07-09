// ProjectWrapper.tsx
// Ce composant est le composant parent de tous les composants de la page de projet. Il contient les composants ProjectInfo, ProjectSubWrapper et ProjectTaskWrapper.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect } from 'react';
import { projectMiddleware } from "@/app/lib/actions/projects";
import { ProjectCard } from "@/app/ui/dashboard/projects/projectcard";
import { ProjectsWrapper } from "@/app/ui/dashboard/projects/ProjectsWrapper";
import { ProjectCreate } from "@/app/ui/dashboard/projects/ProjectCreate";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";


export function ProjectsDisplay() {
    const [projects, setProjects] = useState([]);
    const [modal, setModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [pid, setPid] = useState(null);
    const toggleModal = () => setModal(!modal);
    const toggleCreateModal = () => setCreateModal(!createModal);

    useEffect(() => {
        const fetchProjects = async () => {
            const fetchedProjects = await projectMiddleware('getAll', {});
            // @ts-ignore
            setProjects(fetchedProjects)
        };

        fetchProjects();
    }, [createModal]);

    return (
        <div>
            <div className="space-y-1 fixed bg-white shadow-md z-30 w-full">
                <h1 className="text-3xl font-medium p-6 text-center md:text-left">Projets</h1>
            </div>
            <Divider />
            {projects.length > 0 ? (
                <ul className={'pt-24'}>
                    {projects.map((project: any, index: number) => (
                        <ProjectCard key={index} project={project} onClick={() => {
                            setPid(project.project_id);
                            toggleModal();
                        }} />
                    ))}
                </ul>
            ) : (
                <div className="flex justify-center items-center h-[100vh] flex-col">
                    <h1 className=" flex text-2xl font-bold mb-4">Aucun projet trouvé</h1>
                    <Button variant="solid" color="primary" onPress={toggleCreateModal} className='rounded-full p-4 bg-primary text-white flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </Button>
                </div>
            )}

            {modal ?
                // @ts-ignore
                <ProjectsWrapper pid={pid} /> :
                null
            }

            <Button
                className='absolute right-5 bottom-5 p-6'
                variant="solid"
                color="primary"
                onClick={toggleCreateModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
                <h1 className='text-xl'>Add Project</h1>
            </Button>
            <ProjectCreate
                isOpen={createModal}
                onOpenChange={toggleCreateModal}
                id={null}
                toggleModal={toggleCreateModal}
                project={null}
                task={null}
            />
        </div>
    );
}




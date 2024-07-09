// ProjectSubWrapper.tsx
// Composant pour afficher les sous-projets d'un projet
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useEffect, useState } from "react";
import { projectMiddleware } from "@/app/lib/actions/projects";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";
import { ProjectCreate } from "@/app/ui/dashboard/projects/ProjectCreate";
import { CardHeader } from "@nextui-org/react";
import { ProjectDropdown } from "@/app/ui/dashboard/projects/ProjectDropdown";

export function ProjectSubWrapper(
    props: {
        ids: {
            project_id: string,
            id: string
        }
    }) {
    const [subProjects, setSubProjects] = useState([]);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [deleteProject, setDeleteProject] = useState(false);
    const [subProject, setSubProject] = useState(props.ids);

    const toggleModal = () => {
        setIsOpenCreate(!isOpenCreate);
    }

    const toggleModalUpdate = () => {
        setIsOpenUpdate(!isOpenUpdate)
    }

    const updateOnDelete = () => {
        setDeleteProject(!deleteProject)
    }

    useEffect(() => {
        const fetchSubProjects = async () => {
            const fetchedProject = await projectMiddleware('getProjectSub', { parent: props.ids.id });
            // @ts-ignore
            setSubProjects(fetchedProject);
        };
        fetchSubProjects();
    }, [isOpenCreate, isOpenUpdate, deleteProject]);

    // @ts-ignore
    return (
        <div className={'h-full md:col-span-1 p-2.5 flex flex-col'}>
            <h2>Sous-projets</h2>
            <Divider className={'mb-2'} />
            {subProjects.length > 0 ? (
                <div>
                    {subProjects.sort((a: { id: any }, b: { id: any }) => a.id - b.id).map((subProject: { id: any, title: any, description: any }, index) => (
                        <Card key={subProject.id} className={'mb-2'}>
                            <CardHeader className={'flex justify-between'}>
                                <Link
                                    key={subProject.id} href={`/dashboard/projects/${props.ids.project_id}-${subProject.id}`}
                                    prefetch={true}
                                >
                                    <h3>{subProject.title}</h3>
                                </Link>
                                <ProjectDropdown project={subProject} refresh={updateOnDelete} task={null} />
                            </CardHeader>
                            <Link
                                key={subProject.id} href={`/dashboard/projects/${props.ids.project_id}-${subProject.id}`}
                                prefetch={true}
                            >
                                <CardBody key={subProject.id}>
                                    <p>{subProject.description}</p>
                                </CardBody>
                            </Link>
                        </Card>
                    ))}
                </div>
            ) : (
                <p></p>
            )}
            <Button
                onPress={() => setIsOpenCreate(true)}
                className={'w-1/2 left-1/4'}
                variant={'bordered'}
                startContent={<img width="25"
                    height="25"
                    src="https://img.icons8.com/ios-filled/50/add--v1.png"
                    alt="add--v1" />}>
                Ajouter
            </Button>
            <ProjectCreate isOpen={isOpenCreate} onOpenChange={setIsOpenCreate} id={props.ids} toggleModal={toggleModal}
                project={undefined} task={undefined} />
            <ProjectCreate isOpen={isOpenUpdate} onOpenChange={setIsOpenUpdate} project={subProject}
                toggleModal={toggleModalUpdate} id={subProject} task={undefined} />
        </div>
    );
}

// ProjectTaskWrapper.TSX
// Ce composant est le composant enfant de ProjectsWrapper. Il contient les tâches du projet.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';
import React, { useState, useEffect } from 'react';
import { projectMiddleware } from "@/app/lib/actions/projects";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { ProjectCreate } from "@/app/ui/dashboard/projects/ProjectCreate";
import { ProjectDropdown } from "@/app/ui/dashboard/projects/ProjectDropdown";

export function ProjectTaskWrapper(
    props: {
        ids: {
            project_id: string,
            id: string
        }
    }
) {
    const [tasks, setTasks] = useState([]);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        const fetchProjectsTasks = async () => {
            const fetchedTasks = await projectMiddleware('getProjectTasks', props);
            // @ts-ignore
            setTasks(fetchedTasks);

        };
        fetchProjectsTasks();
    }, [refresh]);

    useEffect(() => {
        const fetchProjectsTasks = async () => {
            const fetchedTasks = await projectMiddleware('getProjectTasks', props);
            // @ts-ignore
            setTasks(fetchedTasks);

        };
        fetchProjectsTasks();
    }, [isOpenCreate, refresh]);



    // @ts-ignore
    return (
        <div className={'md:h-[90vh] block w-full md:col-span-3 p-2.5 '}>
            <p>Tâches</p>
            <Divider className={'mb-2'} />
            {tasks ? (
                <Accordion isCompact={true} variant={'splitted'} selectionMode={'multiple'}>
                    {tasks.sort((a: { id: any }, b: { id: any }) => a.id - b.id).map((task: any, index: any) => (
                        <AccordionItem
                            key={task.id}
                            title={task.title}
                            startContent={<ProjectDropdown task={task} refresh={handleRefresh} project={undefined} />}
                            className={'bg-gray-100 mb-4'}
                        >
                            <p>{task.description}</p>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <p>No tasks found.</p>
            )}
            <Button
                onPress={() => setIsOpenCreate(true)}
                className={'m-auto w-1/2 left-1/4'}
                variant={'bordered'}
                startContent={<img width="25"
                    height="25"
                    src="https://img.icons8.com/ios-filled/50/add--v1.png"
                    alt="add--v1" />}>
                Ajouter
            </Button>
            <ProjectCreate
                isOpen={isOpenCreate}
                onOpenChange={setIsOpenCreate}
                id={props.ids}
                toggleModal={() => setIsOpenCreate(!isOpenCreate)}
                task={true} project={undefined} />
        </div>
    );
}
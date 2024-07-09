// ProjectDopdown.tsx
// Composant pour afficher un menu déroulant de projet
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { ProjectCreate } from "@/app/ui/dashboard/projects/ProjectCreate";
import { calendarMiddleWare } from "@/app/lib/actions/calendar";
import { projectMiddleware } from "@/app/lib/actions/projects";

export function ProjectDropdown(
    props: {
        task: any
        project: any
        refresh: any
    }
) {
    const [task, setTask] = useState(props.task);
    const [project, setProject] = useState(props.project);
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        props.refresh();
        setIsOpen(!isOpen);
    }


    const deleteProject = async () => {
        const event = await calendarMiddleWare('getSingleEvent', { type: 'project', reference_id: project.project_id + '-' + project.id.toString() });
        // @ts-ignore
        await calendarMiddleWare('deleteEvent', { eventId: event[0].event_id });
        projectMiddleware('deleteProject', { id: project.id.toString() });
    }

    const deleteTask = async () => {
        projectMiddleware('deleteTask', { id: task.task_id });
    }

    return (
        <><Dropdown aria-label={'DD'}>
            <DropdownTrigger aria-label={'DDTrigger'}>
                <Button
                    variant="light"
                    isIconOnly
                    aria-label={'Menu'}
                >
                    <img width="15" height="15"
                        src="https://img.icons8.com/ios-filled/50/menu-2.png"
                        alt="menu-2" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label={'DDMenu'}>
                <DropdownSection>
                    <DropdownItem
                        onPress={() => toggleModal()}
                    >
                        Modifier
                    </DropdownItem>
                    <DropdownItem
                        color={'danger'}
                        className={'text-danger'}
                        onPress={() => {
                            if (project) deleteProject()
                            if (task) deleteTask()
                            props.refresh()
                        }}
                    >
                        Supprimer
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
            <ProjectCreate isOpen={isOpen} onOpenChange={setIsOpen} task={task} project={project} id={project ? project.id : task.id}
                toggleModal={toggleModal} />
        </>
    )
}
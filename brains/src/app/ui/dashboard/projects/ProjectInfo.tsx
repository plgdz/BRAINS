// ProjectInfo.tsx
// Composant pour afficher les informations d'un projet
// Auteurs : Paul Agudze, Thomas Garneau

'use client';
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { today, getLocalTimeZone, CalendarDate, parseDate } from "@internationalized/date";
import { ProjectBreadCrumds } from "@/app/ui/dashboard/projects/ProjectBreadCrumds";
import { ProjectCreate } from "@/app/ui/dashboard/projects/ProjectCreate";
import { projectMiddleware } from "@/app/lib/actions/projects";
import { calendarMiddleWare } from "@/app/lib/actions/calendar";
import { useRouter } from "next/navigation";

export function ProjectInfo({ projectData }: any): React.ReactNode {
    const [modalOpen, setModalOpen] = useState(false);
    const [project, setProject] = useState(projectData[0]);


    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }
    const router = useRouter();

    const deleteProject = async () => {
        const event = await calendarMiddleWare('getSingleEvent', { type: 'project', reference_id: project.project_id + '-' + project.id.toString() });
        // @ts-ignore
        if (event.length > 0) await calendarMiddleWare('deleteEvent', { eventId: event[0].event_id });
        projectMiddleware('deleteProject', { id: projectData[0].id.toString() });
        if (project.parent) {
            router.push('/dashboard/projects/' + project.project_id + '-' + project.parent);
        } else {
            router.push('/dashboard/projects');
        }
    }

    return (
        <div className={'h-full w-full p-2.5 flex justify-between'}>
            <div className={' w-full flex-col'}>
                <div className={'flex justify-between mb-5'}>
                    <ProjectBreadCrumds ids={{ project_id: projectData[0].project_id, id: projectData[0].id }} />
                    <ButtonGroup variant={"flat"} className={'pt-16 md:pt-0'}>
                        <Button
                            onPress={() => {
                                setModalOpen(true);
                            }}
                        >
                            Modifier
                        </Button>
                        <Button
                            color={'danger'}
                            onPress={() => {
                                deleteProject();
                            }}
                        >
                            Supprimer
                        </Button>
                    </ButtonGroup>
                </div>
                <div className={'w-full  flex justify-between'}>
                    <div className={'md:w-auto  flex-col content-center h-min-[5vh] absolute md:relative top-6 ml-20 md:ml-0'}>
                        <h1 className={'mb-2 text-xl font-bold'}>{project.title}</h1>
                        <p>{project.description}</p>
                    </div>
                    <DatePicker
                        label="Pour le"
                        defaultValue={parseDate(new Date(projectData[0].date).toISOString().split('T')[0])}
                        className="w-full md:max-w-[284px]"
                        isDisabled
                    />
                </div>
            </div>
            <ProjectCreate isOpen={modalOpen} onOpenChange={setModalOpen} id={projectData[0]} toggleModal={toggleModal} project={projectData[0]} task={null} />
        </div>
    );
}

export function ProjectInfoSkeleton(): React.ReactNode {
    return (
        <div className="h-full w-full p-2.5 flex justify-between">
            <div className="w-full flex-col">
                <div className="flex justify-between mb-5">
                    {/* Simulating breadcrumbs and buttons with CSS animations */}
                    <div className="h-12 w-24 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="flex ">
                        <div className="h-10 w-16 bg-gray-100 rounded animate-pulse"></div>
                        <div className="h-10 w-16 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <div className="w-auto flex-col content-center">
                        {/* Title and description placeholders */}
                        <div className="h-8 w-30 bg-gray-100 rounded animate-pulse"></div>
                        <div className="h-10 w-56 bg-gray-100 rounded animate-pulse mt-2"></div>
                    </div>
                    {/* Placeholder for date picker */}
                    <div className="h-14 w-72 bg-gray-300 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}


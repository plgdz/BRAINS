// ProjectCreate.tsx
// Composant pour créer un projet
// Auteurs : Paul Agudze, Thomas Garneau    

'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { projectMiddleware } from "@/app/lib/actions/projects";
import { calendarMiddleWare } from "@/app/lib/actions/calendar";

import { useEffect, useState } from "react";
import { CalendarDateTime, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { boolean } from "zod";

// @ts-ignore
export function ProjectCreate({ isOpen, onOpenChange, id, toggleModal, project, task }) {
    const [title, setTitle] = useState('');
    const [oldData, setOldData] = useState({});

    const [data, setData] = useState({
        title: '',
        description: '',
        date: '',
        project_id: 0,
        parent: '',
        id: 0,
    })

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setData(project)
    }, [project])

    useEffect(() => {
        setData(task)
    }, [task])


    useEffect(() => {
        if (project) {
            setTitle('Modifier un projet');
            setData({
                ...data,
                project_id: id.project_id,
                parent: id.id,
            })
            setOldData(project)
            setData(project)
        } else if (typeof (task == boolean) && task === true) {
            setData({
                ...data,
                project_id: id.project_id,
                id: Number(id.id),
            })
            setTitle('Ajouter une tâche');
        } else if (task) {
            setTitle('Modifier une tâche');
            setOldData(task)
            setData(task)
        } else if (id) {
            setData({
                ...data,
                project_id: id.project_id,
                parent: id.id.toString(),
            })
            setTitle('Ajouter un projet');
        } else {
            setTitle('Ajouter un projet');
        }
    }, [project]);

    const sendData = async (e: any) => {
        e.preventDefault();
        try {
            if (project) {
                const projet = await projectMiddleware('updateProject', data)
                // @ts-ignore
                const event = await calendarMiddleWare('getSingleEvent', { type: 'project', reference_id: projet.project_id + '-' + projet.id.toString() });
                // @ts-ignore
                await calendarMiddleWare('updateEvent', { eventId: event[0].event_id, title: projet.title, date: new Date(projet.date).toISOString() });
            } else if (typeof (task == boolean) && task === true) {
                await projectMiddleware('createTask', data);
            } else if (task) {

                if (oldData !== data)
                    await projectMiddleware('updateTask', data);
            } else {
                const project = await projectMiddleware('createProject', data);
                // @ts-ignore
                await calendarMiddleWare('createEvent', { title: project.title, date: new Date(project.date).toISOString(), type: 'project', reference_id: project.project_id + '-' + project.id.toString() });
            }
        } catch (e) {
            console.log('error', e);
        }
        toggleModal();
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
                header: 'bg-white text-black',
                body: 'bg-white text-black',
                footer: 'bg-white text-black',
            }}
        >
            <ModalContent className={'w-full'}>
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalBody>
                    <Input
                        variant={'underlined'}
                        label={
                            task ? 'Nom de la tâche' : 'Nom du projet'
                        }
                        name={'title'}
                        // @ts-ignore
                        defaultValue={
                            () => {
                                if (project) return project.title;
                                else if (task) return task.title;
                                else return null;

                            }
                        }
                        isRequired
                        autoFocus
                        onChange={handleChange} />
                    {task ? null :
                        (
                            <>
                                <DatePicker
                                    label="Echéance"
                                    name={'projectDeadline'}
                                    isRequired
                                    // @ts-ignore
                                    defaultValue={() => {
                                        if (project && project.date) return parseDate(new Date(project.date).toISOString().split('T')[0]);
                                        else return null;
                                    }}
                                    variant={'underlined'}
                                    // @ts-ignore
                                    onChange={(value: CalendarDateTime) => {
                                        setData({
                                            ...data,
                                            date: value.toDate('America/Montreal').toString(),
                                        });
                                    }} />
                            </>
                        )
                    }
                    <Textarea
                        label={
                            task ? 'Description de la tâche' : 'Description du projet'
                        }
                        variant={'underlined'}
                        name={'description'}
                        // @ts-ignore
                        defaultValue={() => {
                            if (project) return project.description;
                            else if (task) return task.description;
                            else return null;
                        }}
                        onChange={handleChange} />
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant={'light'}
                        color={'danger'}
                        className={'text-black'}
                        onPress={() => onOpenChange(false)}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant={'light'}
                        color={'success'}
                        className={'text-black'}
                        onClick={(e) => {
                            sendData(e);
                        }}
                    >
                        Valider
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
// NoteWrapper.tsx
// Composant qui affiche les détails d'une note
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { NotesBreadCrumds } from "./NotesBreadCrumbs";
import { notesMiddleware } from "@/app/lib/actions/notes";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Textarea, ScrollShadow,
        Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, 
        ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, CircularProgress
        } from "@nextui-org/react";

// @ts-ignore
export function NoteWrapper(
    nid :
        {nid:
            {noteId: string}
        }
) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [note, setNote] = useState({title: '', description: '', task_id: ''});
    const router = useRouter();

    const id = nid.nid.noteId

    useEffect(() => {
        const getNote = async () => {
            const note = await notesMiddleware('getNote', {id: id});
            // @ts-ignore
            setNote(note);
        };
        getNote();
    }, []);

    const updateNote = (title: string, description: string) => {
        const updatedNote = notesMiddleware('update', {id: note.task_id, title: note.title, description: note.description});
    }

    const deleteNote = () => {
        const deletedNote = notesMiddleware('delete', {id: id});
    }

    return (
        <div>
                <div className="hidden md:block space-y-1">
                    <h1 className="text-2xl font-medium p-6">Notes</h1>
                </div>
                <Divider className="md:mb-4" />
                
            {note ? 
                (
                    <>
                        <NotesBreadCrumds ids={{note_title: note.title}}/>
                        <div className="relative md:pt-20 flex justify-center items-center">
                            <Card className={`w-full md:w-4/6 md:max-h-[300px]`}>
                            <CardHeader className="flex gap-3">
                            <div className="flex flex-col relative w-full">
                                <div className="flex items-center justify-between">
                                    <p className="text-xl pt-1 pl-3 w-full text-center ml-14 md:ml-0 md:text-left">{note.title}</p>
                                    <div className="ml-2 float-right pt-1 pr-3">
                                        <Dropdown>
                                            <DropdownTrigger>
                                            <Button variant="flat">
                                                <svg className="w-4 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="5" r="2" fill="currentColor"/>
                                                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                                                    <circle cx="12" cy="19" r="2" fill="currentColor"/>
                                                </svg>
                                            </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Static Actions">
                                                <DropdownItem onAction={onOpen} key="edit">Edit Note</DropdownItem>  
                                                <DropdownItem onAction={() =>{
                                                        deleteNote();
                                                        router.push('/dashboard/notes')
                                                    }}
                                                    key="delete" className="text-danger" color="danger">
                                                    Delete Note
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            </CardHeader>
                            <Divider/>
                            <CardBody>
                            <ScrollShadow className={`max-w-[700px] h-[300px]`}>
                                <p className="p-3">{note.description}</p>
                            </ScrollShadow>
                            </CardBody>
                            </Card>

                            <Modal 
                                isOpen={isOpen} 
                                onOpenChange={onOpenChange}
                            >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1 bg-gray-100 text-black">Edit Note</ModalHeader>
                                        <ModalBody>
                                            <Input
                                                autoFocus
                                                label="Title"
                                                defaultValue={note.title}
                                                variant="bordered"
                                                onChange={(e) => setNote(prevNote => ({ ...prevNote, title: e.target.value }))}
                                            />
                                            <Textarea
                                                label="Description"
                                                defaultValue={note.description}
                                                variant="bordered"
                                                onChange={(e) => setNote(prevNote => ({ ...prevNote, description: e.target.value }))}
                                            />
                                        </ModalBody>
                                        <ModalFooter className="bg-gray-100">
                                            <Button color="danger" variant="flat" onPress={() =>{
                                                    onClose();
                                                }}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" onPress={() => {
                                                    updateNote(note.title, note.description);
                                                    onClose();
                                                }}>
                                                Save
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                                </ModalContent>
                            </Modal>
                        </div>
                    </>
                )
            :(
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress size="lg" aria-label="Loading..." />
                </div>
            )}
            <Button
                className={'fixed bottom-4 right-4 md:hidden'}
                color="primary"
                onClick={() => router.push('/dashboard/notes')}
            >
                Retour
            </Button>
        </div>
    );
}
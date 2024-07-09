// noteCard.tsx
// Composant qui affiche une note
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState } from "react";
import { notesMiddleware } from "@/app/lib/actions/notes";
import {Textarea, ScrollShadow, Card, CardHeader, CardBody,
        Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, 
        ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Divider,
        Link
        } from "@nextui-org/react";

export function NoteCard({ note, reload }: { note: any, reload: () => void}): React.ReactNode {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [formData, setFormData] = useState({
        id: note.task_id,
        title: note.title,
        description: note.description
    });

    const updateNote = async () => {
        await notesMiddleware('update', formData);
    }

    const deleteNote = async () => {
        await notesMiddleware('delete', {id: note.task_id});
    }

    return (
    <div className="px-5 py-2">
        <Card className={`min-w-[325px] max-w-[325px] min-h-[200px] max-h-[200px] m-auto`}>
            <CardHeader className="flex">
                    <div className="flex flex-col relative w-full">
                        <div className="flex items-center justify-between">
                        <Link href={`/dashboard/notes/${note.task_id}`} color="foreground" className="text-lg">{note.title}</Link>
                            <div className="float-right pt-2 pr-1">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="flat" isIconOnly>
                                        <svg className="w-4 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="5" r="2" fill="currentColor"/>
                                            <circle cx="12" cy="12" r="2" fill="currentColor"/>
                                            <circle cx="12" cy="19" r="2" fill="currentColor"/>
                                        </svg>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem onPress={onOpen} key="edit">Edit Note</DropdownItem>  
                                    <DropdownItem onPress={() =>{
                                            deleteNote();
                                            reload();
                                        }} key="delete" className="text-danger" color="danger">
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
                <ScrollShadow className={`max-w-[400px] max-h-[200px]`}>
                    <p className="p-1">{note.description}</p>
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
                    <ModalHeader className="flex flex-col gap-1 bg-white text-black">Edit Note</ModalHeader>
                    <ModalBody className="bg-white text-black">
                        <Input
                            autoFocus
                            label="Title"
                            defaultValue={note.title}
                            variant="underlined"
                            name={'title'}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                        <Textarea
                            label="Description"
                            defaultValue={note.description}
                            variant="bordered"
                            name={'description'}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </ModalBody>
                    <ModalFooter className="bg-white text-black">
                        <Button color="danger" variant="flat" onPress={() => {
                                onClose();
                            }}>
                            Cancel
                        </Button>
                        <Button color="primary" 
                            onPress={() => {
                                updateNote();
                                reload();
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
    );
};
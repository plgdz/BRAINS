// newNote.tsx
// Composant qui permet de créer une nouvelle note
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState } from 'react';
import { notesMiddleware } from "@/app/lib/actions/notes";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Button, useDisclosure} from '@nextui-org/react';

export function NewNote( {reload}: {reload: () => void} ) : React.ReactNode {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const createNote = async () => {
        await notesMiddleware('create', {noteTitle: title, noteDescription: description});
    }

    return (
        <div className="w-full">
            <div className="flex justify-center mt-6">
                <Button variant="solid" color="primary" onPress={onOpen} className='p-6'>                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    <h1 className='text-xl'>Add Note</h1>
                </Button>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-white text-black">New Note</ModalHeader>
                            <ModalBody className="bg-white text-black">
                                <Input 
                                    autoFocus
                                    isRequired
                                    label="Title"
                                    variant='underlined'
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Textarea 
                                    label="Description"
                                    variant='bordered'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter className="bg-white text-black">
                                <Button variant="flat" color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={() =>{
                                        if(title){
                                            createNote();
                                            reload();
                                            onClose();
                                        }
                                    }}>
                                    Save Note
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
  )
}
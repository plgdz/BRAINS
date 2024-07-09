// newBudgetButton.tsx
// Composant qui permet de créer un nouveau budget
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState } from 'react';
import { budgetMiddleware } from "@/app/lib/actions/budget";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Button, useDisclosure, Chip, ScrollShadow} from '@nextui-org/react';

export function NewBudgetButton(
    {reload}: {reload: () => void}
) : React.ReactNode {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const createBudget = async () => {
        await budgetMiddleware('createBudget', { title: title, description: description });
    }

    return (
        <div className="w-full">
            <div className="flex justify-center mt-6">
                <Button variant="solid" color="primary" onPress={onOpen} className='rounded-full p-4 bg-primary text-white flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-white text-black">New Budget</ModalHeader>
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
                                            createBudget();
                                            reload();
                                            onClose();
                                        }
                                    }}>
                                    Save Budget
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
  )
}
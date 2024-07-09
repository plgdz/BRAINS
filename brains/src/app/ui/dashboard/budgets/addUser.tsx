// addUser.tsx
// Composant pour ajouter un utilisateur
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState, useEffect } from 'react';
import { userMiddleware } from "@/app/lib/actions/user";
import { UserIcon } from './userIcon';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button, useDisclosure} from '@nextui-org/react';

export function AddUser( {updateUsers}: {updateUsers: (usersId: any, usersCourriel: any) => void} ) : React.ReactNode {
    const [courriel, setCourriel] = useState('');
    const [onChange, setOnChange] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        const fetchUser = async () => {
            const formData = {courriel: courriel};
            // @ts-ignore
            const user = await userMiddleware('getUser', formData);
            if (user)
                // @ts-ignore
                updateUsers(user.user_id, user.pseudo);
        };
        fetchUser();
    }, [onChange, courriel]);

    const reloadUsers = () => {
        setOnChange(!onChange);
    }

    return (
        <div className="w-full">
            <Button color="default" variant="bordered" onClick={onOpen} startContent={<UserIcon/>}>
                Add contributor
            </Button> 

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-white text-black">Add User</ModalHeader>
                            <ModalBody className="bg-white text-black">
                                <Input 
                                    autoFocus
                                    isRequired
                                    label="Email"
                                    variant='underlined'
                                    onChange={(e) => setCourriel(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter className="bg-white text-black">
                                <Button variant="flat" color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={() =>{
                                    if (courriel) {
                                        reloadUsers();
                                        onClose();
                                    }
                                    }}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
  )
}
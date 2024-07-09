// profile.tsx
// Composant qui affiche le profil de l'utilisateur
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Divider, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { userMiddleware } from "@/app/lib/actions/user";
import '../../../../app/globals.css';

export default function ProfileComponent() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState({ pseudo: '', courriel: '' });
    const [formData, setFormData] = useState({ pseudo: '', courriel: '' });
    const [password, setPassword] = useState('');
    const [onChange, setOnChange] = useState(false);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    useEffect(() => {
        const getUser = async () => {
            const user = await userMiddleware('getUser', {});
            // @ts-ignore
            setUser(user);
            // @ts-ignore
            setFormData({ pseudo: user.pseudo, courriel: user.courriel });
        };
        const getPasswords = async () => {
            const passwords = await userMiddleware('getPasswords', {});
            // @ts-ignore
            setPassword(passwords[0].password);
        };

        getUser();
        getPasswords();
    }, [onChange]);

    const reloadPage = () => {
        setOnChange(!onChange);
    };

    const updateUser = async () => {
        const response = await userMiddleware('update', { pseudo: formData.pseudo, courriel: formData.courriel });
        reloadPage();
    };

    const updatePasswordHandler = async () => {
        if (newPassword === confirmPassword) {
            const response = await userMiddleware('updatePassword', { newPassword: newPassword, currentPassword: currentPassword });
            if(response){
                alert("Mot de passe changé avec succès");
            } else {
                alert("Mot de passe incorrect");
            }
        } else {
            alert("Les mots de passe ne correspondent pas");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl text-center mb-6">Edit Profile</h1>
                <form onSubmit={(e) => { e.preventDefault(); updateUser(); }}>
                    <div className="mb-4">
                        <label htmlFor="pseudo" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <Input id="pseudo" fullWidth placeholder="Enter your username" value={formData.pseudo} onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="courriel" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <Input id="courriel" type="email" fullWidth placeholder="Enter your email" value={formData.courriel} onChange={(e) => setFormData({ ...formData, courriel: e.target.value })} />
                    </div>
                    <Button type="submit" color="primary" fullWidth>Save Changes</Button>
                </form>
                <Divider className="my-6" />
                <Button onClick={onOpen} color="secondary" fullWidth>Change Password</Button>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 bg-white text-black">Change Password</ModalHeader>
                        <ModalBody className="bg-white text-black">
                            <Input
                                autoFocus
                                type="password"
                                label="Current Password"
                                variant="underlined"
                                name={'currentPassword'}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <Input
                                type="password"
                                label="New Password"
                                variant="underlined"
                                name={'newPassword'}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Input
                                type="password"
                                label="Confirm New Password"
                                variant="underlined"
                                name={'confirmPassword'}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter className="bg-white text-black">
                            <Button color="danger" onPress={() => {
                                onClose()
                            }}>Cancel</Button>
                            <Button color="primary" onPress={() => {
                                updatePasswordHandler();
                                onClose();
                            }}>Save</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
            </Modal>
        </div>
    );
}

// WorkoutCard.tsx
// Ce composant affiche les informations d'un entraînement.
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { CalendarDate, parseDate } from "@internationalized/date";

export function WorkoutCard({ workout, reload }: { workout: any, reload: () => void }): React.ReactNode {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({
        title: workout.title,
        date: workout.date,
    });

    return (
        <div className="bg-white rounded-lg shadow-md p-4 my-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="text-2xl text-gray-500"><FontAwesomeIcon icon={faPersonRunning} /></div>
                <div className="cursor-pointer">
                    <h3 onClick={onOpen} className="text-lg font-semibold">{formData.title}</h3>
                </div>
            </div>
            <div className="my-auto">
                <p className="text-sm text-gray-500">{formData.date.match(/^(.*\d{4})\s\d{2}:\d{2}:\d{2}\sGMT$/)[1]}</p>
            </div>
            <div className="pt-2 pr-1">
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-white text-black">Edit Event</ModalHeader>
                            <ModalBody className="bg-white text-black">
                                <Input
                                    autoFocus
                                    isRequired
                                    label="Title"
                                    defaultValue={workout.title}
                                    variant='underlined'
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                                <DateInput
                                    label={"Date"}
                                    isRequired
                                    defaultValue={parseDate(new Date(workout.date).toISOString().split('T')[0])}
                                    placeholderValue={new CalendarDate(1995, 11, 6)}
                                    onChange={(e) => {
                                        const dateObject = new Date(e.year, e.month - 1, e.day);
                                        setFormData({ ...formData, date: dateObject })
                                    }
                                    }
                                    labelPlacement='outside'
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

// newEventButton.tsx
// Composant qui permet de créer un nouvel événement
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState } from 'react';
import { calendarMiddleWare } from '@/app/lib/actions/calendar';
import {CalendarDate, getLocalTimeZone, parseDate} from "@internationalized/date";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button, useDisclosure, DatePicker} from '@nextui-org/react';

export function NewEventButton( {reload}: {reload: () => void}) : React.ReactNode {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const createEvent = async () => {
        await calendarMiddleWare('createEvent', {title: title, date: date, type: 'event'});
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
                            <ModalHeader className="flex flex-col gap-1 bg-white text-black">New Event</ModalHeader>
                            <ModalBody className="bg-white text-black">
                                <Input 
                                    autoFocus
                                    isRequired
                                    label="Title"
                                    variant='underlined'
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <DatePicker 
                                    label={"Date"} 
                                    isRequired
                                    defaultValue={parseDate(new Date().toISOString().split('T')[0])}
                                    placeholderValue={new CalendarDate(1995, 11, 6)} 
                                    onChange={(e) => {
                                        const dateObject = e.toDate(getLocalTimeZone());
                                        setDate(dateObject);
                                    }}
                                    labelPlacement='outside'
                                />
                            </ModalBody>
                            <ModalFooter className="bg-white text-black">
                                <Button variant="flat" color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={() =>{
                                        if(title && date){
                                            createEvent();
                                            reload();
                                            onClose();
                                        }
                                    }}>
                                    Save Event
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
  )
}
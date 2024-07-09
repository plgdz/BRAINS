// EventCard.tsx
// Composant qui affiche les détails d'un événement
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { Button, DateInput, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { CalendarDate, parseDate } from "@internationalized/date";
import { calendarMiddleWare } from '@/app/lib/actions/calendar';

export function EventCard({ event, reload }: { event: any, reload: () => void}): React.ReactNode {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [formData, setFormData] = useState({
    eventId: event.event_id,
    title: event.title,
    date: event.date,
  });

  const updateEvent = async () => {
    await calendarMiddleWare('updateEvent', formData);
  }

  const deleteEvent = async () => {
    console.log(formData.eventId)
    await calendarMiddleWare('deleteEvent', {eventId: formData.eventId});
  } 

  return (
<div onClick={onOpen} className="bg-white rounded-lg shadow-md px-3 py-1 my-2 flex items-center justify-between hover:cursor-pointer">
    <div className="flex items-center space-x-4">
        {event.reference_id &&(
            <div className="text-2xl text-gray-500"><FontAwesomeIcon icon={faBarsProgress} /></div>
        )}
        <div>
            <h3 className="text-lg font-semibold">{formData.title}</h3>
        </div>
    </div>
    <div className="my-auto">
      <p className="text-sm text-gray-500">{formData.date.match(/^(.*\d{4})\s\d{2}:\d{2}:\d{2}\sGMT$/)[1]}</p>
    </div>
    <div className="pt-2 pr-1">
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
                <DropdownItem onPress={onOpen} key="edit">Edit Event</DropdownItem>  
                <DropdownItem onPress={() => {
                    deleteEvent();
                    reload();
                }} key="delete" className="text-danger" color="danger">
                    Delete Event
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
      <Modal 
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={() => onOpenChange()}
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
                        defaultValue={event.title}
                        variant='underlined'
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    /> 
                    <DateInput 
                        label={"Date"} 
                        isRequired
                        defaultValue={parseDate(new Date(event.date).toISOString().split('T')[0])}
                        placeholderValue={new CalendarDate(1995, 11, 6)} 
                        onChange={(e) => {
                            const dateObject = new Date(e.year, e.month - 1, e.day);
                            setFormData({...formData, date: dateObject})}
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
                                updateEvent();
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

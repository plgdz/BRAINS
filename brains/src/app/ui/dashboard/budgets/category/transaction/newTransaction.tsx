// newTransaction.tsx
// Composant pour ajouter une nouvelle transaction
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState } from 'react';
import { budgetMiddleware } from "@/app/lib/actions/budget";
import { CalendarDate, parseDate } from "@internationalized/date";
import { Modal, DateInput, ModalContent, Textarea, ModalHeader, ModalBody, ModalFooter, Input, Select, Button, useDisclosure, SelectItem, Checkbox, DatePicker } from '@nextui-org/react';

export function NewTransaction({ category_id, budget_id, reload }: { category_id: any, budget_id: any, reload: () => void }): React.ReactNode {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [value, setValue] = React.useState('daily');
    const [recurring, setRecurring] = React.useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const timeFrame = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Biweekly', label: 'Bi-Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Yearly', label: 'Yearly' },
    ];

    const createTransaction = async () => {
        budgetMiddleware('createTransaction', {
            title: capitalizeWord(title),
            amount: Number(amount).toFixed(2),
            date: date,
            categoryId: category_id,
            budgetId: budget_id,
            is_recurring: recurring,
            recuring_period: value
        });
        await budgetMiddleware('updateCategoryAmount', { categoryId: category_id, amount: Number(amount).toFixed(2) });
    }

    function capitalizeWord(word: string) {
        return word
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div className="w-full">
            <div className="flex justify-center mt-6">
                <Button variant="solid" color="primary" onPress={onOpen} className='p-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    <h1 className='text-xl'>Add Transaction</h1>
                </Button>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-white text-black">New Transaction</ModalHeader>
                            <ModalBody className="bg-white text-black">
                                <Input
                                    autoFocus
                                    isRequired
                                    label="Title"
                                    variant='underlined'
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Input
                                    label="Amount"
                                    placeholder="0.00"
                                    labelPlacement="outside"
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                    endContent={
                                        <div className="flex items-center">
                                            <label className="sr-only" htmlFor="currency">
                                                Currency
                                            </label>
                                            <select
                                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                                id="currency"
                                                name="currency"
                                            >
                                                <option>CAD</option>
                                                <option>USD</option>
                                                <option>EUR</option>
                                            </select>
                                        </div>
                                    }
                                    type="number"
                                    isRequired
                                    onChange={(e) => setAmount(parseFloat(e.target.value).toFixed(2))}
                                />
                                <DatePicker
                                    label={"Date"}
                                    isRequired
                                    className='header'
                                    defaultValue={parseDate(new Date().toISOString().split('T')[0])}
                                    placeholderValue={new CalendarDate(1995, 11, 6)}
                                    onChange={(e) => {
                                        const dateObject = new Date(e.year, e.month - 1, e.day + 1);
                                        setDate(dateObject);
                                    }}
                                    labelPlacement='outside'
                                />
                                <Checkbox isSelected={recurring} onValueChange={setRecurring}>
                                    Recurring
                                </Checkbox>
                                {recurring && (
                                    <Select
                                        label="Cycle"
                                        variant="bordered"
                                        placeholder="Select a cycle"
                                        className="max-w-xs"
                                        // @ts-ignore
                                        onSelectionChange={(e) => (setValue(e.currentKey))}
                                    >
                                        {timeFrame.map((time) => (
                                            <SelectItem key={time.value} value={time.value}>
                                                {time.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            </ModalBody>
                            <ModalFooter className="bg-white text-black">
                                <Button variant="flat" color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={() => {
                                    if (title && amount && date) {
                                        createTransaction();
                                        reload();
                                        onClose();
                                    }
                                }}>
                                    Save Transaction
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
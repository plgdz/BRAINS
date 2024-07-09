// TransactionCard.tsx
// Composant pour afficher une transaction
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Button, Checkbox, DateInput, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Select, SelectItem, Textarea, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { CalendarDate, parseDate } from "@internationalized/date";
import { budgetMiddleware } from '@/app/lib/actions/budget';

export function TransactionCard({ transaction, reload }: { transaction: any, reload: () => void }): React.ReactNode {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({
        transactionId: transaction.transaction_id,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        is_recurring: transaction.is_recurring,
        recuring_period: transaction.recuring_period
    });

    const timeFrame = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Bi-weekly', label: 'Bi-Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Yearly', label: 'Yearly' },
    ];

    const updateTransaction = async () => {
        await budgetMiddleware('updateTransaction', formData);
    }

    const deleteTransaction = async () => {
        await budgetMiddleware('updateCategoryAmount', { categoryId: transaction.category_id, amount: -transaction.amount });
        await budgetMiddleware('deleteTransaction', { transactionId: formData.transactionId });
    }

    return (
        <div onClick={onOpen} className="bg-white rounded-lg shadow-md px-3 py-1 my-2 flex items-center justify-between hover:cursor-pointer">
            <div className="flex items-center space-x-4">
                <div className="text-2xl text-gray-500"><FontAwesomeIcon icon={faShoppingBag} /></div>
                <div>
                    <h3 className="text-lg font-semibold">{formData.title}</h3>
                </div>
            </div>
            <div className="my-auto">
                <p className="text-lg">{formData.amount}$</p>
            </div>
            <div className="my-auto">
                <p className="text-sm text-gray-500">{formData.date.toString().match(/^(.*\d{4})\s\d{2}:\d{2}:\d{2}/)[1]}</p>
            </div>
            <div className="pt-2 pr-1">
                <Dropdown className={'z-10'}>
                    <DropdownTrigger>
                        <Button variant="flat" isIconOnly className={'z-10'}>
                            <svg className="w-4 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="5" r="2" fill="currentColor" />
                                <circle cx="12" cy="12" r="2" fill="currentColor" />
                                <circle cx="12" cy="19" r="2" fill="currentColor" />
                            </svg>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem onPress={onOpen} key="edit">Edit Transaction</DropdownItem>
                        <DropdownItem onPress={() => {
                            deleteTransaction();
                            reload();
                        }} key="delete" className="text-danger" color="danger">
                            Delete Transaction
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-white text-black">Edit Transaction</ModalHeader>
                            <ModalBody className="bg-white text-black">
                                <Input
                                    autoFocus
                                    isRequired
                                    label="Title"
                                    defaultValue={transaction.title}
                                    variant='underlined'
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                                <option>USD</option>
                                                <option>CAD</option>
                                                <option>EUR</option>
                                            </select>
                                        </div>
                                    }
                                    type="number"
                                    isRequired
                                    defaultValue={transaction.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value).toFixed(2) })}
                                />
                                <DateInput
                                    label={"Date"}
                                    isRequired
                                    defaultValue={parseDate(new Date(transaction.date).toISOString().split('T')[0])}
                                    placeholderValue={new CalendarDate(1995, 11, 6)}
                                    onChange={(e) => {
                                        const dateObject = new Date(e.year, e.month - 1, e.day);
                                        setFormData({ ...formData, date: dateObject })
                                    }
                                    }
                                    labelPlacement='outside'
                                />
                                <Checkbox isSelected={formData.is_recurring} onValueChange={(e) => setFormData({ ...formData, is_recurring: e })}>
                                    Recurring
                                </Checkbox>
                                {formData.is_recurring && (
                                    <Select
                                        label="Cycle"
                                        isRequired
                                        variant="bordered"
                                        placeholder="Select a cycle"
                                        defaultSelectedKeys={[transaction.reccuring_period]}
                                        className="max-w-xs"
                                        // @ts-ignore
                                        onSelectionChange={(e) => setFormData({ ...formData, recuring_period: (e.currentKey) })}
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
                                <Button color="danger" variant="flat" onPress={() => {
                                    onClose();
                                }}>
                                    Cancel
                                </Button>
                                <Button color="primary"
                                    onPress={() => {
                                        updateTransaction();
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

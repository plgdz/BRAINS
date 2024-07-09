// CategoryCard.tsx
// Composant pour afficher une catégorie
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { budgetMiddleware } from '@/app/lib/actions/budget';
import {
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent,
    ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Link, Checkbox
} from "@nextui-org/react";

export function CategoryCard({ category, reload, amount, budgetId, text }: { category: any, reload: () => void, amount: any, budgetId: any, text: string }): React.ReactNode {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({
        categoryId: category.category_id,
        title: category.title,
        is_income: category.is_income
    });

    const updateCategory = async () => {
        await budgetMiddleware('updateCategory', formData);
    }

    const deleteCategory = async () => {
        await budgetMiddleware('deleteCategory', { categoryId: formData.categoryId });
    }



    return (
        <div onClick={() => router.push(`/dashboard/budgets/${budgetId}/${category.category_id}`)} className="relative bg-white rounded-lg shadow-md overflow-hidden my-2 flex items-center justify-between p-4 w-full cursor-pointer">
            {category.title}
            <p className="text-md">{text}: ${amount}</p>
            <div className="float-right pt-2 pr-1">
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="flat" isIconOnly>
                            <svg className="w-4 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="5" r="2" fill="currentColor" />
                                <circle cx="12" cy="12" r="2" fill="currentColor" />
                                <circle cx="12" cy="19" r="2" fill="currentColor" />
                            </svg>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem onPress={onOpen} key="edit">Edit Category</DropdownItem>
                        <DropdownItem onPress={() => {
                            deleteCategory();
                            reload();
                        }} key="delete" className="text-danger" color="danger">
                            Delete Category
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
                            <ModalHeader className="flex flex-col gap-1 bg-white text-black">Edit Category</ModalHeader>
                            <ModalBody className="bg-white text-black">
                                <Input
                                    autoFocus
                                    label="Title"
                                    defaultValue={category.title}
                                    variant="underlined"
                                    name={'title'}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                                <Checkbox isSelected={formData.is_income} onValueChange={(e) => setFormData({ ...formData, is_income: e })}>
                                    Income
                                </Checkbox>
                            </ModalBody>
                            <ModalFooter className="bg-white text-black">
                                <Button color="danger" variant="flat" onPress={() => {
                                    onClose();
                                }}>
                                    Cancel
                                </Button>
                                <Button color="primary"
                                    onPress={() => {
                                        updateCategory();
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

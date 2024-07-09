// newCategory.tsx
// Composant pour ajouter une nouvelle catégorie
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState } from "react";
import { budgetMiddleware } from "@/app/lib/actions/budget";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";

export function NewCategory({
  budget_id,
  reload,
}: {
  budget_id: string;
  reload: () => void;
}): React.ReactNode {
  const [title, setTitle] = useState("");
  const [is_income, setIsIncome] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const createCategory = async () => {
    await budgetMiddleware("createCategory", {
      title: capitalizeWord(title),
      budgetId: budget_id,
      is_income: is_income,
    });
  };

  function capitalizeWord(word: string) {
    return word
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="w-full z-20">
      <div className="flex justify-center mt-6">
        <Button
          variant="solid"
          color="primary"
          onPress={onOpen}
          className="p-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <h1 className="text-xl">Add Category</h1>
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-white text-black">
                New Category
              </ModalHeader>
              <ModalBody className="bg-white text-black">
                <Input
                  autoFocus
                  isRequired
                  label="Title"
                  variant="underlined"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Checkbox isSelected={is_income} onValueChange={setIsIncome}>
                  Income
                </Checkbox>
              </ModalBody>
              <ModalFooter className="bg-white text-black">
                <Button variant="flat" color="danger" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (title) {
                      createCategory();
                      reload();
                      onClose();
                    }
                  }}
                >
                  Save Category
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

// BudgetCard.tsx
// Composant pour afficher une carte de budget
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { budgetMiddleware } from "@/app/lib/actions/budget";
import {
  ScrollShadow,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
} from "@nextui-org/react";

export function BudgetCard({
  budget,
  reload,
}: {
  budget: any;
  reload: () => void;
}): React.ReactNode {
  const [formData, setFormData] = useState({
    id: budget.budget_id,
    title: budget.title,
    description: budget.description,
  });

  const deletebudget = async () => {
    await budgetMiddleware("deleteBudget", { id: budget.budget_id });
  };

  const router = useRouter();

  return (
    <div className="px-5 py-2">
      <Card
        className={
          "min-w-[325px] max-w-[325px] min-h-[200px] max-h-[200px] m-auto"
        }
        isPressable
        onPress={() => router.push(`/dashboard/budgets/${budget.budget_id}`)}
      >
        <CardHeader className="flex">
          <div className="flex flex-col relative w-full">
            <div className="flex items-center justify-between">
              {budget.title}
              <div className="float-right pt-2 pr-1">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat" isIconOnly>
                      <svg
                        className="w-4 h-12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="5" r="2" fill="currentColor" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                        <circle cx="12" cy="19" r="2" fill="currentColor" />
                      </svg>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      onPress={() => {
                        deletebudget();
                        reload();
                      }}
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete budget
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <ScrollShadow className={`max-w-[400px] max-h-[200px]`}>
            <p className="p-1">{budget.description}</p>
          </ScrollShadow>
        </CardBody>
      </Card>
    </div>
  );
}

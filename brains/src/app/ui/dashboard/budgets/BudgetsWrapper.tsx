// BudgetsWrapper.tsx
// Composant qui affiche les budgets de l'utilisateur
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState, useEffect } from 'react';
import { budgetMiddleware } from '@/app/lib/actions/budget';
import { BudgetCard } from './BudgetCard';
import { NewBudget } from './newBudget';
import { NewBudgetButton } from './newBudgetButton';
import { CircularProgress, Divider } from "@nextui-org/react";

export default function BudgetsDisplay() {
    const [budgets, setBudgets] = useState([]);
    const [onChange, setOnChange] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBudgets = async () => {
            setLoading(true);
            const budgets = await budgetMiddleware('getBudgets', {});
            // @ts-ignore
            setBudgets(budgets);
            setLoading(false);
        };

        fetchBudgets();
    }, [onChange]);

    const reloadBudgets = () => {
        console.log('Reloading budgets');
        setOnChange(!onChange);
    }

    return (
        <>
            <div className='max-w-md full-w scrollable-div'>
                <div className="space-y-1 fixed bg-white shadow-md z-30 w-full">
                    <h1 className="text-3xl font-medium p-6 text-center md:text-left">Budgets</h1>
                </div>
                <Divider className="mb-4" />
                {loading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <CircularProgress />
                    </div>
                ) : (
                    budgets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-screen">
                            <h1 className="text-2xl font-bold">Aucun budget trouvé</h1>
                            <NewBudgetButton reload={reloadBudgets} />
                        </div>
                    ) : (
                        <div className='grid grid-flow-col gap-4 pt-24 justify-start'>
                            {budgets
                                .sort((a: any, b: any) => a.budget_id - b.budget_id)
                                .reverse()
                                .map((budget: any) => (
                                    <BudgetCard key={budget.budget_id} reload={reloadBudgets} budget={budget} />
                                ))}
                        </div>
                    )
                )}
            </div>
            <div className="fixed bottom-0 right-0 p-6">
                <NewBudget reload={reloadBudgets} />
            </div>
        </>
    );    
}

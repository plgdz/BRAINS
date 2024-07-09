// page.tsx
// Page principale des budgets
// Auteurs : Paul Agudze, Thomas Garneau

"use client";
import BudgetWrapper from '@/app/ui/dashboard/budgets/BudgetWrapper';
import React from 'react';

export default function Budget({ params }: { params: any }): React.ReactNode {
    return (
        <BudgetWrapper bid={params}/>
    )
}
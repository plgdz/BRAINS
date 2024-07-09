// page.tsx
// Page principale des categories
// Auteurs : Paul Agudze, Thomas Garneau

"use client";
import CategoryWrapper from '@/app/ui/dashboard/budgets/category/CategoryWrapper';
import React from 'react';

export default function Category({ params }: { params: any }): React.ReactNode {
    return (
        <CategoryWrapper cid={params}/>
    )
}
// CategoryBreadCrumbs.tsx
// Composant pour afficher les breadcrumbs d'une catégorie
// Auteurs : Paul Agudze, Thomas Garneau

'use client'

import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/breadcrumbs";
import React from "react";

export function CategoryBreadCrumds( props: any ) {
    return (
        <div className={'w-full m-2.5'}>
            <Breadcrumbs size={'md'} variant={'solid'}>
                <BreadcrumbItem
                    key={0}
                    href={`/dashboard/budgets`}
                >Budgets
                </BreadcrumbItem>
                <BreadcrumbItem
                    key={1}
                    href={`/dashboard/budgets/${props.ids.budget_id}`}
                >Budget
                </BreadcrumbItem>
                <BreadcrumbItem
                    key={1}
                    href={`/dashboard/budgets/${props.ids.budget_id}/${props.ids.category_id}`}
                >{props.ids.category_title}
                </BreadcrumbItem>
            </Breadcrumbs>
        </div>
    );
}
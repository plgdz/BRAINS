//budget.ts
// Ce fichier contient les fonctions qui permettent de récupérer et de mettre à jour les informations des budgets.
// Auteur : Paul Agudze, Thomas Garneau

'use server';
import { auth } from "@/auth";
import { createBudget, deleteBudget, updateBudget, getBudget, getBudgets, 
        createCategory, deleteCategory, updateCategory, updateCategoryAmount, getCategory, getCategories, 
        createTransaction, deleteTransaction, updateTransaction, getTransaction, getTransactions, getTransactionsByBudget
        } from "@/app/lib/db/budget";

export async function budgetMiddleware(
    method: string,
    formData: {
        id?: string,
        budgetId?: string | number,
        categoryId?: string,
        transactionId?: string,
        amount?: number | string,
        date?: Date,
        title?: string,
        description?: string,
        users?: number[],
        is_recurring?: boolean,
        recuring_period?: string,
        is_income?: boolean,
    }
) {
    const session = await auth();
    if (!session) {
        throw new Error('Unauthorized');
    }
    switch (method) {
        case 'createBudget':
            // @ts-ignore
            return createBudget(session.user.id, formData);
        case 'deleteBudget':
            // @ts-ignore
            return await deleteBudget(session.user.id, formData);
        case 'updateBudget':
            // @ts-ignore
            return updateBudget(session.user.id, formData);
        case 'getBudget':
            // @ts-ignore
            return getBudget(session.user.id, formData);
        case 'getBudgets':
            // @ts-ignore
            return getBudgets(session.user.id, formData);
        case 'createCategory':
            // @ts-ignore
            return createCategory(session.user.id, formData);
        case 'deleteCategory':
            // @ts-ignore
            return await deleteCategory(session.user.id, formData);
        case 'updateCategory':
            // @ts-ignore
            return updateCategory(session.user.id, formData);
        case 'updateCategoryAmount':
            // @ts-ignore
            return updateCategoryAmount(session.user.id, formData);
        case 'getCategory':
            // @ts-ignore
            return getCategory(session.user.id, formData);
        case 'getCategories':
            // @ts-ignore
            return getCategories(session.user.id, formData);
        case 'createTransaction':
            // @ts-ignore
            return createTransaction(session.user.id, formData);
        case 'deleteTransaction':
            // @ts-ignore
            return await deleteTransaction(session.user.id, formData);
        case 'updateTransaction':
            // @ts-ignore
            return updateTransaction(session.user.id, formData);
        case 'getTransaction':
            // @ts-ignore
            return getTransaction(session.user.id, formData);
        case 'getTransactions':
            // @ts-ignore
            return getTransactions(session.user.id, formData);
        case 'getTransactionsByBudget':
            // @ts-ignore
            return getTransactionsByBudget(session.user.id, formData);
        default:
            throw new Error('Invalid method');
    }
}


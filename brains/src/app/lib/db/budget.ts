// db/budget.ts
// Ce fichier contient les fonctions qui permettent de créer, modifier, supprimer et récupérer des budgets dans la base de donnees.
// Auteur : Paul Agudze, Thomas Garneau

import pool from '@/app/lib/db/db';

export async function createBudget(
    userId: string,
    formData: { title: string, description: string, users: number[]},
) {
    try {
        const result = await pool.budgets.create({
            data: {
                users: formData.users,
                title: formData.title,
                description: formData.description,
                user_id: Number(userId),
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateBudget(
    userId: string,
    formData: { id: string, title: string, description: string },
) {
    try {
        const result = await pool.budgets.update({
            where: {
                budget_id: Number(formData.id),
            },
            data: {
                title: formData.title,
                description: formData.description,
            }
        });  
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteBudget(
    userId: string,
    formData: { id: string },
) {
    try {
        const result = await pool.budgets.delete({
            where: {
                budget_id: Number(formData.id),
            }
        });  
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getBudget(
    userId: string,
    formData: { id: string},
) {
    try {
        const result = await pool.budgets.findUnique({
            where: {
                user_id: Number(userId),
                budget_id: Number(formData.id),
            }
        });   
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getBudgets(
    userId: string,
    formData: FormData,
) {
    try {
        const result = await pool.budgets.findMany({
            where: {
                user_id: Number(userId),
            }
        });  
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Categories
export async function createCategory(
    userId: string,
    formData: { budgetId: string, title: string, is_income: boolean},
) {
    try {
        const result = await pool.category.create({
            data: {
                budget_id: Number(formData.budgetId),
                title: formData.title,
                is_income: formData.is_income,
                amount: 0
            }
        });   
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateCategory(
    userId: string,
    formData: { categoryId: string, title: string, is_income: boolean},
) {
    try {
        const result = await pool.category.update({
            where: {
                category_id: Number(formData.categoryId),
            },
            data: {
                title: formData.title,
                is_income: formData.is_income
            }
        });  
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateCategoryAmount(
    userId: string,
    formData: { categoryId: string, amount: number },
) {
    try {
        // Fetch the current amount
        const currentCategory = await pool.category.findUnique({
            where: {
                category_id: Number(formData.categoryId),
            },
            select: {
                amount: true,
            },
        });

        if (!currentCategory) {
            throw new Error(`Category with ID ${formData.categoryId} not found`);
        }

        // Calculate the new amount
        const newAmount = Number(currentCategory.amount) + Number(formData.amount);

        // Update the category with the new amount
        const result = await pool.category.update({
            where: {
                category_id: Number(formData.categoryId),
            },
            data: {
                amount: newAmount,
            },
        });

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function deleteCategory(
    userId: string,
    formData: { categoryId: string},
) {
    try {
        const result = await pool.category.delete({
            where: {
                category_id: Number(formData.categoryId),
            }
        });    
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCategory(
    userId: string,
    formData: { budgetId: string ,categoryId: string },
) {
    try {
        const result = await pool.category.findUnique({
            where: {
                budget_id: Number(formData.budgetId),
                category_id: Number(formData.categoryId),
            }
        });  
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCategories(
    userId: string,
    formData: { budgetId: string},
) {
    try {
        const result = await pool.category.findMany({
            where: {
                budget_id: Number(formData.budgetId),
            }
        });    
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Transactions
export async function createTransaction(
    userId: string,
    formData: { budgetId: string, categoryId: string, title: string, amount: number, date: string, is_recurring: boolean, recuring_period: string},
) {
    try {
        const result = await pool.transactions.create({
            data: {
                category_id: Number(formData.categoryId),
                budget_id: Number(formData.budgetId),
                title: formData.title,
                amount: formData.amount,
                date: formData.date,
                is_recurring: formData.is_recurring,
                recuring_period: formData.recuring_period,
                user_id: Number(userId)
            }
        });     
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateTransaction(
    userId: string,
    formData: { transactionId: string, title: string, description: string, amount: number, date: Date, is_recurring: boolean, recuring_period: string},
) {
    try {
        const result = await pool.transactions.update({
            where: {
                transaction_id: Number(formData.transactionId),
            },
            data: {
                title: formData.title,
                amount: formData.amount,
                date: formData.date,
                is_recurring: formData.is_recurring,
                recuring_period: formData.recuring_period
            }
        });       
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteTransaction(
    userId: string,
    formData: { transactionId: string},
) {
    try {
        const result = await pool.transactions.delete({
            where: {
                transaction_id: Number(formData.transactionId),
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTransaction(
    userId: string,
    formData: { transactionId: string},
) {
    try {
        const result = await pool.transactions.findUnique({
            where: {
                transaction_id: Number(formData.transactionId),
            }
        });  
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTransactions(
    userId: string,
    formData: { budgetId: string, categoryId: string},
) {
    try {
        const result = await pool.transactions.findMany({
            where: {
                budget_id: Number(formData.budgetId),
                category_id: Number(formData.categoryId),
            }
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTransactionsByBudget(
    userId: string,
    formData: { budgetId: string},
) {
    try {
        const result = await pool.transactions.findMany({
            where: {
                budget_id: Number(formData.budgetId),
            }
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

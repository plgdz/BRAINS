// BudgetWrapper.tsx
// Composant qui affiche les détails d'un budget
// Auteurs : Paul Agudze, Thomas Garneau

import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { TransactionCard } from './category/transaction/TransactionCard';
import { NewCategory } from '@/app/ui/dashboard/budgets/category/newCategory';
import { CategoryCard } from '@/app/ui/dashboard/budgets/category/CategoryCard';
import { Divider } from "@nextui-org/react";
import { budgetMiddleware } from '@/app/lib/actions/budget';
import {Button} from "@nextui-org/button";


export default function BudgetWrapper(bid: any) {
  const [onChange, setOnChange] = useState(false);
  const [budget, setBudget] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categoryEmpty, setCategoryEmpty] = useState(true)

  const budget_id = bid.bid.budgetId;

  useEffect(() => {
    const fetchBudget = async () => {
      const budget = await budgetMiddleware('getBudget', { id: budget_id });
      // @ts-ignore
      setBudget(budget);
    }

    const fetchCategories = async () => {
      const categories = await budgetMiddleware('getCategories', { budgetId: budget_id });
      // @ts-ignore
      setCategories(categories);
      // @ts-ignore
      if (categories.length > 0) setCategoryEmpty(false)
      else setCategoryEmpty(true)
    };

    const fetchTransactions = async () => {
      const transactions = await budgetMiddleware('getTransactionsByBudget', { budgetId: budget_id});
      // @ts-ignore
      setTransactions(transactions);
    };

    fetchBudget();
    fetchCategories();
    fetchTransactions();
  }, [onChange]);

  const reloadPage = () => {
    setOnChange(!onChange);
  }

  const totalExpenses = categories 
    ? categories
        .filter(category => (category as any).is_income === false)
        .reduce((acc, category) => {
          if ((category as any) && (category as any).amount) {
            return acc + parseFloat((category as any).amount.toString());
          } else {
            return acc;
          }
        }, 0)
        .toFixed(2) 
    : 0;
  
  return (
    <div className="scrollable-div">
      <div className="space-y-1 fixed bg-white shadow-md z-30 w-full">
      <h1 className="text-3xl font-medium p-6 text-center md:text-left">{(budget as any).title}</h1>
      <Divider />
      </div>
      <div className="flex flex-col lg:flex-row min-h-screen lg:space-y-0 pt-24">
        <div className="lg:w-3/5">
          <h1 className="text-2xl md:text-4xl font-bold text-black p-6">Total Expenses: ${totalExpenses}</h1>
          <div className="flex items-center justify-center space-x-10">
            {categories && categories.length > 0 && (
              <PieChart
                series={[
                  {
                    data: categories
                    .filter((category : any) => category.is_income == false)
                    .map((category: any) => ({
                      id: category.category_id,
                      value: category.amount,
                      label: category.title
                    })),                    
                    cx: window.innerWidth > 800 ? 300 : window.innerWidth / 2,
                    cy: 200,
                    innerRadius: window.innerWidth > 800 ? 80 : 60,
                    outerRadius: window.innerWidth > 800 ? 200 : 160,
                  },
                ]}
                height={500}
                slotProps={{
                  legend: { hidden: true },
                }}
              ></PieChart>
            )}
          </div>
          <div className="lg:w-full p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Planned Transactions</h2>
              <Divider />
            </div>
            <div className="grid gap-4">
              {transactions ? transactions
                .filter((transaction: any) => transaction.is_recurring)
                .map((transaction, index) => (
                  <TransactionCard key={index} transaction={transaction} reload={reloadPage}/>))
                    :
                  (<NewCategory budget_id={bid.bid.budgetId} reload={reloadPage} />)
              }
            </div>
          </div>
        </div>
        <div className='lg:w-2/5'>
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Expenses</h2>
              <Divider />
            </div>
            <div className="grid gap-4">
              {categories.length > 0 ?
                categories
                  .filter((category: any) => category.is_income == false)
                  .sort((a: any, b: any) => a.id - b.id)
                  .map((category: any, index) =>
                    category && category.title ? (
                      <CategoryCard
                        key={index}
                        category={category}
                        budgetId={bid.bid.budgetId}
                        amount={category.amount ? category.amount : 0}
                        reload={reloadPage}
                        text="Spent"
                      />
                    ) : null
                  ) :
                  (<NewCategory budget_id={bid.bid.budgetId} reload={reloadPage} />)
              }
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Income</h2>
              <Divider />
            </div>
            <div className="grid gap-4">
              {categories.length > 0 ?
                categories
                  .filter((category: any) => category.is_income == true)
                  .sort((a: any, b: any) => a.id - b.id)
                  .map((category: any, index) =>
                    category && category.title ? (
                      <CategoryCard
                        key={index}
                        category={category}
                        budgetId={bid.bid.budgetId}
                        amount={category.amount ? category.amount : 0}
                        reload={reloadPage}
                        text="Earned"
                      />
                    ) : null
                  ) :
                (<NewCategory budget_id={bid.bid.budgetId} reload={reloadPage} />)
              }
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 right-0 p-6">
          {!categoryEmpty ?
            <NewCategory budget_id={bid.bid.budgetId} reload={reloadPage} />
              : null
          }
        </div>
      </div>
    </div>
  );  
}

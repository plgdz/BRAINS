// CategoryWrapper.tsx
// Composant pour afficher les transactions d'une catégorie
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import React, { useState, useEffect } from "react";
import { TransactionCard } from "./transaction/TransactionCard";
import { NewTransaction } from "./transaction/newTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { CategoryBreadCrumds } from "./CategoryBreadCrumbs";
import { Button, Input, Divider } from "@nextui-org/react";
import { budgetMiddleware } from "@/app/lib/actions/budget";

export default function CategoryWrapper(cid: any) {
  const [onChange, setOnChange] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState({});
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const category_id = cid.cid.categoryId;
  const budget_id = cid.cid.budgetId;

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await budgetMiddleware("getTransactions", {
        categoryId: category_id,
        budgetId: budget_id,
      });
      // @ts-ignore
      setTransactions(transactions);
    };

    const fetchCategory = async () => {
      const category = await budgetMiddleware("getCategory", {
        categoryId: category_id,
        budgetId: budget_id,
      });
      // @ts-ignore
      setCategory(category);
    };

    fetchCategory();
    fetchTransactions();
  }, [onChange]);

  const reloadPage = () => {
    setOnChange(!onChange);
  };

  useEffect(() => {
    const getCurrentMonthTransactions = (allTransactions: any) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      return allTransactions.filter((transaction: any) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      });
    };

    const filterTransactions = () => {
      const relevantTransactions = showAll
        ? transactions
        : getCurrentMonthTransactions(transactions);
      if (!search) {
        setFilteredTransactions(relevantTransactions);
        return;
      }
      const searchLower = search.toLowerCase();
      const filtered = relevantTransactions.filter(
        (transaction: any) =>
          transaction.title.toLowerCase().includes(searchLower) ||
          transaction.date.toLocaleDateString().includes(search)
      );
      setFilteredTransactions(filtered);
    };

    filterTransactions();
  }, [search, transactions, showAll]);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };
  return (
    <>
      <div className="space-y-1 fixed bg-white shadow-md z-30 w-full">
        <h1 className="text-3xl font-medium p-6 text-center md:text-left">
          {(category as { title: string }).title}
        </h1>
        <Divider />
      </div>
      <div className="flex flex-col lg:flex-row min-h-screen lg:space-y-0 scrollable-div pt-24">
        <div className="lg:w-3/5">
          <CategoryBreadCrumds
            ids={{
              category_title: (category as { title: string }).title,
              budget_id: budget_id,
              category_id: category_id,
            }}
          />
          <div className="lg:w-full p-6">
            <div className="mb-4">
              <div className="mb-4 items-center justify-between flex-row md:flex">
                <h2 className="text-xl font-bold">This Month</h2>
                <Input
                  label="Search Transaction"
                  isClearable
                  radius="lg"
                  className="w-64 mt-4 md:mt-0"
                  placeholder="Type to search..."
                  startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Divider />
            </div>
            <div className="grid gap-4">
              {(filteredTransactions as { date: Date }[]) &&
                (filteredTransactions as { date: Date }[])
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((transaction: any, index) => (
                    <TransactionCard
                      key={transaction.transaction_id}
                      transaction={transaction}
                      reload={reloadPage}
                    />
                  ))}
            </div>
            <div className="flex justify-center mt-4">
              <Button onClick={toggleShowAll} className="mx-auto">
                {showAll
                  ? "Show Current Month Transactions"
                  : "Show All Transactions"}
              </Button>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 right-0 p-6">
          <NewTransaction
            category_id={category_id}
            budget_id={budget_id}
            reload={reloadPage}
          />
        </div>
      </div>
    </>
  );
}

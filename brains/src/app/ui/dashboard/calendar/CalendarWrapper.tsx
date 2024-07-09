// CalendarWrapper.tsx
// Composant qui affiche le calendrier de l'utilisateur
// Auteurs : Paul Agudze, Thomas Garneau

"use client";

import { TransactionCard } from '../budgets/category/transaction/TransactionCard';
import { budgetMiddleware } from '@/app/lib/actions/budget';
import { calendarMiddleWare } from '@/app/lib/actions/calendar';
import { WorkoutMiddleware } from '@/app/lib/actions/workout';
import React, { useState, useEffect, useRef } from 'react';
import {getLocalTimeZone, parseDate} from "@internationalized/date";
import { Divider, CircularProgress, Calendar } from '@nextui-org/react';
import { NewEvent } from './newEvent';
import { NewEventButton } from './newEventButton';
import { EventCard } from './EventCard';
import {WorkoutCard} from "@/app/ui/dashboard/workouts/wrapper/cards/WorkoutCard";
import { NewTransaction } from '../budgets/category/transaction/newTransaction';

export default function CalendarWrapper() {
    const [onChange, setOnChange] = useState(false);
    const [chosenDate, setChosenDate] = useState(parseDate(new Date().toISOString().split('T')[0]));
    const [transactions, setTransactions] = useState([]);
    const [events, setEvents] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const transactionsRef: any = useRef({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const allTransactions = [];
                const budgets = await budgetMiddleware('getBudgets', {});
                const eventsFetching = await calendarMiddleWare('getEvents', {});
                const workoutsFetching = await WorkoutMiddleware('getWorkouts', {});

                // @ts-ignore
                eventsFetching.forEach((event: any) => {
                    event.date = new Date(event.date).toUTCString();
                });
                // @ts-ignore
                setEvents(eventsFetching);

                // @ts-ignore
                workoutsFetching.forEach((workout: any) => {
                    workout.date = new Date(workout.date).toUTCString();
                });
                // @ts-ignore
                setWorkouts(workoutsFetching);

                if (Array.isArray(budgets)) {
                    for (let i = 0; i < budgets.length; i++) {
                        const transactions = await budgetMiddleware('getTransactionsByBudget', { budgetId: budgets[i].budget_id });
                        if (Array.isArray(transactions)) {
                            allTransactions.push(...transactions.filter((tx: any) => tx.is_recurring));
                        }
                    }
                }
                // @ts-ignore
                allTransactions.forEach((transaction: any) => {
                    transaction.date = new Date(transaction.date).toUTCString();
                });
                // @ts-ignore
                setTransactions(allTransactions);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [onChange]);

    const reloadBudgets = () => {
        setTransactions([]);
        setLoading(true);
        setOnChange(!onChange);
    };

    const addRecurringItems = (item: any, type: string) => {
        const futureItems: any = [];
        const periodMapping: any = {
            daily: 1,
            weekly: 7,
            biweekly: 14,
            monthly: 'monthly',
            annually: 'annually'
        };
        const increment = periodMapping[item.recuring_period.toLowerCase()];

        if (!increment) return futureItems;

        let currentDate = new Date(item.date);
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 6);

        while (currentDate <= endDate) {
            let newDate = new Date(currentDate);

            if (increment === 'monthly') {
                newDate.setMonth(newDate.getMonth() + 1);
            } else if (increment === 'annually') {
                newDate.setFullYear(newDate.getFullYear() + 1);
            } else {
                newDate.setDate(newDate.getDate() + increment);
            }

            if (newDate > endDate) break;

            futureItems.push({
                ...item,
                date: newDate,
                type: type
            });

            currentDate = newDate;
        }

        futureItems.forEach((futureItem: any) => {
            futureItem.date = futureItem.date.toUTCString();
        });

        return futureItems;
    };

    const groupByDate = (transactions: any, events: any, workouts: any) => {
        const allItems: any = [];

        transactions.forEach((transaction: any) => {
            if (transaction.is_recurring) {
                allItems.push({
                    ...transaction,
                    type: 'transaction'
                });
                allItems.push(...addRecurringItems(transaction, 'transaction'));
            }
        });

        events.forEach((event: any) => {
            if (event.date) {
                allItems.push({
                    ...event,
                    type: 'event'
                });
            }
        });

        workouts.forEach((workout: any) => {
            if (workout.is_recurring) {
                allItems.push({
                    ...workout,
                    type: 'workout'
                });
                allItems.push(...addRecurringItems(workout, 'workout'));
            }
        });
        allItems.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const grouped = allItems.reduce((acc: any, item: any) => {
            const date = item.date.match(/^(.*\d{4})\s\d{2}:\d{2}:\d{2}\sGMT$/)[1];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {});

        return grouped;
    };

    const groupedTransactions = groupByDate(transactions, events, workouts);

    const handleDateClick = (date: any) => {
        const adjustedDate = new Date(date);
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        const formattedDate = adjustedDate.toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (transactionsRef.current[formattedDate]) {
            transactionsRef.current[formattedDate].scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="scrollable-div">
            <div className="space-y-1 fixed bg-white shadow-md z-30 w-full">
                <h1 className="text-3xl font-medium p-6 text-center md:text-left">Calendrier</h1>
                <Divider />
            </div>
            <div className="flex flex-col lg:flex-row min-h-screen lg:space-y-0 pt-24">
                <div className="w-full">
                    <div className=" w-full lg:w-3/5 float-left p-6">
                        {loading ? (
                            <div className="flex justify-center items-center min-h-screen">
                                <CircularProgress />
                            </div>
                        ) : (
                            (Object.keys(groupedTransactions).length === 0) ? (
                                <div className="flex flex-col items-center min-h-screen mt-20">
                                    <h1 className="text-2xl font-bold">Aucun évènement au calendrier</h1>
                                    <NewEventButton reload={reloadBudgets} />
                                </div>
                            ) : (
                            <div className="grid gap-4">
                                {Object.keys(groupedTransactions).map((date, index) => (
                                    // @ts-ignore
                                    <div key={index} className="mb-6" ref={el => transactionsRef.current[date] = el}>
                                        <h3 className="text-2xl font-bold mb-2">{date}</h3>
                                        <Divider />
                                        {groupedTransactions[date].map((item: any, index: any) => {
                                            if (item.type == 'event') {
                                                return <EventCard key={index} event={item} reload={reloadBudgets} />;
                                            } else if (item.type == 'workout') {
                                                return <WorkoutCard key={index} workout={item} reload={reloadBudgets} />;
                                            } else {
                                                return <TransactionCard key={index} transaction={item} reload={reloadBudgets} />;
                                            }
                                        })}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="w-full lg:w-2/5 float-right p-6 pl-16 hidden lg:block lg:pt-8 bg-white">
                        <h2 className="text-2xl font-medium mb-4">Selectionner une date</h2>
                        <Calendar
                            classNames={{ header: 'bg-white' }}
                            aria-label="Date"
                            value={chosenDate}
                            onChange={date => {
                                setChosenDate(date);
                                handleDateClick(date);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 right-0 p-6">
                <NewEvent reload={reloadBudgets} />
            </div>
        </div>
    );
}

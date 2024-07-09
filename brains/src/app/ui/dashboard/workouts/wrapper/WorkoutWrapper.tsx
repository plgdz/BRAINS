//WorkoutWrapper.tsx
//Ce composant est le wrapper des séances d'entraînement. Il permet d'afficher les séances d'entraînement, d'ajouter une nouvelle séance et de voir les détails d'une séance.
//Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, {useState, useEffect }from 'react';

import {WorkoutMiddleware} from "@/app/lib/actions/workout";
import { ButtonAddWorkout } from '@/app/ui/dashboard/workouts/wrapper/button/ButtonAddWorkout';
import {DrawerNewWorkout}  from '@/app/ui/dashboard/workouts/wrapper/drawer/DrawerNewWorkout';
import {WorkoutDetails} from "@/app/ui/dashboard/workouts/wrapper/cards/WorkoutDetails";

import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Spinner} from "@nextui-org/spinner";
import {Button} from "@nextui-org/button";
import {CircularProgress} from "@nextui-org/react";

export function WorkoutWrapper() {
  // for drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [updatedWorkout, setUpdatedWorkout] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            // @ts-ignore
            const fetchedWorkouts = await WorkoutMiddleware('getWorkouts',{});
            // @ts-ignore
            setSelectedWorkout(fetchedWorkouts[0])
            // @ts-ignore
            setWorkouts(fetchedWorkouts);
            setLoading(false);
        }
        fetchWorkouts();
    }, [updatedWorkout]);

    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    }

    const toggleDetail = () => {
        setIsDetailOpen(!isDetailOpen);
    }

    const handleAddWorkout = (workout: {
        title: string;
        exercises: Exercise[];
        notes: string;
        duration: number;
    }) => {
      WorkoutMiddleware('createWorkout', workout);
      setUpdatedWorkout(!updatedWorkout);
    }

    const handleSelectWorkout = (workout : Workout) => {
        const selected = workout;
        // @ts-ignore
        setSelectedWorkout(selected);
        toggleDetail();
    }

    const handleDeleteWorkout = (workout: Workout) => {
        WorkoutMiddleware('deleteWorkout', workout);
        setUpdatedWorkout(!updatedWorkout);
    }

    return (
        <div className={'h-full pt-24'}>
            {loading ?
                <CircularProgress className={'fixed top-1/2 left-1/2'}/>
                :
                <div className={'grid gap-4 grid-cols-1 md:grid-cols-6 pl-4'}>
                    {workouts.length > 0 ?
                        workouts.map((workout: any, index: any) => {
                            return (
                                <Card
                                    key={index}
                                    className={'w-5/6 md:w-64'} // Increased width and added min-h-full
                                    isBlurred
                                    isPressable
                                    onClick={() => handleSelectWorkout(workout)}
                                >
                                    <CardHeader className={'flex justify-between'}>
                                        <p className="font-bold text-2xl px-2">{workout.title}</p>
                                        <div className={'bg-default-300 rounded-md w-12 text-center m-2'}>
                                            <p>{Math.ceil(workout.duration / 60)}</p>
                                            <p>min</p>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <p className='px-2'>- {workout.exercises.length} Exercice{workout.exercises.length > 1 ? 's' : ''}</p>
                                        <p className='p-2'>- {workout.notes}</p>
                                    </CardBody>
                                </Card>

                            )
                        }) :
                        <div
                            className="flex justify-center items-center row-start-1 h-[95vh] flex-col col-start-1 col-span-full">
                            <h1 className=" flex text-2xl font-bold mb-4">Aucune séance trouvé</h1>
                            <Button variant="solid" color="primary" onPress={toggleDrawer}
                                    className='rounded-full p-4 bg-primary text-white flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 4v16m8-8H4"/>
                                </svg>
                            </Button>
                        </div>
                    }
                </div>
            }


            <ButtonAddWorkout onClick={toggleDrawer}/>
            <DrawerNewWorkout isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} handleAddWorkout={handleAddWorkout}/>
            <WorkoutDetails isDetailOpen={isDetailOpen} toggleDetail={toggleDetail} workout={selectedWorkout}
                            handleDeleteWorkout={handleDeleteWorkout}/>
        </div>
    );
}
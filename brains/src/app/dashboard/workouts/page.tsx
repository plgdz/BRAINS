'use client';
import React from 'react';
import { InformationsWrapper } from '@/app/ui/dashboard/workouts/informations/InformationsWrapper';
import { WorkoutWrapper } from '@/app/ui/dashboard/workouts/wrapper/WorkoutWrapper';
import {Divider} from "@nextui-org/react";

export default function Workouts(): React.ReactNode {

    return (
        <div className="relative h-screen">
            <div className="space-y-1 fixed bg-white shadow-md z-30 w-full">
                <h1 className="text-3xl font-medium p-6 text-center md:text-left">Entrainements</h1>
            </div>
            <Divider/>
            {/*<InformationsWrapper/>*/}
            <WorkoutWrapper/>
        </div>
    );
};





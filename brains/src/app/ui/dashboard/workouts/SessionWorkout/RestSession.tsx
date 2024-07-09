// RestSession.tsx
// Ce composant affiche un timer de repos.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Tooltip } from "@nextui-org/tooltip";

interface RestSessionProps {
    restTime: number;
    toggleTimer: () => void;
    isOpen: boolean;
}

export function RestSession({ restTime, toggleTimer, isOpen }: RestSessionProps) {
    const [time, setTime] = useState(restTime);
    const [initialTime, setInitialTime] = useState(restTime);
    const [timerRunning, setTimerRunning] = useState(false);
    const [started, setStarted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (started && time > 0 && timerRunning) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time <= 0) {
            clearInterval(timerRef.current!);
            toggleTimer();
        }
        return () => clearInterval(timerRef.current!);
    }, [time, timerRunning, started, toggleTimer]);

    const handleStart = () => {
        setStarted(true);
        setTimerRunning(true);
    };

    const handleAddTime = () => {
        setTime((prevTime) => prevTime + 10);
        setInitialTime((prevInitialTime) => prevInitialTime + 10);
    };

    const percentage = (time / initialTime) * 100;

    useEffect(() => {
        if (isOpen) {
            handleStart();
        }
    }, [isOpen]);

    return (
        <Tooltip content={'Cliquez pour ajouter 10 secondes'} closeDelay={1500}>
            <div
                className="absolute bg-white col-start-3 col-span-6 row-start-3 row-span-8 flex justify-center h-full w-full z-50 cursor-pointer"
                onClick={handleAddTime}
            >
                <div className="self-center">
                    <div style={{ width: 300, height: 300 }}>
                        <CircularProgressbar
                            value={percentage}
                            text={`${time}`}
                            styles={buildStyles({
                                pathColor: `rgba(0, 0, 0)`,
                                textColor: '#000000',
                                trailColor: '#434040',
                                backgroundColor: '#000000',
                            })}
                        />
                    </div>
                </div>
            </div>
        </Tooltip>
    );
}

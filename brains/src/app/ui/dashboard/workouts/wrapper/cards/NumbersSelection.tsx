// NumberSelection.tsx
// Ce composant permet de sélectionner un nombre. Il est utilisé pour sélectionner le nombre de séries, de répétitions, de poids et de temps de repos.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";


export function NumbersSelection(
    props: {
        value: number,
        title: string,
        step: number,
        min: number,
        max: number,
        endUnit: boolean | null,
        endSec: boolean | null,
        handleInputChange: (value: number) => void,
        handleUnitChange: ((value: string) => void) | null
    }
) {

    const decrementAmount = () => {
        const val = props.value - props.step;
        if (val < props.min) props.handleInputChange(props.min);
        else props.handleInputChange(val);
    };

    const incrementAmount = () => {
        const val = props.value + props.step;
        if (val > props.max) props.handleInputChange(props.max);
        else props.handleInputChange(val);
    };

    const selectPoids =
        <div className="flex items-center">
            <label className="sr-only" htmlFor="currency">
                Unité de poids
            </label>
            <select
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                id="currency"
                name="currency"
                onChange={(e) => {
                    // @ts-ignore
                    props.handleUnitChange(e.target.value)
                }}
            >
                <option
                    value={'kg'}
                >
                    KG
                </option>
                <option
                    value={'lbs'}
                >
                    LBS
                </option>
            </select>
        </div>

    const selectTemps =
        <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">Sec</span>
        </div>


    return (
        <Card className={props.endUnit || props.endSec ? 'w-1/2' : 'w-1/3 '}>
            <CardHeader>{props.title}</CardHeader>
            <CardBody className={'flex-col'}>
                <div className={'flex items-center'}>
                    <Button
                        isIconOnly
                        onPress={decrementAmount}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                d="M4 12h16" />
                        </svg>
                    </Button>
                    <Input
                        value={props.value.toString()}
                        onChange={() => props.handleInputChange}
                        radius={'full'}
                        className={props.endUnit || props.endSec ? 'w-32' : 'w-20'}
                        color={'default'}
                        size={'lg'}
                        endContent={props.endUnit ? selectPoids : props.endSec ? selectTemps : null}
                    />
                    <Button
                        isIconOnly
                        onPress={incrementAmount}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                d="M12 4v16m8-8H4" />
                        </svg>
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}

// InformationsDurationByDay.tsx
// Ce composant affiche un graphique de la durée des entraînements par jour.
// Auteurs : Paul Agudze, Thomas Garneau

'use client';

import React, { useState, useEffect } from 'react';
import { ChartContainer, BarPlot } from "@mui/x-charts";

export function InformationsDurationByDay(
    props: {
        durationsByDay: any,
    }
) {

    const dataDuration: any[] = []
    const labelsDays: any[] = []

    props.durationsByDay.forEach((day: any) => {
        dataDuration.push(day.duration)
        labelsDays.push(day.day)
    })

    return (
        <div>
            <ChartContainer
                width={200}
                height={150}
                series={[{ data: dataDuration, label: 'Durée', type: 'bar', color: 'black' }]}
                xAxis={[{ scaleType: 'band', data: ['L', 'M', 'M', 'J', 'V', 'D', 'D'], label: 'Jours', }]}
            >
                <BarPlot />
            </ChartContainer>
        </div>
    )
}
"use client";

import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    {
        subject: 'Musanze',
        A: 120,
        B: 110,
        C: 135,
        fullMark: 150,
    },
    {
        subject: 'Taba',
        A: 98,
        B: 130,
        C: 96,
        fullMark: 150,
    },
    {
        subject: 'Bweyeye',
        A: 86,
        B: 130,
        C: 85,
        fullMark: 150,
    },
    {
        subject: 'Nyungwe',
        A: 99,
        B: 100,
        C: 125,
        fullMark: 150,
    },
    {
        subject: 'Gako',
        A: 85,
        B: 90,
        C: 65,
        fullMark: 150,
    },
    {
        subject: 'Kanombe',
        A: 65,
        B: 85,
        C: 115,
        fullMark: 150,
    },
];

export default class RadarChartEx extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/radar-chart-specified-domain-l68xry';

    render() {
        return (
            <>
                <h2 className='pl-4 text-sm text-zinc-500 font-medium'>Deployment Chart - (Platforms)</h2>
                <ResponsiveContainer className={`text-xs h-[200px]`} width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke='#52525b' />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar name="Ratel MK3" dataKey="B" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} dot={{r: 2}} activeDot={{ r: 4, stroke: '#71717a' }} />
                        <Radar name="Arma 8x8" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} dot={{r: 2}} activeDot={{ r: 4, stroke: '#71717a' }} />
                        <Radar name="Cobra 1 & 2" dataKey="C" stroke="#0891b2" fill="#0891b2" fillOpacity={0.3} dot={{r: 2}} activeDot={{ r: 4, stroke: '#71717a' }} />
                        <Tooltip contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid #3f3f46',
                            color: '#71717a'
                        }} wrapperClassName='rounded shadow-md shadow-zinc-950 font-medium' />
                        <Legend className='flex items-center' iconType='line' />
                    </RadarChart>
                </ResponsiveContainer>
            </>
        );
    }
}

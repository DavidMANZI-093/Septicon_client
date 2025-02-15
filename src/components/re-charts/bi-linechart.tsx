"use client";

import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Week 1',
        Ammunition: 4000,
        'Spare parts': 2400,
        amt: 2400,
    },
    {
        name: 'Week 2',
        Ammunition: 3000,
        'Spare parts': 1398,
        amt: 2210,
    },
    {
        name: 'Week 3',
        Ammunition: 2000,
        'Spare parts': 9800,
        amt: 2290,
    },
    {
        name: 'Week 4',
        Ammunition: 2780,
        'Spare parts': 3908,
        amt: 2000,
    },
    {
        name: 'Week 5',
        Ammunition: 1890,
        'Spare parts': 4800,
        amt: 2181,
    },
    {
        name: 'Week 6',
        Ammunition: 2390,
        'Spare parts': 3800,
        amt: 2500,
    },
    {
        name: 'Week 7',
        Ammunition: 3490,
        'Spare parts': 4300,
        amt: 2100,
    },
];

export default class LineChartEx extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

    render() {
        return (
            <>
                <h2 className='pl-4 text-sm text-zinc-500 font-medium'>Deployment Curve (Ammo & Spare parts)</h2>
                <ResponsiveContainer className={`text-xs h-[200px]`} width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 5,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid stroke='#52525b' strokeDasharray="3 3" />
                        <XAxis stroke='#52525b' dataKey="name" />
                        <YAxis stroke='#52525b' dataKey="Spare parts" />
                        <Tooltip contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid #3f3f46',
                            color: '#71717a'
                        }} wrapperClassName='rounded shadow-md shadow-zinc-950 font-medium' />
                        <Legend />
                        <Line type="monotone" dataKey="Ammunition" stroke="#2563eb" fill='#2563eb' dot={{r: 2}} activeDot={{ r: 4, stroke: '#71717a' }} />
                        <Line type="monotone" dataKey="Spare parts" stroke="#4f46e5" fill='#4f46e5' dot={{r: 2}} activeDot={{ r: 4, stroke: '#71717a' }} />
                    </LineChart>
                </ResponsiveContainer>
            </>
        );
    }
}
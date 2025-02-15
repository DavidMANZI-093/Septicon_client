"use client";

import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    {
        name: 'Jan - Feb',
        Gasoline: 4000,
        Diesel: 2400,
        Benzen: 2400,
    },
    {
        name: 'Mar - Apr',
        Gasoline: 3000,
        Diesel: 1398,
        Benzen: 2210,
    },
    {
        name: 'May - Jun',
        Gasoline: 2000,
        Diesel: 9800,
        Benzen: 2290,
    },
    {
        name: 'Jul - Aug',
        Gasoline: 2780,
        Diesel: 3908,
        Benzen: 2000,
    },
    {
        name: 'Sep - Oct',
        Gasoline: 1890,
        Diesel: 4800,
        Benzen: 2181,
    },
    {
        name: 'Nov - Dec',
        Gasoline: 2390,
        Diesel: 3800,
        Benzen: 2500,
    },
    // {
    //     name: 'Page G',
    //     Gasoline: 3490,
    //     Diesel: 4300,
    //     Benzen: 2100,
    // },
];

export default class AreaChartEx extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/stacked-area-chart-forked-5yjhcs';

    render() {
        return (
            <>
                <h2 className='pl-4 text-sm text-zinc-500 font-medium'>Fuel Usage Curve (Gasoline, Diesel, & Benzen)</h2>
                <ResponsiveContainer className={`text-xs h-[200px]`} width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid stroke='#52525b' strokeDasharray="3 3" />
                        <XAxis stroke='#52525b' dataKey="name" />
                        <YAxis stroke='#52525b' />
                        <Tooltip contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid #3f3f46',
                            color: '#71717a'
                        }} wrapperClassName='rounded shadow-md shadow-zinc-950 font-medium' />
                        <Legend />
                        <Area type="monotone" dataKey="Gasoline" stackId="1" stroke="#312e81" fill="#312e81" dot={{r: 2}} activeDot={{ r: 4, stroke: '#71717a' }} />
                        <Area type="monotone" dataKey="Diesel" stackId="1" stroke="#4338ca" fill="#4338ca" dot={{r: 2}} activeDot={{ r: 4, stroke: '#71717a' }} />
                        <Area type="monotone" dataKey="Benzen" stackId="1" stroke="#6366f1" fill="#6366f1" dot={{r: 2}} activeDot={{ r: 4, stroke: '#71717a' }} />
                    </AreaChart>
                </ResponsiveContainer>
            </>
        );
    }
}
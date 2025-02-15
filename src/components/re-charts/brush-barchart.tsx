"use client";

import React, { PureComponent } from 'react';
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';

const data = [
    { name: 'Aug 1', Supplies: 300, Replenishments: 456 },
    { name: 'Aug 2', Supplies: -145, Replenishments: 230 },
    { name: 'Aug 3', Supplies: -100, Replenishments: 345 },
    { name: 'Aug 4', Supplies: -8, Replenishments: 450 },
    { name: 'Aug 5', Supplies: 100, Replenishments: 321 },
    { name: 'Aug 6', Supplies: 9, Replenishments: 235 },
    { name: 'Aug 7', Supplies: 53, Replenishments: 267 },
    { name: 'Aug 8', Supplies: 252, Replenishments: -378 },
    { name: 'Aug 9', Supplies: 79, Replenishments: -210 },
    { name: 'Aug 10', Supplies: 294, Replenishments: -23 },
    { name: 'Aug 12', Supplies: 43, Replenishments: 45 },
    { name: 'Aug 13', Supplies: -74, Replenishments: 90 },
    { name: 'Aug 14', Supplies: -71, Replenishments: 130 },
    { name: 'Aug 15', Supplies: -117, Replenishments: 11 },
    { name: 'Aug 16', Supplies: -186, Replenishments: 107 },
    { name: 'Aug 17', Supplies: -16, Replenishments: 926 },
    { name: 'Aug 18', Supplies: -125, Replenishments: 653 },
    { name: 'Aug 19', Supplies: 222, Replenishments: 366 },
    { name: 'Aug 20', Supplies: 372, Replenishments: 486 },
    { name: 'Aug 21', Supplies: 182, Replenishments: 512 },
    { name: 'Aug 22', Supplies: 164, Replenishments: 302 },
    { name: 'Aug 23', Supplies: 316, Replenishments: 425 },
    { name: 'Aug 24', Supplies: 131, Replenishments: 467 },
    { name: 'Aug 25', Supplies: 291, Replenishments: -190 },
    { name: 'Aug 26', Supplies: -47, Replenishments: 194 },
    { name: 'Aug 27', Supplies: -415, Replenishments: 371 },
    { name: 'Aug 28', Supplies: -182, Replenishments: 376 },
    { name: 'Aug 29', Supplies: -93, Replenishments: 295 },
    { name: 'Aug 30', Supplies: -99, Replenishments: 322 },
    { name: 'Aug 31', Supplies: -52, Replenishments: 246 },
];

export default class BarChartEx extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/bar-chart-with-brush-twqyp2';

    render() {
        return (
            <>
                <h2 className='pl-4 text-sm text-zinc-500 font-medium'>Stock Flow Curve (Replenishment and Supply)</h2>
                <ResponsiveContainer className={`text-xs h-[200px]`} width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 0,
                            right: 30,
                            left: 5,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid stroke='#52525b' strokeDasharray="3 3" />
                        <XAxis stroke='#52525b' dataKey="name" />
                        <YAxis stroke='#52525b' />
                        <Tooltip cursor={false} contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid #3f3f46',
                            color: '#71717a'
                        }} wrapperClassName='rounded shadow-md shadow-zinc-950 font-medium' />
                        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                        <ReferenceLine y={0} stroke="#71717a" />
                        <Brush travellerWidth={4}  dataKey="name" height={6} fill='#18181b' stroke="#4f46e5" />
                        <Bar radius={[8, 8, 0, 0]} dataKey="Replenishments" fill="#3b82f6" opacity={1} />
                        <Bar radius={[8, 8, 0, 0]} dataKey="Supplies" fill="#6366f1" opacity={1} />
                    </BarChart>
                </ResponsiveContainer>
            </>
        );
    }
}
"use client";

import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    {
        name: 'Rifle Ammo',
        Qty: 31.47,
        pv: 2400,
        fill: '#60a5fa',
    },
    {
        name: '6mm Barrels',
        Qty: 26.69,
        pv: 4567,
        fill: '#3b82f6',
    },
    {
        name: 'Pistol Ammo',
        Qty: 15.69,
        pv: 1398,
        fill: '#3b82f6',
    },
    {
        name: 'Tank Shells',
        Qty: 8.22,
        pv: 9800,
        fill: '#2563eb',
    },
    {
        name: 'Artillery Sh',
        Qty: 8.63,
        pv: 3908,
        fill: '#1d4ed8',
    },
    {
        name: 'Rifle Scope',
        Qty: 2.63,
        pv: 4800,
        fill: '#1e40af',
    },
    {
        name: 'Comms Radio',
        Qty: 6.87,
        pv: 4800,
        fill: '#1e3a8a',
    },
];

// const style = {
//     top: '50%',
//     right: 0,
//     transform: 'translate(0, -50%)',
//     lineHeight: '24px',
// };

export default class RadialBarChartEx extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/simple-radial-bar-chart-gnwjjg';

    render() {
        return (
            <>
                <h2 className='pl-4 text-sm text-zinc-500 font-medium'>Critical Store Values</h2>
                <ResponsiveContainer className={`text-xs h-[200px]`} width="100%" height="100%">
                    <RadialBarChart cx="40%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
                        <RadialBar
                            // minAngle={15} // Don't touch this line, Perfect as it is!
                            // label={{ position: 'insideStart', fill: '#fff' }}
                            // background
                            // clockWise // Don't touch this line, Perfect as it is!
                            dataKey="Qty"
                        />
                        <Tooltip contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid #3f3f46',
                            color: '#71717a',
                        }} active={false} wrapperClassName=' rounded-sm shadow-sm shadow-zinc-950 font-medium' />
                        <Legend iconSize={8} layout='vertical' align='right' verticalAlign='middle' />
                    </RadialBarChart>
                </ResponsiveContainer>
            </>
        );
    }
}

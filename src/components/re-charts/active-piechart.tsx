"use client";

import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
const data = [
    { name: 'Arma 8x8', value: 400, fill: '#6366f1' },
    { name: 'Ratel MK3', value: 300, fill: '#4f46e5' },
    { name: 'Cobra 1 & 2', value: 300, fill: '#4338ca' },
    { name: 'RG_31 Nyala', value: 200, fill: '#3730a3' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => { // type set to any
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text className='font-medium' x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} className='font-medium' textAnchor={textAnchor} fill="#a1a1aa">
                {`Health ${value}`}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#a1a1aa">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default class PieChartEx extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si';

    state = {
        activeIndex: 0,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onPieEnter = (_: any, index: any) => { // type set to any
        this.setState({
            activeIndex: index,
        });
    };

    render() {
        return (
            <>
                <h2 className='pl-4 text-sm text-zinc-500 font-medium'>Platform Health Score</h2>
                <ResponsiveContainer className={`text-xs h-[200px]`} width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#2563eb"
                            stroke='#18181b'
                            dataKey="value"
                            onMouseEnter={this.onPieEnter}
                        />
                        {/* <Tooltip contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid #3f3f46',
                            color: '#71717a'
                        }} wrapperClassName='rounded-sm shadow-md shadow-zinc-950 font-medium' /> */}
                    </PieChart>
                </ResponsiveContainer>
            </>
        );
    }
}
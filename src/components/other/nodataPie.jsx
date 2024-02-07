import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const data = [
    { name: 'Available stock', value: 0 },
    { name: 'Unavailable stock', value: 0 },
    { name: 'No Data', value: 100 }, // Default value with label
];
const data2 = [
    { name: 'Stocked Products', value: 0 },
    { name: 'Sold Products', value: 0 },
    { name: 'No Data', value: 100 }, // Default value with label
];
const data3 = [
    { name: 'In stock', value: 0 },
    { name: 'Out of stock', value: 0 },
    { name: 'No Data', value: 100 }, // Default value with label
];

const COLORS = ['#8884d8', '#82ca9d', '#A0AEC0']; // Define colors for the segments, including a color for "No Data"

export const NodataPie = () => {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className='charts-con'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PieChart width={400} height={230}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};


export const NodataPie2 = () => {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className='charts-con'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PieChart width={400} height={230}>
                    <Pie
                        data={data2}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="60%"
                        outerRadius={80}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export const NodataPie3 = () => {
    return (
        <div style={{ width: '100%', overflowX: 'auto' }} className='charts-con'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PieChart width={400} height={230}>
                    <Pie
                        data={data3}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="60%"
                        outerRadius={80}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};



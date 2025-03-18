import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const VAXChart = ({data}) => {
    return (
        <div>
            <LineChart
                width={435}
                height={292}
                data={data}
                margin={{ bottom: 20, right: 20, top: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="voltage"
                    type="number"
                    label={{ value: 'U, В', position: 'insideBottom', offset: -10 }}
                    domain={[-10, 10]}
                />
                <YAxis
                    label={{ value: 'I, мА', angle: -90, position: 'insideLeft', offset: 10 }}
                    domain={[-100, 100]}
                />
                <Tooltip />
                <Line type="monotone" dataKey="current" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default VAXChart;

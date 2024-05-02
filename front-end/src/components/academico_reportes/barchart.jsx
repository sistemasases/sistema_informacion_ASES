import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Bar_chart = ({ data}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }} barCategoryGap={200}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} allowDataOverflow={true}/>
                <Tooltip />
                <Bar dataKey="cursos" fill="#ffa4a4" barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Bar_chart;
import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const SubscribersChart: React.FC<any> = ({ subscribers }) => (
  <div style={{ width: "100%", height: "275px" }}>
    <ResponsiveContainer>
      <LineChart data={subscribers}>
        <Line type="monotone" dataKey="total" stroke="#50E3C2" />
        <CartesianGrid stroke="#EEEEEE" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default SubscribersChart;
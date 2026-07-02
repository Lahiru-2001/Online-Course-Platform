import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip formatter={(value) => [`${value} Hours`, 'Hours Learnt']} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
        <Bar dataKey="hours" fill="#1e3a5f" radius={[4, 4, 0, 0]} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

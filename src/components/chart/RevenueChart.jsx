import React from "react";
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    AreaChart, 
    Area 
} from "recharts";

const data = [
    { name: "Apr 19", current: 4000, last: 2400 },
    { name: "Apr 20", current: 5500, last: 4200 },
    { name: "Apr 21", current: 6800, last: 5100 },
    { name: "Apr 22", current: 6200, last: 3900 },
    { name: "Apr 23", current: 7500, last: 4800 },
    { name: "Apr 24", current: 6300, last: 5500 },
    { name: "Apr 25", current: 9000, last: 6700 },
];

const RevenueChart = () => {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        tickFormatter={(value) => `$${value/1000}k`}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            borderRadius: "12px", 
                            border: "none", 
                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" 
                        }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="current" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorCurrent)" 
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="last" 
                        stroke="#94a3b8" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fill="transparent"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;

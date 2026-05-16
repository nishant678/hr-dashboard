import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { name: "Active", value: 20, color: "#22c55e" },
    { name: "Expiring Soon", value: 3, color: "#f59e0b" },
    { name: "Expired", value: 1, color: "#ef4444" },
];

const SubscriptionDonut = () => {
    return (
        <div className="h-[250px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={8}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ 
                            borderRadius: "12px", 
                            border: "none", 
                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" 
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-800">24</span>
                <span className="text-xs text-slate-500 font-medium">Total</span>
            </div>
        </div>
    );
};

export default SubscriptionDonut;

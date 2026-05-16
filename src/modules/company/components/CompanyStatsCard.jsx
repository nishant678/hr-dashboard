import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const CompanyStatsCard = ({ title, value, change, isUp, icon: Icon, color = "bg-workbook-dark/10 text-workbook-dark" }) => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${color}`}>
                    <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? "text-green-500" : "text-red-500"}`}>
                    {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {change}
                </div>
            </div>
            <div className="mt-4">
                <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
                <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">from last month</p>
        </motion.div>
    );
};

export default CompanyStatsCard;

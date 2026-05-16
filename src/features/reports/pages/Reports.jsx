import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Download, 
    Calendar, 
    ChevronDown, 
    TrendingUp, 
    Users as UsersIcon, 
    CreditCard, 
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";
import RevenueChart from "../../../components/chart/RevenueChart";
import SubscriptionDonut from "../../../components/chart/SubscriptionDonut";

// --- Sub-components ---

function ReportStat({ label, value, change, isUp, color }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <div className="mt-2 flex items-baseline justify-between">
                <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
                <div className={`flex items-center gap-0.5 text-xs font-bold ${isUp ? "text-green-500" : "text-red-500"}`}>
                    {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {change}
                </div>
            </div>
            <div className="mt-4 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1 }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );
}

function PlanDetail({ label, percentage, value, color }) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${color}`}></div>
                <span className="text-sm font-semibold text-slate-700">{label}</span>
                <span className="text-xs text-slate-400 font-bold">{percentage}</span>
            </div>
            <span className="text-sm font-bold text-slate-800 group-hover:text-workbook-dark transition-colors">{value}</span>
        </div>
    );
}

const Reports = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({
            title: "Reports",
            description: "System reports and analytics.",
            actions: (
                <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors font-bold">
                            <Calendar size={16} />
                            <span>Apr 19, 2024 - Apr 25, 2024</span>
                            <ChevronDown size={16} />
                        </div>
                        <button className="flex items-center justify-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-bold transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                            <Download size={18} />
                            <span>Export</span>
                        </button>
                    </div>
                    {/* Sub-navigation Tabs moved to Header Area */}
                    <div className="flex gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-100">
                        {["Overview", "Companies", "Users", "Subscriptions", "Revenue"].map((tab, i) => (
                            <button key={tab} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all ${i === 0 ? "bg-white text-workbook-dark shadow-sm border border-slate-100" : "text-slate-400 hover:bg-white hover:text-slate-600"}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            )
        });
    }, [setHeaderData]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-8"
        >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ReportStat label="Monthly Revenue" value="₹8,540.00" change="+24%" isUp={true} color="bg-workbook-dark" />
                <ReportStat label="Total Users" value="1,245" change="+18%" isUp={true} color="bg-purple-500" />
                <ReportStat label="New Companies" value="5" change="+25%" isUp={true} color="bg-orange-500" />
                <ReportStat label="Active Subscriptions" value="20" change="+8%" isUp={true} color="bg-green-500" />
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-slate-800">Revenue Analytics</h3>
                        <div className="flex gap-4 text-xs font-semibold">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-workbook-dark"></div>
                                <span className="text-slate-600">Current Period</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                <span className="text-slate-400">Previous Period</span>
                            </div>
                        </div>
                    </div>
                    <RevenueChart />
                </div>

                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-8">Revenue by Plan</h3>
                    <SubscriptionDonut />
                    <div className="mt-8 space-y-4">
                        <PlanDetail label="Enterprise" percentage="45%" value="₹3,843.00" color="bg-workbook-dark" />
                        <PlanDetail label="Premium" percentage="30%" value="₹2,562.00" color="bg-purple-600" />
                        <PlanDetail label="Standard" percentage="15%" value="₹1,281.00" color="bg-orange-600" />
                        <PlanDetail label="Basic" percentage="10%" value="₹854.00" color="bg-green-600" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Reports;

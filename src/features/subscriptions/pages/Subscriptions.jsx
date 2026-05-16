import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Search, 
    Filter, 
    Plus, 
    MoreHorizontal, 
    CreditCard, 
    Calendar,
    ChevronDown,
    Zap,
    AlertCircle,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";

const Subscriptions = () => {
    const { setHeaderData } = useHeader();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setHeaderData({
            title: "Subscriptions",
            description: "Manage and monitor company subscription plans.",
            actions: (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors">
                        <Calendar size={16} />
                        <span>All Time</span>
                        <ChevronDown size={16} />
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                        <Plus size={18} />
                        <span>New Subscription</span>
                    </button>
                </div>
            )
        });
    }, [setHeaderData]);

    const subscriptions = [
        { id: 1, company: "Tech Solutions", plan: "Premium", amount: "₹499/mo", status: "Active", nextBilling: "May 25, 2024", users: 45 },
        { id: 2, company: "ABC Pvt Ltd", plan: "Enterprise", amount: "₹1,200/mo", status: "Active", nextBilling: "May 20, 2024", users: 120 },
        { id: 3, company: "XYZ Corp", plan: "Standard", amount: "₹299/mo", status: "Expiring Soon", nextBilling: "May 05, 2024", users: 80 },
        { id: 4, company: "Global Ltd", plan: "Standard", amount: "₹299/mo", status: "Expired", nextBilling: "Apr 15, 2024", users: 60 },
        { id: 5, company: "Innovatech", plan: "Basic", amount: "₹99/mo", status: "Active", nextBilling: "May 12, 2024", users: 30 },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Active": return "bg-green-50 text-green-600";
            case "Expiring Soon": return "bg-orange-50 text-orange-600";
            case "Expired": return "bg-red-50 text-red-600";
            default: return "bg-slate-50 text-slate-600";
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search subscription..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Subscriptions Grid/Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-left border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Plan Details</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Next Billing</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {subscriptions.map((sub) => (
                                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-workbook-dark/10 text-workbook-dark flex items-center justify-center font-bold">
                                                {sub.company.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{sub.company}</p>
                                                <p className="text-xs text-slate-400">{sub.users} active users</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <Zap size={14} className="text-orange-500 fill-orange-500" />
                                            <span className="font-bold text-slate-700">{sub.plan}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-bold text-slate-800">{sub.amount}</td>
                                    <td className="px-6 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${getStatusStyle(sub.status)}`}>
                                            {sub.status === "Active" && <CheckCircle2 size={12} />}
                                            {sub.status === "Expiring Soon" && <AlertCircle size={12} />}
                                            {sub.status === "Expired" && <XCircle size={12} />}
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 font-medium text-slate-500">{sub.nextBilling}</td>
                                    <td className="px-6 py-6 text-right">
                                        <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                                            <MoreHorizontal size={16} className="text-slate-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default Subscriptions;

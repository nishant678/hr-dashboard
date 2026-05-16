import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Search, 
    Filter, 
    Download, 
    MoreHorizontal, 
    CreditCard, 
    Banknote, 
    Smartphone, 
    ChevronLeft, 
    ChevronRight,
    ArrowUpRight,
    ArrowDownLeft
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";

const Transactions = () => {
    const { setHeaderData } = useHeader();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setHeaderData({
            title: "Transactions",
            description: "All financial transactions and payments.",
            actions: (
                <button className="flex items-center justify-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                    <Download size={18} />
                    <span>Export CSV</span>
                </button>
            )
        });
    }, [setHeaderData]);

    const transactions = [
        { id: "INV-00128", company: "Tech Solutions", amount: "₹1,250.00", method: "Credit Card", date: "Apr 25, 2024", status: "Paid" },
        { id: "INV-00125", company: "ABC Pvt Ltd", amount: "₹850.00", method: "Bank Transfer", date: "Apr 20, 2024", status: "Paid" },
        { id: "INV-00122", company: "XYZ Corp", amount: "₹450.00", method: "UPI", date: "Apr 18, 2024", status: "Paid" },
        { id: "INV-00121", company: "Global Ltd", amount: "₹320.00", method: "Credit Card", date: "Apr 15, 2024", status: "Failed" },
        { id: "INV-00120", company: "Innovatech", amount: "₹150.00", method: "UPI", date: "Apr 12, 2024", status: "Paid" },
        { id: "INV-00119", company: "SoftHub", amount: "₹120.00", method: "Bank Transfer", date: "Apr 10, 2024", status: "Paid" },
        { id: "INV-00118", company: "Bright Minds", amount: "₹85.00", method: "Credit Card", date: "Apr 05, 2024", status: "Paid" },
        { id: "INV-00117", company: "Future Systems", amount: "₹85.00", method: "UPI", date: "Apr 01, 2024", status: "Paid" },
    ];

    const getStatusStyle = (status) => {
        return status === "Paid" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";
    };

    const getMethodIcon = (method) => {
        switch (method) {
            case "Credit Card": return <CreditCard size={14} className="text-workbook-dark" />;
            case "Bank Transfer": return <Banknote size={14} className="text-purple-500" />;
            case "UPI": return <Smartphone size={14} className="text-orange-500" />;
            default: return <CreditCard size={14} />;
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
                        placeholder="Search by ID or company..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-left border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Invoice ID</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Payment Method</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-workbook-dark">{tx.id}</td>
                                    <td className="px-6 py-4 text-slate-700 font-semibold">{tx.company}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                            {tx.amount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            {getMethodIcon(tx.method)}
                                            <span>{tx.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(tx.status)}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                                            <MoreHorizontal size={16} className="text-slate-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium">Showing 1 to 8 of 128 entries</p>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-white border border-slate-200 rounded text-slate-400 disabled:opacity-50" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center bg-workbook-dark text-white text-xs font-bold rounded shadow-sm">1</button>
                        <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">2</button>
                        <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">3</button>
                        <button className="p-1 hover:bg-white border border-slate-200 rounded text-slate-400">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Transactions;

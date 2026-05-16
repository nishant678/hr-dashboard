import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Search, 
    Filter, 
    Plus, 
    MoreHorizontal, 
    Ticket, 
    MessageSquare, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";

const SupportTickets = () => {
    const { setHeaderData } = useHeader();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        setHeaderData({
            title: "Support Tickets",
            description: "Manage all company support tickets and queries.",
            actions: (
                <button className="flex items-center justify-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                    <Plus size={18} />
                    <span>New Ticket</span>
                </button>
            )
        });
    }, [setHeaderData]);

    const tickets = [
        { id: "#128", title: "Unable to login to account", company: "Tech Solutions", priority: "High", status: "Open", date: "Apr 25, 2024" },
        { id: "#125", title: "Billing issue with subscription", company: "ABC Pvt Ltd", priority: "Medium", status: "In Progress", date: "Apr 23, 2024" },
        { id: "#124", title: "Feature request: Export data", company: "XYZ Corp", priority: "Low", status: "Resolved", date: "Apr 22, 2024" },
        { id: "#122", title: "App not working on mobile", company: "Global Ltd", priority: "High", status: "Open", date: "Apr 20, 2024" },
        { id: "#121", title: "Unit report not generating", company: "Innovatech", priority: "Medium", status: "Resolved", date: "Apr 18, 2024" },
        { id: "#120", title: "Need help with attendance import", company: "SoftHub", priority: "Low", status: "Closed", date: "Apr 15, 2024" },
        { id: "#119", title: "Payment failed but amount deducted", company: "Bright Minds", priority: "High", status: "In Progress", date: "Apr 12, 2024" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Open": return "bg-workbook-dark/10 text-workbook-dark border-workbook-dark/20";
            case "In Progress": return "bg-orange-50 text-orange-600 border-orange-100";
            case "Resolved": return "bg-green-50 text-green-600 border-green-100";
            case "Closed": return "bg-slate-50 text-slate-500 border-slate-100";
            default: return "bg-slate-50 text-slate-600";
        }
    };

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case "High": return "text-red-500 font-bold";
            case "Medium": return "text-orange-500 font-bold";
            case "Low": return "text-green-500 font-bold";
            default: return "text-slate-500";
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm w-fit">
                    {["All", "Open (25)", "In Progress (10)", "Resolved (15)", "Closed (5)"].map((tab) => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab.split(" (")[0])}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.split(" (")[0] ? "bg-workbook-dark text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`} style={activeTab === tab.split(" (")[0] ? {boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'} : {}}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search tickets..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm font-medium text-slate-700"
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-left border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Ticket ID</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-slate-800">{ticket.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-700 max-w-xs truncate">{ticket.title}</p>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{ticket.company}</td>
                                    <td className="px-6 py-4">
                                        <span className={getPriorityStyle(ticket.priority)}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase border ${getStatusStyle(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 font-medium">{ticket.date}</td>
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
                    <p className="text-xs text-slate-500 font-medium">Showing 1 to 7 of 55 entries</p>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-white border border-slate-200 rounded text-slate-400 disabled:opacity-50" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center bg-workbook-dark text-white text-xs font-bold rounded shadow-sm">1</button>
                        <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">2</button>
                        <button className="p-1 hover:bg-white border border-slate-200 rounded text-slate-400">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SupportTickets;

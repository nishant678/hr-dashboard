import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Activity,
    User as UserIcon,
    Terminal,
    ArrowUpRight
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";

// --- Helper Functions ---
const getActionColor = (action) => {
    switch (action) {
        case "Created": return "bg-green-50 text-green-600";
        case "Updated": return "bg-workbook-dark/10 text-workbook-dark";
        case "Deleted": return "bg-red-50 text-red-600";
        case "Login": return "bg-purple-50 text-purple-600";
        case "Payment": return "bg-orange-50 text-orange-600";
        default: return "bg-slate-50 text-slate-600";
    }
};

const ActivityLogs = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({
            title: "Activity Logs",
            description: "Track all system activities and changes.",
            actions: (
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors shadow-sm">
                    <Calendar size={16} />
                    <span>Apr 19, 2024 - Apr 25, 2024</span>
                    <ChevronDown size={16} />
                </div>
            )
        });
    }, [setHeaderData]);

    const logs = [
        { id: 1, user: "Amit Sharma", role: "Super Admin", action: "Created", module: "Company", desc: 'Created new company "Tech Solutions"', ip: "192.168.1.1", date: "Apr 25, 2024 10:30 AM" },
        { id: 2, user: "Amit Sharma", role: "Super Admin", action: "Updated", module: "Subscription", desc: 'Updated plan for ABC Pvt Ltd', ip: "192.168.1.1", date: "Apr 25, 2024 09:15 AM" },
        { id: 3, user: "Rahul Verma", role: "Company Admin", action: "Login", module: "Auth", desc: 'User logged in', ip: "192.168.1.5", date: "Apr 25, 2024 08:45 AM" },
        { id: 4, user: "Priya Mehta", role: "Company Admin", action: "Updated", module: "User", desc: 'Added new user in ABC Pvt Ltd', ip: "192.168.1.2", date: "Apr 24, 2024 06:20 PM" },
        { id: 5, user: "Amit Sharma", role: "Super Admin", action: "Payment", module: "Transaction", desc: 'Payment received from XYZ Corp', ip: "192.168.1.1", date: "Apr 24, 2024 04:50 PM" },
        { id: 6, user: "Sandeep Kumar", role: "Company Admin", action: "Updated", module: "Company", desc: 'Updated company profile', ip: "192.168.1.8", date: "Apr 24, 2024 02:30 PM" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Search logs..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <select className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 font-bold">
                        <option>All Actions</option>
                        <option>Created</option>
                        <option>Updated</option>
                        <option>Deleted</option>
                        <option>Login</option>
                    </select>
                    <select className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 font-bold">
                        <option>All Modules</option>
                        <option>Company</option>
                        <option>User</option>
                        <option>Auth</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Module</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Description</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">IP Address</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-slate-700">{log.user}</p>
                                            <p className="text-[10px] text-slate-400 font-medium tracking-tight uppercase">{log.role}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${getActionColor(log.action)}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-600">{log.module}</td>
                                    <td className="px-6 py-4 text-slate-500 italic">"{log.desc}"</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Terminal size={12} />
                                            <span className="font-mono text-xs font-medium">{log.ip}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 font-bold">{log.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium">Showing 1 to 6 of 450 entries</p>
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

export default ActivityLogs;

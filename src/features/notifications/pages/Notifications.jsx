import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Bell, 
    Mail, 
    Smartphone, 
    Settings,
    MoreHorizontal,
    ChevronRight,
    Search,
    Save
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";

// --- Sub-components ---

const SettingsNav = ({ icon, label, active }) => (
    <button className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all ${active ? "bg-workbook-dark text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`} style={active ? {boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'} : {}}>
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-bold text-sm">{label}</span>
        </div>
        <ChevronRight size={16} className={active ? "text-white/70" : "text-slate-300"} />
    </button>
);

const StatusBadge = ({ active }) => (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
        {active ? "Enabled" : "Disabled"}
    </span>
);

const Notifications = () => {
    const { setHeaderData } = useHeader();
    const [activeTab, setActiveTab] = useState("System");

    useEffect(() => {
        setHeaderData({
            title: "Notifications",
            description: "Manage system notifications and alerts.",
            actions: (
                <button className="flex items-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                    <Save size={18} />
                    <span>Save Preferences</span>
                </button>
            )
        });
    }, [setHeaderData]);

    const settings = [
        { id: 1, title: "New company registered", email: true, push: true, inApp: true },
        { id: 2, title: "Subscription expiring soon", email: true, push: true, inApp: true },
        { id: 3, title: "Payment received", email: true, push: false, inApp: true },
        { id: 4, title: "New support ticket", email: true, push: true, inApp: true },
        { id: 5, title: "Ticket status updated", email: true, push: false, inApp: true },
        { id: 6, title: "System maintenance", email: true, push: true, inApp: true },
        { id: 7, title: "Weekly reports", email: true, push: false, inApp: false },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-2">
                <SettingsNav active icon={<Bell size={18} />} label="System" />
                <SettingsNav icon={<Mail size={18} />} label="Email Notifications" />
                <SettingsNav icon={<Smartphone size={18} />} label="Push Notifications" />
                <SettingsNav icon={<Settings size={18} />} label="In-App Notifications" />
            </div>

            {/* Notification Settings Area */}
            <div className="lg:col-span-9 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50">
                        <h2 className="text-xl font-bold text-slate-800">System Notifications</h2>
                        <p className="text-sm text-slate-500">Manage system notifications and alerts.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-500 text-left border-b border-slate-100">
                                    <th className="px-8 py-4 font-semibold uppercase tracking-wider">Notification</th>
                                    <th className="px-8 py-4 font-semibold uppercase tracking-wider text-center">Email</th>
                                    <th className="px-8 py-4 font-semibold uppercase tracking-wider text-center">Push</th>
                                    <th className="px-8 py-4 font-semibold uppercase tracking-wider text-center">In-App</th>
                                    <th className="px-8 py-4 font-semibold uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {settings.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5 font-bold text-slate-700">{item.title}</td>
                                        <td className="px-8 py-5 text-center">
                                            <StatusBadge active={item.email} />
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <StatusBadge active={item.push} />
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <StatusBadge active={item.inApp} />
                                        </td>
                                        <td className="px-8 py-5 text-right">
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
            </div>
        </motion.div>
    );
};

export default Notifications;

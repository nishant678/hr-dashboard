import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Plus, 
    Puzzle, 
    MoreHorizontal, 
    CheckCircle2, 
    XCircle,
    Globe,
    Mail,
    Smartphone,
    Search
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";

const Integrations = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({
            title: "Integrations",
            description: "Manage third-party integrations.",
            actions: (
                <button className="flex items-center justify-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                    <Plus size={18} />
                    <span>Browse More</span>
                </button>
            )
        });
    }, [setHeaderData]);

    const integrations = [
        { id: 1, name: "Google Workspace", desc: "Sync users and groups", status: "Connected", color: "bg-red-50 text-red-600" },
        { id: 2, name: "Slack", desc: "Send notifications to Slack", status: "Connected", color: "bg-purple-50 text-purple-600" },
        { id: 3, name: "Zoom", desc: "Integrate with Zoom", status: "Not Connected", color: "bg-workbook-dark/10 text-workbook-dark" },
        { id: 4, name: "WhatsApp Business", desc: "Send WhatsApp notifications", status: "Not Connected", color: "bg-green-50 text-green-600" },
        { id: 5, name: "Mailchimp", desc: "Email marketing integration", status: "Not Connected", color: "bg-yellow-50 text-yellow-600" },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Integrations Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider">Integration</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider">Description</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider text-center">Status</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {integrations.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${app.color}`}>
                                                <Puzzle size={18} />
                                            </div>
                                            <span className="font-bold text-slate-700">{app.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-slate-500 font-bold">
                                        {app.desc}
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${app.status === "Connected" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-workbook-dark font-bold text-xs uppercase hover:underline">
                                            {app.status === "Connected" ? "Settings" : "Connect"}
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

export default Integrations;

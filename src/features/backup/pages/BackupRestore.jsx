import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Plus, 
    Database, 
    Download, 
    RefreshCcw, 
    Trash2, 
    MoreHorizontal,
    HardDrive,
    ShieldCheck,
    Cloud
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";

// --- Sub-components ---

function BackupInfoCard({ title, status, color }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                <p className={`text-lg font-bold mt-1 ${color}`}>{status}</p>
            </div>
            <div className={`p-3 rounded-xl bg-slate-50 ${color.replace('text', 'text-opacity-20')}`}>
                <HardDrive size={24} className={color} />
            </div>
        </div>
    );
}

const BackupRestore = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({
            title: "Backup & Restore",
            description: "Manage system backups and restore data.",
            actions: (
                <button className="flex items-center justify-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                    <Cloud size={18} />
                    <span>Create Backup</span>
                </button>
            )
        });
    }, [setHeaderData]);

    const backups = [
        { id: 1, name: "System Backup - Apr 25, 2024", type: "Full Backup", size: "2.4 GB", date: "Apr 25, 2024 02:00 AM" },
        { id: 2, name: "System Backup - Apr 24, 2024", type: "Full Backup", size: "2.3 GB", date: "Apr 24, 2024 02:00 AM" },
        { id: 3, name: "System Backup - Apr 23, 2024", type: "Full Backup", size: "2.3 GB", date: "Apr 23, 2024 02:00 AM" },
        { id: 4, name: "Database Backup - Apr 25, 2024", type: "Database Only", size: "850 MB", date: "Apr 25, 2024 02:00 AM" },
        { id: 5, name: "Database Backup - Apr 24, 2024", type: "Database Only", size: "835 MB", date: "Apr 24, 2024 02:00 AM" },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Backup Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BackupInfoCard title="Auto Backup" status="Enabled" color="text-green-600" />
                <BackupInfoCard title="Last Backup" status="Today, 02:00 AM" color="text-workbook-dark" />
                <BackupInfoCard title="Storage Used" status="15.8 GB / 50 GB" color="text-orange-600" />
            </div>

            {/* Backups Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider">Backup Name</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider">Type</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider">Size</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider">Created At</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {backups.map((backup) => (
                                <tr key={backup.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-workbook-dark/10 text-workbook-dark">
                                                <Database size={18} />
                                            </div>
                                            <span className="font-bold text-slate-700">{backup.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-slate-500 font-bold">{backup.type}</span>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-slate-700">{backup.size}</td>
                                    <td className="px-8 py-6 text-slate-500 font-bold">{backup.date}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-workbook-dark" title="Restore">
                                                <RefreshCcw size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-slate-600" title="Download">
                                                <Download size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-red-500" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
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

export default BackupRestore;

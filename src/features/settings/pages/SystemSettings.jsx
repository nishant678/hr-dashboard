import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Save, 
    Globe, 
    Mail, 
    Phone, 
    MapPin, 
    Clock, 
    Calendar, 
    DollarSign, 
    Upload,
    ChevronRight,
    Lock,
    Shield,
    Database,
    Zap,
    Palette
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";

// --- Sub-components ---

function SettingsNav({ icon, label, active }) {
    return (
        <button className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all ${active ? "bg-workbook-dark text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"}`} style={active ? {boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'} : {}}>
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-bold text-sm">{label}</span>
            </div>
            <ChevronRight size={16} className={active ? "text-white/70" : "text-slate-300"} />
        </button>
    );
}

function InputGroup({ label, icon, placeholder }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">{label}</label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {icon}
                </div>
                <input 
                    type="text" 
                    placeholder={placeholder} 
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20 transition-all font-medium text-slate-700"
                />
            </div>
        </div>
    );
}

const SystemSettings = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({
            title: "System Settings",
            description: "Configure system-wide basic settings.",
            actions: (
                <button className="flex items-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                    <Save size={18} />
                    <span>Save Settings</span>
                </button>
            )
        });
    }, [setHeaderData]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-2">
                <SettingsNav active icon={<Globe size={18} />} label="General" />
                <SettingsNav icon={<Mail size={18} />} label="Email Settings" />
                <SettingsNav icon={<Zap size={18} />} label="Payment Settings" />
                <SettingsNav icon={<Shield size={18} />} label="Security" />
                <SettingsNav icon={<Database size={18} />} label="Backup Settings" />
                <SettingsNav icon={<Palette size={18} />} label="API Settings" />
                <SettingsNav icon={<MapPin size={18} />} label="Localization" />
            </div>

            {/* Main Form Area */}
            <div className="lg:col-span-9 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
                <div className="border-b border-slate-50 pb-6">
                    <h2 className="text-xl font-bold text-slate-800">General Settings</h2>
                    <p className="text-sm text-slate-500">Configure system-wide basic settings.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="System Name" icon={<Globe size={16} />} placeholder="Attendance Pro" />
                        <InputGroup label="Support Email" icon={<Mail size={16} />} placeholder="support@attendancepro.com" />
                        <InputGroup label="Contact Number" icon={<Phone size={16} />} placeholder="+1 234 567 890" />
                        <InputGroup label="Timezone" icon={<Clock size={16} />} placeholder="(UTC+05:30) Asia/Kolkata" />
                        <InputGroup label="Date Format" icon={<Calendar size={16} />} placeholder="DD MMM, YYYY" />
                        <InputGroup label="Currency" icon={<DollarSign size={16} />} placeholder="USD ($)" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">System Logo</label>
                        <div className="flex items-center gap-6 p-6 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                <Upload className="text-slate-400" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-700">Choose file</p>
                                <p className="text-xs text-slate-400">No file chosen (PNG, JPG max 2MB)</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default SystemSettings;

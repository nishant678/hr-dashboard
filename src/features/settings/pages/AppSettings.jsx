import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Cpu, 
    Shield, 
    Lock, 
    Database, 
    Palette, 
    Bell, 
    Zap,
    ChevronRight,
    Save
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

function ToggleItem({ title, desc, defaultOn }) {
    const [isOn, setIsOn] = useState(defaultOn);
    return (
        <div className="flex items-center justify-between py-4 group">
            <div className="space-y-1">
                <h4 className="font-bold text-slate-700 group-hover:text-workbook-dark transition-colors">{title}</h4>
                <p className="text-sm text-slate-400">{desc}</p>
            </div>
            <button 
                onClick={() => setIsOn(!isOn)}
                className={`w-12 h-6 rounded-full transition-all relative ${isOn ? "bg-green-500" : "bg-slate-200"}`}
            >
                <motion.div 
                    animate={{ x: isOn ? 26 : 4 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
            </button>
        </div>
    );
}

const AppSettings = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({
            title: "App Settings",
            description: "Enable/Disable application features and preferences.",
            actions: (
                <button className="flex items-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                    <Save size={18} />
                    <span>Save Changes</span>
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
                <SettingsNav active icon={<Cpu size={18} />} label="General" />
                <SettingsNav icon={<Zap size={18} />} label="Features" />
                <SettingsNav icon={<Lock size={18} />} label="Privacy Policy" />
                <SettingsNav icon={<Shield size={18} />} label="Terms & Conditions" />
                <SettingsNav icon={<Palette size={18} />} label="Appearance" />
                <SettingsNav icon={<Database size={18} />} label="Custom Domain" />
                <SettingsNav icon={<Bell size={18} />} label="Maintenance Mode" />
            </div>

            {/* Feature Toggles */}
            <div className="lg:col-span-9 space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div className="border-b border-slate-50 pb-6">
                        <h2 className="text-xl font-bold text-slate-800">Feature Settings</h2>
                        <p className="text-sm text-slate-500">Enable/Disable application features and preferences.</p>
                    </div>

                    <div className="space-y-4 divide-y divide-slate-50">
                        <ToggleItem title="Attendance Module" desc="Enable/Disable attendance tracking for all companies" defaultOn={true} />
                        <ToggleItem title="Leave Module" desc="Enable/Disable leave management module" defaultOn={true} />
                        <ToggleItem title="Expense Module" desc="Enable/Disable expense management module" defaultOn={true} />
                        <ToggleItem title="Timesheet Module" desc="Enable/Disable timesheet management module" defaultOn={false} />
                        <ToggleItem title="Payroll Module" desc="Enable/Disable payroll management module" defaultOn={true} />
                        <ToggleItem title="Notice Board" desc="Enable/Disable notice board for companies" defaultOn={false} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AppSettings;

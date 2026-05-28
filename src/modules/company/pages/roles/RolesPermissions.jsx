import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Users, Briefcase, CalendarDays, CreditCard, Layers, Bell, BarChart2, MapPin, MessageSquare, Eye } from "lucide-react";

const moduleItems = [
    { id: 1, title: "Employee Management", description: "Manage employees, profiles, departments and designations.", features: "12 Features", icon: Users },
    { id: 2, title: "Attendance", description: "Track attendance, shifts, holidays and overtime.", features: "9 Features", icon: CalendarDays },
    { id: 3, title: "Leave Management", description: "Manage leave policies, applications and approvals.", features: "8 Features", icon: CheckCircle2 },
    { id: 4, title: "Payroll", description: "Process payroll, salary components, tax and payslips.", features: "15 Features", icon: CreditCard },
    { id: 5, title: "Asset Management", description: "Track and manage company assets and inventory.", features: "6 Features", icon: Layers },
    { id: 6, title: "Recruitment", description: "Job postings, applicants, interviews and hiring.", features: "10 Features", icon: Briefcase },
    { id: 7, title: "Task Management", description: "Assign tasks, track progress and deadlines.", features: "8 Features", icon: MapPin },
    { id: 8, title: "Expense Management", description: "Track and manage employee expenses.", features: "6 Features", icon: CreditCard },
    { id: 9, title: "Reports & Analytics", description: "Generate detailed reports and analytics.", features: "20+ Reports", icon: BarChart2 },
    { id: 10, title: "Notice Board", description: "Company announcements and notifications.", features: "3 Features", icon: Bell },
    { id: 11, title: "Chat & Communication", description: "Team chat, announcements and messages.", features: "4 Features", icon: MessageSquare },
    { id: 12, title: "GPS Attendance", description: "Enable location-based attendance tracking.", features: "3 Features", icon: MapPin }
];

const RolesPermissions = () => {
    const [selectedCompany, setSelectedCompany] = useState("ABC Pvt. Ltd.");
    const [activeTab, setActiveTab] = useState("module");
    const [enabledModules, setEnabledModules] = useState(moduleItems.map((module) => module.id));

    const handleToggleModule = (id) => {
        setEnabledModules(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleEnableAll = () => setEnabledModules(moduleItems.map((module) => module.id));
    const handleDisableAll = () => setEnabledModules([]);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="w-full lg:w-72">
                        <label className="block text-sm font-medium text-slate-600 mb-2">Select Company</label>
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 focus:border-workbook-dark focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        >
                            <option>ABC Pvt. Ltd.</option>
                            <option>XYZ Solutions</option>
                            <option>Pulse Technologies</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Plan</p>
                            <p className="mt-2 text-lg font-bold text-slate-800">Professional</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Employees</p>
                            <p className="mt-2 text-lg font-bold text-slate-800">120</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Valid Till</p>
                            <p className="mt-2 text-lg font-bold text-slate-800">31 Dec 2025</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{selectedCompany}</p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                            <div className="rounded-2xl bg-slate-50 p-4 shadow-sm">
                                <h2 className="text-xl font-bold text-slate-900">ABC Pvt. Ltd.</h2>
                                <p className="text-sm text-slate-500">admin@abcpvtltd.com</p>
                                <p className="text-sm text-slate-500">+91 98765 43210</p>
                            </div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">
                                <ShieldCheck size={16} />
                                Active
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button onClick={handleEnableAll} className="rounded-2xl border border-workbook-dark bg-workbook-dark px-4 py-3 text-sm font-semibold text-white transition hover:bg-workbook-light">
                            Enable All
                        </button>
                        <button onClick={handleDisableAll} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                            Disable All
                        </button>
                    </div>
                </div>

                <div className="mt-6 border-b border-slate-100 pb-4">
                    <nav className="flex gap-4">
                        <button
                            onClick={() => setActiveTab("module")}
                            className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === "module" ? "bg-workbook-dark text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                        >
                            Module Access
                        </button>
                        <button
                            onClick={() => setActiveTab("summary")}
                            className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === "summary" ? "bg-workbook-dark text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                        >
                            Access Summary
                        </button>
                    </nav>
                </div>

                {activeTab === "module" ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {moduleItems.map((module) => {
                            const Icon = module.icon;
                            const enabled = enabledModules.includes(module.id);
                            return (
                                <div key={module.id} className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-workbook-dark/10 text-workbook-dark">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
                                                <p className="text-sm text-slate-500">{module.features}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleToggleModule(module.id)}
                                            className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${enabled ? "bg-workbook-dark" : "bg-slate-200"}`}
                                        >
                                            <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${enabled ? "translate-x-7" : "translate-x-1"}`} />
                                        </button>
                                    </div>
                                    <p className="mt-4 text-sm leading-6 text-slate-500">{module.description}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Enabled Modules</h3>
                            <p className="mt-3 text-3xl font-bold text-slate-900">{enabledModules.length}</p>
                            <p className="mt-2 text-sm text-slate-500">Modules currently active for this company.</p>
                        </div>
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Disabled Modules</h3>
                            <p className="mt-3 text-3xl font-bold text-slate-900">{moduleItems.length - enabledModules.length}</p>
                            <p className="mt-2 text-sm text-slate-500">Modules currently disabled for this company.</p>
                        </div>
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Last Updated</h3>
                            <p className="mt-3 text-3xl font-bold text-slate-900">Today</p>
                            <p className="mt-2 text-sm text-slate-500">Recent permission changes are saved instantly.</p>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">Use the toggles to control module access for the selected company.</p>
                    <button className="inline-flex items-center justify-center rounded-2xl bg-workbook-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-workbook-light">
                        Save Changes
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default RolesPermissions;

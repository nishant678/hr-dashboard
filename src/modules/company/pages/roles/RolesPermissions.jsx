import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Users,
    Briefcase,
    CalendarDays,
    CreditCard,
    BarChart3,
    Settings,
    ChevronDown,
    MoreHorizontal,
    Copy,
    Search,
    Check,
} from "lucide-react";

const roles = [
    {
        id: 1,
        name: "Company Admin",
        description: "Full access to all modules",
        count: 1,
        color: "bg-blue-100 text-blue-600",
    },
    {
        id: 2,
        name: "HR Manager",
        description: "Manage HR operations",
        count: 2,
        color: "bg-green-100 text-green-600",
    },
    {
        id: 3,
        name: "Department Manager",
        description: "Manage department & team",
        count: 3,
        color: "bg-orange-100 text-orange-600",
    },
    {
        id: 4,
        name: "Team Lead",
        description: "Manage team activities",
        count: 5,
        color: "bg-purple-100 text-purple-600",
    },
    {
        id: 5,
        name: "Accountant",
        description: "Manage finance & payroll",
        count: 2,
        color: "bg-pink-100 text-pink-600",
    },
    {
        id: 6,
        name: "Employee",
        description: "Basic employee access",
        count: 120,
        color: "bg-slate-100 text-slate-600",
    },
];

const permissionModules = [
    {
        id: 1,
        title: "Employee Management",
        icon: Users,
        enabled: true,
        permissions: [
            "View Employees",
            "Add Employees",
            "Edit Employees",
            "Delete Employees",
            "Employee Documents",
            "Import Employees",
        ],
    },
    {
        id: 2,
        title: "Attendance",
        icon: CalendarDays,
        enabled: true,
        permissions: [
            "View Attendance",
            "Add Attendance",
            "Edit Attendance",
            "Delete Attendance",
            "Approve Attendance",
            "Export Attendance",
        ],
    },
    {
        id: 3,
        title: "Leave Management",
        icon: Briefcase,
        enabled: true,
        permissions: [
            "View Leaves",
            "Approve Leaves",
            "Reject Leaves",
            "Manage Leave Policies",
        ],
    },
    {
        id: 4,
        title: "Payroll",
        icon: CreditCard,
        enabled: false,
        permissions: [
            "View Payroll",
            "Generate Salary",
            "Download Payslip",
        ],
    },
    {
        id: 5,
        title: "Reports & Analytics",
        icon: BarChart3,
        enabled: true,
        permissions: [
            "View Reports",
            "Export Reports",
            "Analytics Dashboard",
        ],
    },
    {
        id: 6,
        title: "Settings",
        icon: Settings,
        enabled: false,
        permissions: [
            "General Settings",
            "Security Settings",
            "Email Configuration",
        ],
    },
];

const permissionColumns = [
    "View",
    "Add",
    "Edit",
    "Delete",
    "Approve",
    "Export",
];

const RolesPermissions = () => {
    const [selectedRole, setSelectedRole] = useState(2);
    const [expandedModules, setExpandedModules] = useState([1, 2]);

    const toggleModule = (id) => {
        setExpandedModules((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-[#f6f7fb] p-3 sm:p-4 lg:p-6"
        >
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[320px,1fr]">

                {/* LEFT PANEL */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Roles
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Manage employee roles
                            </p>
                        </div>

                        <button className="rounded-2xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700">
                            + Create Role
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative mt-5">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Search role..."
                            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        />
                    </div>

                    {/* Role List */}
                    <div className="mt-6 space-y-3">
                        {roles.map((role) => (
                            <motion.div
                                whileHover={{ y: -2 }}
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`cursor-pointer rounded-2xl border p-4 transition-all ${selectedRole === role.id
                                        ? "border-violet-200 bg-violet-50 shadow-sm"
                                        : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex gap-3">
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${role.color}`}
                                        >
                                            <Shield size={20} />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900">
                                                {role.name}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {role.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                        {role.count}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

                    {/* TOP HEADER */}
                    <div className="border-b border-slate-100 p-5 sm:p-6">
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                                    <Users size={24} />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            HR Manager
                                        </h2>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            Active
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Manage HR operations and employee related activities
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                                    <Copy size={16} />
                                    Duplicate Role
                                </button>

                                <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                                    <MoreHorizontal size={16} />
                                    More
                                </button>

                                <button className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto p-4 sm:p-6">
                        <div className="min-w-[900px] rounded-2xl border border-slate-200">

                            {/* HEADER */}
                            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                                <div className="p-4 text-sm font-semibold text-slate-700">
                                    Module / Permission
                                </div>

                                {permissionColumns.map((col) => (
                                    <div
                                        key={col}
                                        className="flex items-center justify-center p-4 text-sm font-semibold text-slate-700"
                                    >
                                        {col}
                                    </div>
                                ))}
                            </div>

                            {/* MODULES */}
                            {permissionModules.map((module) => {
                                const Icon = module.icon;
                                const expanded = expandedModules.includes(module.id);

                                return (
                                    <div
                                        key={module.id}
                                        className="border-b border-slate-100 last:border-0"
                                    >
                                        {/* MODULE HEADER */}
                                        <div className="grid grid-cols-7 items-center bg-white">

                                            <button
                                                onClick={() => toggleModule(module.id)}
                                                className="flex items-center gap-3 p-4 text-left"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                                    <Icon size={18} />
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-slate-800">
                                                        {module.title}
                                                    </span>

                                                    <ChevronDown
                                                        size={16}
                                                        className={`transition ${expanded ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </div>
                                            </button>

                                            <div className="col-span-6 flex justify-end pr-6">
                                                <button
                                                    className={`relative h-7 w-14 rounded-full transition ${module.enabled
                                                            ? "bg-green-500"
                                                            : "bg-slate-300"
                                                        }`}
                                                >
                                                    <span
                                                        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${module.enabled ? "right-1" : "left-1"
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* PERMISSION ROWS */}
                                        <AnimatePresence>
                                            {expanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                >
                                                    {module.permissions.map((permission, index) => (
                                                        <div
                                                            key={index}
                                                            className="grid grid-cols-7 border-t border-slate-100"
                                                        >
                                                            <div className="p-4 pl-16 text-sm text-slate-600">
                                                                {permission}
                                                            </div>

                                                            {permissionColumns.map((col, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="flex items-center justify-center p-4"
                                                                >
                                                                    <button className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-violet-600">
                                                                        <Check
                                                                            size={12}
                                                                            className="text-white"
                                                                        />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RolesPermissions;
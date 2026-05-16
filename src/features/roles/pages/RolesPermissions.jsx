import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Plus, 
    Shield, 
    ShieldAlert, 
    ShieldCheck, 
    Users, 
    Settings, 
    MoreHorizontal,
    Edit3,
    Trash2
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";

const RolesPermissions = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({
            title: "Role & Permissions",
            description: "Manage roles and permissions for the system.",
            actions: (
                <button className="flex items-center justify-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                    <Plus size={18} />
                    <span>Add Role</span>
                </button>
            )
        });
    }, [setHeaderData]);

    const roles = [
        { id: 1, name: "Super Admin", users: 1, desc: "Full access to the entire system and all companies.", status: "System Role" },
        { id: 2, name: "Company Admin", users: 24, desc: "Manage specific company and its users, settings, and reports.", status: "Custom Role" },
        { id: 3, name: "HR Manager", users: 50, desc: "Manage employees, leave, and attendance within a company.", status: "Custom Role" },
        { id: 4, name: "Employee", users: 1200, desc: "Basic employee access to own portal and attendance.", status: "System Role" },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Roles Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider">Role Name</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider text-center">Users</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider">Description</th>
                                <th className="px-8 py-4 font-semibold uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {roles.map((role) => (
                                <tr key={role.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${role.name === "Super Admin" ? "bg-red-50 text-red-600" : "bg-workbook-dark/10 text-workbook-dark"}`}>
                                                <Shield size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700">{role.name}</p>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider ${role.status === "System Role" ? "text-slate-400" : "text-orange-500"}`}>
                                                    {role.status}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="flex items-center justify-center gap-1.5 font-bold text-slate-600">
                                            <Users size={14} className="text-slate-300" />
                                            {role.users}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-slate-500 max-w-sm font-medium">
                                        {role.desc}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-workbook-dark font-bold text-xs uppercase">
                                                Manage Permissions
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Note Section */}
            <div className="p-6 bg-workbook-dark/5 rounded-2xl border border-workbook-dark/20">
                <div className="flex gap-4">
                    <div className="p-3 bg-workbook-dark/10 text-workbook-dark rounded-xl h-fit">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-workbook-dark">Permission Management Tips</h4>
                        <p className="text-sm text-workbook-dark/80 mt-1 leading-relaxed font-medium">
                            System roles are pre-defined and cannot be deleted. Custom roles can be edited and deleted as needed. 
                            Always double-check permissions before assigning a role to a large group of users.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RolesPermissions;

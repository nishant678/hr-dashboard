import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, Building2, Clock, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import CompanyStatsCard from "../../components/CompanyStatsCard";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../../../context/AuthContext";
import { withBase } from "../../../../config/apiConfig";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

const CompanyDashboard = () => {
    const { token, companyId } = useAuth();
    const [stats, setStats] = useState({ employees: 0, departments: 0 });
    const [loading, setLoading] = useState(true);

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const fetchStats = useCallback(async () => {
        if (!token) return;
        try {
            const [empRes, deptRes] = await Promise.all([
                fetch(withBase("/api/company-admin/users"), { headers }),
                fetch(withBase("/api/departments?page=0&size=1"), { headers })
            ]);
            const empJson = empRes.ok ? await empRes.json() : { data: [] };
            const deptJson = deptRes.ok ? await deptRes.json() : { data: { totalElements: 0 } };
            setStats({
                employees: Array.isArray(empJson.data) ? empJson.data.length : 0,
                departments: deptJson.data?.totalElements ?? 0
            });
        } catch {
            // silent fallback
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { fetchStats(); }, [fetchStats]);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            <PageHeader title="Dashboard" description="Welcome to your Company Admin Portal" showActions={false} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <CompanyStatsCard title="Total Employees" value={stats.employees} change="Live" isUp={true} icon={Users} color="bg-workbook-dark/10 text-workbook-dark" />
                <CompanyStatsCard title="Departments" value={stats.departments} change="Live" isUp={true} icon={Building2} color="bg-purple-50 text-purple-600" />
                <CompanyStatsCard title="Present Today" value="—" change="Pending" isUp={true} icon={CheckCircle} color="bg-green-50 text-green-600" />
                <CompanyStatsCard title="Pending Approvals" value="—" change="Pending" isUp={false} icon={AlertCircle} color="bg-yellow-50 text-yellow-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <motion.div variants={item} className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">Quick Stats</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><CheckCircle size={20} className="text-green-600" /></div>
                                <div><p className="text-sm text-slate-600">Attendance Rate</p><p className="text-lg font-bold text-slate-800">—</p></div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"><span className="text-green-600 font-bold">→</span></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Clock size={20} className="text-blue-600" /></div>
                                <div><p className="text-sm text-slate-600">Avg Working Hours</p><p className="text-lg font-bold text-slate-800">—</p></div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-blue-600 font-bold">→</span></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center"><TrendingUp size={20} className="text-orange-600" /></div>
                                <div><p className="text-sm text-slate-600">Leave Balance</p><p className="text-lg font-bold text-slate-800">—</p></div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"><span className="text-orange-600 font-bold">→</span></div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item} className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800">Department Summary</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                                <Building2 size={18} className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-slate-800 text-sm">Total Departments</p>
                                <p className="text-slate-500 text-xs">{stats.departments} departments configured</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <Users size={18} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-slate-800 text-sm">Total Employees</p>
                                <p className="text-slate-500 text-xs">{stats.employees} employees across {stats.departments} departments</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div variants={item} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Employee Overview</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Total</span>
                            <span className="text-lg font-bold text-blue-600">{stats.employees}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                            <div className="flex h-full"><div className="flex-1 bg-blue-500"></div></div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Departments</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Total Departments</span>
                            <span className="text-lg font-bold text-purple-600">{stats.departments}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                            <div className="flex h-full"><div className="flex-1 bg-purple-500"></div></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CompanyDashboard;

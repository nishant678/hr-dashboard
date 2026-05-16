import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Building2,
    Clock,
    TrendingUp,
    AlertCircle,
    CheckCircle
} from "lucide-react";
import CompanyStatsCard from "../../components/CompanyStatsCard";
import PageHeader from "../../components/PageHeader";
import { employeesData, attendanceData, leaveRequestsData } from "../../data/dummyData";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

const CompanyDashboard = () => {
    const totalEmployees = employeesData.length;
    const presentToday = attendanceData.filter(a => a.status === "Present").length;
    const pendingLeaves = leaveRequestsData.filter(l => l.status === "Pending").length;
    const departments = 6;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Page Header */}
            <PageHeader
                title="Dashboard"
                description="Welcome to your Company Admin Portal"
                showActions={false}
            />

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <CompanyStatsCard
                    title="Total Employees"
                    value={totalEmployees}
                    change="+8%"
                    isUp={true}
                    icon={Users}
                    color="bg-workbook-dark/10 text-workbook-dark"
                />
                <CompanyStatsCard
                    title="Present Today"
                    value={presentToday}
                    change="+2%"
                    isUp={true}
                    icon={CheckCircle}
                    color="bg-green-50 text-green-600"
                />
                <CompanyStatsCard
                    title="Pending Approvals"
                    value={pendingLeaves}
                    change="+1"
                    isUp={false}
                    icon={AlertCircle}
                    color="bg-yellow-50 text-yellow-600"
                />
                <CompanyStatsCard
                    title="Departments"
                    value={departments}
                    change="No change"
                    isUp={true}
                    icon={Building2}
                    color="bg-purple-50 text-purple-600"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Quick Stats */}
                <motion.div variants={item} className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">Quick Stats</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                                    <CheckCircle size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Attendance Rate</p>
                                    <p className="text-lg font-bold text-slate-800">92.5%</p>
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-green-600 font-bold">↑</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Clock size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Avg Working Hours</p>
                                    <p className="text-lg font-bold text-slate-800">8.5 hrs</p>
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-bold">→</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                                    <TrendingUp size={20} className="text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Leave Balance</p>
                                    <p className="text-lg font-bold text-slate-800">12 Days</p>
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <span className="text-orange-600 font-bold">↓</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Recent Activities */}
                <motion.div variants={item} className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800">Recent Activities</h3>
                        <button className="text-workbook-dark text-xs font-semibold hover:underline">View All</button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <Users size={18} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-slate-800 text-sm">New Employee Added</p>
                                <p className="text-slate-500 text-xs">Sneha Reddy joined the Engineering team</p>
                                <p className="text-slate-400 text-xs mt-1">2 hours ago</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                <CheckCircle size={18} className="text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-slate-800 text-sm">Leave Approved</p>
                                <p className="text-slate-500 text-xs">Priya Sharma's leave request approved for 2024-05-25</p>
                                <p className="text-slate-400 text-xs mt-1">5 hours ago</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 pb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                                <Clock size={18} className="text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-slate-800 text-sm">Attendance Pending</p>
                                <p className="text-slate-500 text-xs">5 employees pending attendance approval</p>
                                <p className="text-slate-400 text-xs mt-1">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Attendance Overview */}
                <motion.div variants={item} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Attendance Summary</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Present</span>
                            <span className="text-lg font-bold text-green-600">{presentToday}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Absent</span>
                            <span className="text-lg font-bold text-red-600">1</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Late</span>
                            <span className="text-lg font-bold text-yellow-600">1</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                            <div className="flex h-full">
                                <div className="flex-[4] bg-green-500"></div>
                                <div className="flex-[1] bg-red-500"></div>
                                <div className="flex-[1] bg-yellow-500"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Leave Status */}
                <motion.div variants={item} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Leave Status</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Approved</span>
                            <span className="text-lg font-bold text-green-600">2</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Pending</span>
                            <span className="text-lg font-bold text-yellow-600">2</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Rejected</span>
                            <span className="text-lg font-bold text-red-600">1</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                            <div className="flex h-full">
                                <div className="flex-[2] bg-green-500"></div>
                                <div className="flex-[2] bg-yellow-500"></div>
                                <div className="flex-[1] bg-red-500"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Employee Overview */}
                <motion.div variants={item} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Employee Overview</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Total</span>
                            <span className="text-lg font-bold text-blue-600">{totalEmployees}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Active</span>
                            <span className="text-lg font-bold text-green-600">7</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Inactive</span>
                            <span className="text-lg font-bold text-red-600">1</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                            <div className="flex h-full">
                                <div className="flex-[7] bg-green-500"></div>
                                <div className="flex-[1] bg-red-500"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CompanyDashboard;

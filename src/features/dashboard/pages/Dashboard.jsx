import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Users, 
    Building2, 
    CreditCard, 
    DollarSign, 
    Ticket, 
    TrendingUp, 
    TrendingDown,
    MoreHorizontal,
    Plus,
    Settings,
    Headphones,
    FileText,
    Activity,
    ArrowUpRight,
    Calendar,
    ChevronDown
} from "lucide-react";
import { useHeader } from "../../../context/HeaderContext";
import RevenueChart from "../../../components/chart/RevenueChart";
import SubscriptionDonut from "../../../components/chart/SubscriptionDonut";

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

// --- Sub-components ---

function StatCard({ title, value, change, isUp, icon, color }) {
    return (
        <motion.div variants={item} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${color}`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? "text-green-500" : "text-red-500"}`}>
                    {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {change}
                </div>
            </div>
            <div className="mt-4">
                <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
                <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">from last month</p>
        </motion.div>
    );
}

function ActivityItem({ title, time, icon, color }) {
    return (
        <div className="flex gap-4 group cursor-pointer">
            <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 ${color}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">{title}</p>
                <p className="text-xs text-slate-400 mt-1">{time}</p>
            </div>
        </div>
    );
}

function CompanyRow({ name, admin, users, plan, status, statusColor }) {
    return (
        <tr className="group hover:bg-slate-50/50 transition-colors">
            <td className="py-4 font-semibold text-slate-700">{name}</td>
            <td className="py-4 text-slate-600">{admin}</td>
            <td className="py-4 text-center text-slate-600">{users}</td>
            <td className="py-4 font-medium text-slate-700">{plan}</td>
            <td className="py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 text-right">
                <button className="p-1.5 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                    <MoreHorizontal size={16} className="text-slate-400" />
                </button>
            </td>
        </tr>
    );
}

function TopCompanyItem({ name, users, max }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-700">{name}</span>
                <span className="text-slate-500">{users}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(users / max) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-workbook-dark rounded-full"
                />
            </div>
        </div>
    );
}

function QuickAction({ icon, label, color }) {
    return (
        <button className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className={`p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform ${color}`}>
                {icon}
            </div>
            <span className="text-[10px] font-bold text-slate-700 text-center uppercase tracking-tight">{label}</span>
        </button>
    );
}

function StatusItem({ label, value, percentage, color }) {
    return (
        <div className="flex items-center gap-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${color}`}></div>
            <span className="text-slate-500 flex-1">{label}</span>
            <span className="font-bold text-slate-800">{value}</span>
            <span className="text-slate-400 text-xs">({percentage})</span>
        </div>
    );
}

function RotateCw({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
    );
}

const Dashboard = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({
            title: "Dashboard",
            description: "Welcome back, Amit Sharma! Here's what's happening.",
            actions: (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors">
                        <Calendar size={16} />
                        <span>Apr 19, 2024 - Apr 25, 2024</span>
                        <ChevronDown size={16} />
                    </div>
                    <button className="flex items-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}>
                        <Plus size={18} />
                        <span className="hidden sm:inline">Add Company</span>
                    </button>
                </div>
            )
        });
    }, [setHeaderData]);

    return (
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 pb-8"
        >
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard 
                    title="Total Companies" 
                    value="24" 
                    change="+12%" 
                    isUp={true} 
                    icon={<Building2 size={24} />} 
                    color="bg-workbook-dark/10 text-workbook-dark" 
                />
                <StatCard 
                    title="Total Users" 
                    value="1,245" 
                    change="+18%" 
                    isUp={true} 
                    icon={<Users size={24} />} 
                    color="bg-purple-50 text-purple-600" 
                />
                <StatCard 
                    title="Active Subscriptions" 
                    value="20" 
                    change="+8%" 
                    isUp={true} 
                    icon={<CreditCard size={24} />} 
                    color="bg-green-50 text-green-600" 
                />
                <StatCard 
                    title="Monthly Revenue" 
                    value="₹8,540.00" 
                    change="+24%" 
                    isUp={true} 
                    icon={<DollarSign size={24} />} 
                    color="bg-orange-50 text-orange-600" 
                />
                <StatCard 
                    title="Open Tickets" 
                    value="15" 
                    change="-5%" 
                    isUp={false} 
                    icon={<Ticket size={24} />} 
                    color="bg-red-50 text-red-600" 
                />
            </div>

            {/* Middle Row: Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Revenue Overview */}
                <motion.div variants={item} className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-slate-800">Revenue Overview</h3>
                            <p className="text-sm text-slate-500">Weekly revenue statistics</p>
                        </div>
                        <select className="bg-slate-50 border-none text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-workbook-dark/10 outline-none">
                            <option>This Week</option>
                            <option>Last Week</option>
                        </select>
                    </div>
                    <RevenueChart />
                </motion.div>

                {/* Subscription Status */}
                <motion.div variants={item} className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">Subscription Status</h3>
                    <SubscriptionDonut />
                    <div className="mt-6 space-y-3">
                        <StatusItem label="Active" value="20" percentage="83.3%" color="bg-green-500" />
                        <StatusItem label="Expiring Soon" value="3" percentage="12.5%" color="bg-orange-500" />
                        <StatusItem label="Expired" value="1" percentage="4.2%" color="bg-red-500" />
                    </div>
                </motion.div>

                {/* Recent Activities */}
                <motion.div variants={item} className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800">Recent Activities</h3>
                        <button className="text-workbook-dark text-xs font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-6 flex-1">
                        <ActivityItem 
                            title='New company "Tech Solutions" added' 
                            time="2 minutes ago" 
                            icon={<Building2 size={16} />} 
                            color="bg-workbook-dark/10 text-workbook-dark" 
                        />
                        <ActivityItem 
                            title='Subscription renewed for "ABC Pvt Ltd"' 
                            time="1 hour ago" 
                            icon={<RotateCw size={16} />} 
                            color="bg-green-50 text-green-600" 
                        />
                        <ActivityItem 
                            title='New user registered in "XYZ Corp"' 
                            time="3 hours ago" 
                            icon={<Users size={16} />} 
                            color="bg-orange-50 text-orange-600" 
                        />
                        <ActivityItem 
                            title='Payment received from "Global Ltd"' 
                            time="5 hours ago" 
                            icon={<DollarSign size={16} />} 
                            color="bg-purple-50 text-purple-600" 
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Row: Table, Top Companies & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Companies Table */}
                <motion.div variants={item} className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800">Recent Companies</h3>
                        <button className="text-workbook-dark text-xs font-semibold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-slate-400 text-left border-b border-slate-50">
                                    <th className="pb-4 font-medium">Company Name</th>
                                    <th className="pb-4 font-medium">Admin Name</th>
                                    <th className="pb-4 font-medium text-center">Users</th>
                                    <th className="pb-4 font-medium">Plan</th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <CompanyRow name="Tech Solutions" admin="Rahul Verma" users="45" plan="Premium" status="Active" statusColor="text-green-600 bg-green-50" />
                                <CompanyRow name="ABC Pvt Ltd" admin="Priya Mehta" users="120" plan="Enterprise" status="Active" statusColor="text-green-600 bg-green-50" />
                                <CompanyRow name="XYZ Corp" admin="Sandeep Kumar" users="80" plan="Standard" status="Expiring Soon" statusColor="text-orange-600 bg-orange-50" />
                                <CompanyRow name="Global Ltd" admin="Neha Singh" users="60" plan="Standard" status="Expired" statusColor="text-red-600 bg-red-50" />
                                <CompanyRow name="Innovatech" admin="Vikram Patel" users="30" plan="Basic" status="Active" statusColor="text-green-600 bg-green-50" />
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Top Companies by Users */}
                <motion.div variants={item} className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800">Top Companies by Users</h3>
                        <button className="text-workbook-dark text-xs font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-5">
                        <TopCompanyItem name="ABC Pvt Ltd" users={120} max={120} />
                        <TopCompanyItem name="XYZ Corp" users={80} max={120} />
                        <TopCompanyItem name="Global Ltd" users={60} max={120} />
                        <TopCompanyItem name="Tech Solutions" users={45} max={120} />
                        <TopCompanyItem name="Innovatech" users={30} max={120} />
                    </div>
                </motion.div>

                {/* Quick Actions Grid */}
                <motion.div variants={item} className="lg:col-span-3">
                    <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <QuickAction icon={<Building2 size={20} />} label="Add Company" color="text-workbook-dark bg-workbook-dark/10" />
                        <QuickAction icon={<Users size={20} />} label="Add User" color="text-purple-600 bg-purple-50" />
                        <QuickAction icon={<FileText size={20} />} label="Manage Plans" color="text-green-600 bg-green-50" />
                        <QuickAction icon={<TrendingUp size={20} />} label="View Reports" color="text-workbook-orange bg-workbook-orange/10" />
                        <QuickAction icon={<Settings size={20} />} label="System Settings" color="text-slate-600 bg-slate-50" />
                        <QuickAction icon={<Headphones size={20} />} label="Support Center" color="text-indigo-600 bg-indigo-50" />
                    </div>
                </motion.div>
            </div>

        </motion.div>
    );
};

export default Dashboard;
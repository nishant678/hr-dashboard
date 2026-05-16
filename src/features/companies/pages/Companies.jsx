import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Search, 
    Filter, 
    Plus, 
    MoreHorizontal, 
    Building2, 
    Globe, 
    Mail, 
    Users as UsersIcon, 
    ChevronLeft, 
    ChevronRight 
} from "lucide-react";
import Modal from "../../../components/common/Modal";
import { useHeader } from "../../../context/HeaderContext";

const Companies = () => {
    const { setHeaderData } = useHeader();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setHeaderData({
            title: "Companies",
            description: "Manage all registered companies in the system.",
            actions: (
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}
                >
                    <Plus size={18} />
                    <span>Add Company</span>
                </button>
            )
        });
    }, [setHeaderData, setIsModalOpen]);

    const companies = [
        { id: 1, name: "Tech Solutions", admin: "Rahul Verma", email: "rahul@tech.com", users: 45, plan: "Premium", status: "Active", date: "Apr 25, 2024" },
        { id: 2, name: "ABC Pvt Ltd", admin: "Priya Mehta", email: "priya@abc.com", users: 120, plan: "Enterprise", status: "Active", date: "Apr 20, 2024" },
        { id: 3, name: "XYZ Corp", admin: "Sandeep Kumar", email: "sandeep@xyz.com", users: 80, plan: "Standard", status: "Expiring Soon", date: "Apr 18, 2024" },
        { id: 4, name: "Global Ltd", admin: "Neha Singh", email: "neha@global.com", users: 60, plan: "Standard", status: "Expired", date: "Apr 15, 2024" },
        { id: 5, name: "Innovatech", admin: "Vikram Patel", email: "vikram@inno.com", users: 30, plan: "Basic", status: "Active", date: "Apr 12, 2024" },
        { id: 6, name: "SoftHub", admin: "Ankit Gupta", email: "ankit@softhub.com", users: 25, plan: "Basic", status: "Active", date: "Apr 10, 2024" },
        { id: 7, name: "Bright Minds", admin: "Pooja Shah", email: "pooja@bright.com", users: 15, plan: "Basic", status: "Active", date: "Apr 05, 2024" },
        { id: 8, name: "Future Systems", admin: "Rohit Yadav", email: "rohit@future.com", users: 10, plan: "Standard", status: "Expiring Soon", date: "Apr 01, 2024" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Active": return "bg-green-50 text-green-600";
            case "Expiring Soon": return "bg-orange-50 text-orange-600";
            case "Expired": return "bg-red-50 text-red-600";
            default: return "bg-slate-50 text-slate-600";
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search company..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-left border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Company Name</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Admin Name</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Users</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Plan</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {companies.map((company) => (
                                <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-workbook-dark/10 text-workbook-dark flex items-center justify-center font-bold">
                                                {company.name.charAt(0)}
                                            </div>
                                            <span className="font-semibold text-slate-700">{company.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{company.admin}</td>
                                    <td className="px-6 py-4 text-slate-500">{company.email}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold text-xs">
                                            {company.users}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-slate-700 font-medium">{company.plan}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(company.status)}`}>
                                            {company.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{company.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                                            <MoreHorizontal size={16} className="text-slate-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium">Showing 1 to 8 of 24 entries</p>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-white border border-slate-200 rounded text-slate-400 disabled:opacity-50" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center bg-workbook-dark text-white text-xs font-bold rounded shadow-sm">1</button>
                        <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">2</button>
                        <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">3</button>
                        <button className="p-1 hover:bg-white border border-slate-200 rounded text-slate-400">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Company Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Add New Company"
            >
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Company Name</label>
                            <input type="text" placeholder="Enter company name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Admin Name</label>
                            <input type="text" placeholder="Enter admin name" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <input type="email" placeholder="example@company.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Select Plan</label>
                            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700">
                                <option>Basic</option>
                                <option>Standard</option>
                                <option>Premium</option>
                                <option>Enterprise</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Status</label>
                            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700">
                                <option>Active</option>
                                <option>Pending</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 px-4 py-3 bg-workbook-dark text-white font-bold rounded-xl hover:bg-workbook-light shadow-lg transition-all active:scale-95" style={{boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)'}}
                        >
                            Save Company
                        </button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    );
};

export default Companies;

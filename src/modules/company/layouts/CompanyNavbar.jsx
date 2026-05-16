import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";

const CompanyNavbar = ({ toggle, companyName = "Acme Corporation" }) => {
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/auth/login", { replace: true });
    };

    return (
        <div className="min-h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 py-3">
            {/* Left Section: Mobile Menu & Company Info */}
            <div className="flex items-center gap-4">
                <button
                    className="lg:hidden p-2 hover:bg-slate-50 rounded-lg transition-colors"
                    onClick={toggle}
                >
                    <Menu size={24} className="text-slate-600" />
                </button>

                {/* Company Info */}
                <div className="hidden sm:block">
                    <h1 className="text-2xl font-bold text-slate-800 leading-none">{companyName}</h1>
                    <p className="text-sm text-slate-500 mt-1.5 font-medium">Company Admin Dashboard</p>
                </div>
            </div>

            {/* Right Section: Search, Notifications, Profile */}
            <div className="flex items-center gap-3 sm:gap-6">
                {/* Search Box */}
                <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-sm outline-none w-40 placeholder-slate-400"
                    />
                </div>

                {/* Notifications */}
                <div className="relative p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                    <Bell size={22} className="text-slate-600 group-hover:text-workbook-dark" />
                    <span className="absolute top-2 right-2 w-4 h-4 bg-workbook-orange text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold shadow-sm">
                        5
                    </span>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <img
                            src="https://i.pravatar.cc/150?u=company"
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="hidden sm:block text-sm font-medium text-slate-700">Admin</span>
                        <ChevronDown size={16} className="text-slate-400" />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50"
                            >
                                <div className="p-4 border-b border-slate-100">
                                    <p className="font-semibold text-slate-800">Company Admin</p>
                                    <p className="text-xs text-slate-500">Acme Corporation</p>
                                </div>

                                <div className="p-2 space-y-1">
                                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-600 text-sm transition-colors">
                                        <User size={16} />
                                        My Profile
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-600 text-sm transition-colors">
                                        <Settings size={16} />
                                        Settings
                                    </button>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 text-sm border-t border-slate-100 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default CompanyNavbar;

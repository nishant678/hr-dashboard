import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
    LayoutDashboard,
    Building2,
    Users,
    CreditCard,
    ArrowLeftRight,
    FileBarChart,
    Ticket,
    Settings,
    AppWindow,
    Bell,
    History,
    ShieldCheck,
    RotateCcw,
    Puzzle,
    LogOut,
    ChevronRight
} from "lucide-react";
import workBookLogo from "../../assets/work_book_web_logo.png";

const Sidebar = ({ isOpen, toggle }) => {
    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 1024);

    React.useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
        { name: "Companies", icon: <Building2 size={20} />, path: "/companies" },
        { name: "Users", icon: <Users size={20} />, path: "/users" },
        { name: "Subscriptions", icon: <CreditCard size={20} />, path: "/subscriptions" },
        { name: "Transactions", icon: <ArrowLeftRight size={20} />, path: "/transactions" },
        { name: "Reports", icon: <FileBarChart size={20} />, path: "/reports" },
        { name: "Support Tickets", icon: <Ticket size={20} />, path: "/support" },
        { name: "System Settings", icon: <Settings size={20} />, path: "/settings" },
        { name: "App Settings", icon: <AppWindow size={20} />, path: "/app-settings" },
        { name: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
        { name: "Activity Logs", icon: <History size={20} />, path: "/logs" },
        { name: "Role & Permissions", icon: <ShieldCheck size={20} />, path: "/roles" },
        { name: "Backup & Restore", icon: <RotateCcw size={20} />, path: "/backup" },
        { name: "Integrations", icon: <Puzzle size={20} />, path: "/integrations" },
    ];

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/auth/login", { replace: true });
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggle}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={false}
                animate={{ x: isDesktop ? 0 : (isOpen ? 0 : -260) }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className={`
                    fixed top-0 left-0 h-full w-[260px] bg-white border-r border-slate-200 z-50
                    flex flex-col
                `}
            >
                <div className="p-4">
                    <img src={workBookLogo} alt="WorkBook logo" className="w-full h-full object-contain" />
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            onClick={() => window.innerWidth < 1024 && toggle()}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group
                                ${isActive
                                    ? "bg-workbook-dark/10 text-workbook-dark font-medium"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={isActive ? "text-workbook-dark" : "text-slate-400 group-hover:text-slate-600"}>
                                        {item.icon}
                                    </span>
                                    <span className="flex-1">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t border-slate-100 space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="relative">
                            <img
                                src="https://i.pravatar.cc/150?u=amit"
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="font-semibold text-sm truncate">Amit Sharma</p>
                            <p className="text-xs text-slate-500 truncate">Super Admin</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 w-full rounded-lg transition-colors group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;
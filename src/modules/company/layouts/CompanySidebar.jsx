import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { companyMenuItems } from "../config/menuConfig";
import workBookLogo from "../../../assets/work_book_web_logo.png";

const CompanySidebar = ({ isOpen, toggle }) => {
    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 1024);
    const [expandedItems, setExpandedItems] = React.useState({});
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/auth/login", { replace: true });
    };

    React.useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSubmenu = (name) => {
        setExpandedItems(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
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
                className="fixed top-0 left-0 h-full w-[260px] bg-white border-r border-slate-200 z-50 flex flex-col"
            >
                {/* Header */}
                <div className="px-4 py-2">
                    <div className="h-14 flex items-center justify-center">
                        <img src={workBookLogo} alt="WorkBook logo" className="h-10 object-contain" />
                    </div>
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
                    {companyMenuItems.map((item, index) => {
                        const isExpanded = expandedItems[item.name];
                        const hasSubMenu = item.subMenu && item.subMenu.length > 0;

                        return (
                            <div key={index}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => {
                                        if (hasSubMenu) toggleSubmenu(item.name);
                                        if (window.innerWidth < 1024) toggle();
                                    }}
                                    className={({ isActive }) => `
                                        flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative
                                        ${isActive
                                            ? "bg-workbook-dark/10 text-workbook-dark font-medium"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}
                                    `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className={isActive ? "text-workbook-dark" : "text-slate-400 group-hover:text-slate-600"}>
                                                <item.icon size={20} />
                                            </span>
                                            <span className="flex-1 text-sm font-medium">{item.name}</span>
                                            {hasSubMenu && (
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>

                                {/* Submenu */}
                                <AnimatePresence>
                                    {hasSubMenu && isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-1 mt-1 ml-2"
                                        >
                                            {item.subMenu.map((subItem, subIndex) => (
                                                <NavLink
                                                    key={subIndex}
                                                    to={subItem.path}
                                                    onClick={() => window.innerWidth < 1024 && toggle()}
                                                    className={({ isActive }) => `
                                                            flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all
                                                            ${isActive
                                                            ? "bg-workbook-dark/5 text-workbook-dark font-medium border-l-2 border-workbook-dark pl-3"
                                                            : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}
                                                        `}
                                                >
                                                    {subItem.name}
                                                </NavLink>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t border-slate-100 space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="relative">
                            <img
                                src="https://i.pravatar.cc/150?u=company"
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="font-semibold text-sm truncate">Company Admin</p>
                            <p className="text-xs text-slate-500 truncate">Acme Corporation</p>
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

export default CompanySidebar;

import React from "react";
import { Bell, Menu } from "lucide-react";
import { useHeader } from "../../context/HeaderContext";

const Navbar = ({ toggle }) => {
    const { headerData } = useHeader();

    return (
        <div className="min-h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 py-3">
            
            {/* Left Section: Mobile Menu & Logo & Dynamic Title */}
            <div className="flex items-center gap-4">
                <button
                    className="lg:hidden p-2 hover:bg-slate-50 rounded-lg transition-colors"
                    onClick={toggle}
                >
                    <Menu size={24} className="text-slate-600" />
                </button>
                 
                <div className="hidden sm:block">
                    <h1 className="text-2xl font-bold text-slate-800 leading-none">{headerData.title}</h1>
                    {headerData.description && (
                        <p className="text-sm text-slate-500 mt-1.5 font-medium">{headerData.description}</p>
                    )}
                </div>
            </div>

            {/* Right Section: Actions (Injected from Pages) */}
            <div className="flex items-center gap-3 sm:gap-6">
                
                {/* Dynamic Actions from Context */}
                <div className="hidden md:flex flex-col items-end">
                    {headerData.actions}
                </div>

                {/* Notifications (Always visible) */}
                <div className="relative p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                    <Bell size={22} className="text-slate-600 group-hover:text-workbook-dark" />
                    <span className="absolute top-2 right-2 w-4 h-4 bg-workbook-orange text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold shadow-sm">
                        3
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
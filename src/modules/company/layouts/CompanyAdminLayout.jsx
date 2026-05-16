import React, { useState } from "react";
import CompanySidebar from "./CompanySidebar";
import CompanyNavbar from "./CompanyNavbar";

const CompanyAdminLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* Company Sidebar */}
            <CompanySidebar isOpen={isOpen} toggle={toggle} />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 lg:ml-[260px] min-w-0 min-h-0">
                {/* Navbar */}
                <CompanyNavbar toggle={toggle} />

                {/* Content */}
                <main className="flex-1 min-h-0 overflow-auto p-4 lg:p-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="sticky bottom-0 z-20 px-8 py-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
                    <p>© 2024 WorkBook - Company Admin Panel</p>
                    <p>Version 1.0.0</p>
                </footer>
            </div>
        </div>
    );
};

export default CompanyAdminLayout;

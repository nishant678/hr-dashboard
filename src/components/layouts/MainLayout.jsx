import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">

            {/* Sidebar */}
            <Sidebar isOpen={isOpen} toggle={toggle} />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 lg:ml-[260px] min-w-0 min-h-0">

                {/* Navbar */}
                <Navbar toggle={toggle} />

                {/* Content */}
                <main className="flex-1 min-h-0 overflow-auto p-4 lg:p-8">
                    {children}
                </main>

                {/* Footer */}
                <Footer />
            </div>

        </div>
    );
};

export default MainLayout;
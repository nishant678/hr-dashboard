import React from "react";

const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="inline-flex overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            {tabs.map(tab => (
                <button
                    key={tab.value}
                    onClick={() => onTabChange(tab.value)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:bg-white"}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;

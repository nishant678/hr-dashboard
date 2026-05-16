import React from "react";

const StatsCard = ({ title, value, subtitle, icon, className = "" }) => {
    return (
        <div className={`rounded-3xl border border-slate-100 bg-white p-6 shadow-sm ${className}`}>
            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-sm text-slate-500">{title}</p>
                {icon && <div className="text-workbook-dark">{icon}</div>}
            </div>
            <div>
                <p className="text-3xl font-semibold text-slate-900">{value}</p>
                {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
            </div>
        </div>
    );
};

export default StatsCard;

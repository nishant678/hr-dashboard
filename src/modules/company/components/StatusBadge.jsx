import React from "react";

const StatusBadge = ({ status, variant = "default" }) => {
    const variants = {
        active: "bg-green-50 text-green-700 border border-green-100",
        inactive: "bg-slate-50 text-slate-700 border border-slate-100",
        pending: "bg-yellow-50 text-yellow-700 border border-yellow-100",
        rejected: "bg-red-50 text-red-700 border border-red-100",
        approved: "bg-green-50 text-green-700 border border-green-100",
        default: "bg-slate-50 text-slate-700 border border-slate-100"
    };

    const variantClass = variants[variant] || variants.default;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${variantClass}`}>
            {status}
        </span>
    );
};

export default StatusBadge;

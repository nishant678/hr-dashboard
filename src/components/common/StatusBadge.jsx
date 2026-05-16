import React from "react";

const variants = {
    active: "bg-green-50 text-green-700",
    approved: "bg-teal-50 text-teal-700",
    pending: "bg-yellow-50 text-yellow-700",
    rejected: "bg-red-50 text-red-700",
    default: "bg-slate-50 text-slate-700"
};

const StatusBadge = ({ status, variant = "default" }) => {
    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${variants[variant] || variants.default}`}>
            {status}
        </span>
    );
};

export default StatusBadge;

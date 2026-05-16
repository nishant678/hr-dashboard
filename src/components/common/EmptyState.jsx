import React from "react";

const EmptyState = ({ title, description, action }) => {
    return (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center">
            <p className="text-lg font-semibold text-slate-800">{title || "Nothing to show yet"}</p>
            {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
};

export default EmptyState;

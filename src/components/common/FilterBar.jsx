import React from "react";

const FilterBar = ({ children }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            {children}
        </div>
    );
};

export default FilterBar;

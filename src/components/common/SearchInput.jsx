import React from "react";
import { Search } from "lucide-react";

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">
            <Search size={18} className="text-slate-400" />
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm outline-none text-slate-700"
            />
        </div>
    );
};

export default SearchInput;

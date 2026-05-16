import React, { useState, useRef, useEffect } from "react";

const ActionDropdown = ({ label = "Actions", options = [] }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button onClick={() => setOpen(!open)} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                {label}
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white shadow-xl">
                    {options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => { option.onClick(); setOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActionDropdown;

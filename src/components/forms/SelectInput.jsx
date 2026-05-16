import React from "react";

const SelectInput = ({ label, value, onChange, options = [] }) => (
    <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
        <select
            value={value}
            onChange={onChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-workbook-dark focus:ring-2 focus:ring-workbook-dark/20"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

export default SelectInput;

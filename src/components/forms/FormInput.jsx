import React from "react";

const FormInput = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-workbook-dark focus:ring-2 focus:ring-workbook-dark/20"
        />
    </div>
);

export default FormInput;

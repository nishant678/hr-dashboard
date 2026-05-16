import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";

const AddEmployee = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        department: "Engineering",
        designation: "Developer",
        phone: "",
        startDate: ""
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Employee ${form.name} would be added in production with this form.`);
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Add Employee"
                description="Create a new employee record for your company"
            />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                            <input
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                                placeholder="john.doe@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                            <select
                                value={form.department}
                                onChange={(e) => handleChange("department", e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            >
                                <option>Engineering</option>
                                <option>HR</option>
                                <option>Finance</option>
                                <option>Marketing</option>
                                <option>Sales</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Designation</label>
                            <input
                                value={form.designation}
                                onChange={(e) => handleChange("designation", e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                                placeholder="Senior Developer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                            <input
                                value={form.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                                placeholder="9876543210"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                            <input
                                type="date"
                                value={form.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            />
                        </div>
                    </div>

                    <div className="xl:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-workbook-dark text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-workbook-light transition-all"
                        >
                            Save Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Download } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { payrollData } from "../../data/dummyData";

const Payroll = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [monthFilter, setMonthFilter] = useState("All");

    const filteredPayroll = payrollData.filter(record => {
        const matchesSearch = record.employee.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMonth = monthFilter === "All" || record.month === monthFilter;
        return matchesSearch && matchesMonth;
    });

    const months = ["All", ...new Set(payrollData.map(p => p.month))];

    const columns = [
        {
            key: "employee",
            label: "Employee",
            width: "150px",
            render: (value) => <span className="font-medium text-slate-800">{value}</span>
        },
        {
            key: "month",
            label: "Month",
            width: "120px"
        },
        {
            key: "salary",
            label: "Salary",
            width: "110px",
            render: (value) => <span className="font-medium text-slate-800">₹{value.toLocaleString()}</span>
        },
        {
            key: "bonus",
            label: "Bonus",
            width: "100px",
            render: (value) => <span className="text-green-600">+₹{value.toLocaleString()}</span>
        },
        {
            key: "deductions",
            label: "Deductions",
            width: "120px",
            render: (value) => <span className="text-red-600">-₹{value.toLocaleString()}</span>
        },
        {
            key: "netSalary",
            label: "Net Salary",
            width: "130px",
            render: (value) => <span className="font-bold text-workbook-dark">₹{value.toLocaleString()}</span>
        },
        {
            key: "status",
            label: "Status",
            width: "100px",
            render: (value) => (
                <StatusBadge
                    status={value}
                    variant={value === "Paid" ? "approved" : "pending"}
                />
            )
        }
    ];

    const totalSalary = filteredPayroll.reduce((sum, p) => sum + p.salary, 0);
    const totalBonus = filteredPayroll.reduce((sum, p) => sum + p.bonus, 0);
    const totalDeductions = filteredPayroll.reduce((sum, p) => sum + p.deductions, 0);
    const totalNetSalary = filteredPayroll.reduce((sum, p) => sum + p.netSalary, 0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Payroll Management"
                description="Manage employee salaries, bonuses, and deductions"
            />

            {/* Filters */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Search Employee</label>
                        <input
                            type="text"
                            placeholder="Search by employee name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        />
                    </div>

                    {/* Month Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Month</label>
                        <select
                            value={monthFilter}
                            onChange={(e) => setMonthFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        >
                            {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-600 mb-2">Total Salary</p>
                    <p className="text-2xl font-bold text-slate-800">₹{totalSalary.toLocaleString()}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <p className="text-sm text-green-700 mb-2">Total Bonus</p>
                    <p className="text-2xl font-bold text-green-600">₹{totalBonus.toLocaleString()}</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-sm text-red-700 mb-2">Total Deductions</p>
                    <p className="text-2xl font-bold text-red-600">₹{totalDeductions.toLocaleString()}</p>
                </div>

                <div className="bg-workbook-dark/10 p-4 rounded-lg border border-workbook-dark/20">
                    <p className="text-sm text-workbook-dark mb-2">Total Net Salary</p>
                    <p className="text-2xl font-bold text-workbook-dark">₹{totalNetSalary.toLocaleString()}</p>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredPayroll}
                pagination={true}
                pageSize={10}
            />
        </motion.div>
    );
};

export default Payroll;

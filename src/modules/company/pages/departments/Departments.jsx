import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { departmentsData } from "../../data/dummyData";

const Departments = () => {
    const [departments, setDepartments] = useState(departmentsData);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.head.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: "name",
            label: "Department Name",
            width: "150px",
            render: (value) => <span className="font-medium text-slate-800">{value}</span>
        },
        {
            key: "head",
            label: "Department Head",
            width: "150px"
        },
        {
            key: "employees",
            label: "Employees",
            width: "110px",
            render: (value) => <span className="font-medium text-slate-800">{value}</span>
        },
        {
            key: "budget",
            label: "Budget",
            width: "130px",
            render: (value) => <span className="font-medium text-slate-800">₹{value.toLocaleString()}</span>
        },
        {
            key: "status",
            label: "Status",
            width: "100px",
            render: (value) => (
                <StatusBadge status={value} variant="active" />
            )
        }
    ];

    const handleAdd = () => {
        alert("Add department form would open here");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Departments"
                description="Manage company departments and structure"
                onAdd={handleAdd}
            />

            {/* Filters */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                    <input
                        type="text"
                        placeholder="Search by department name or head..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                    />
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredDepartments}
                pagination={true}
                pageSize={10}
            />

            {/* Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <p className="text-slate-600 text-sm">Total Departments</p>
                        <p className="text-3xl font-bold text-slate-800">{filteredDepartments.length}</p>
                    </div>
                    <div>
                        <p className="text-slate-600 text-sm">Total Employees</p>
                        <p className="text-3xl font-bold text-slate-800">
                            {filteredDepartments.reduce((sum, d) => sum + d.employees, 0)}
                        </p>
                    </div>
                    <div>
                        <p className="text-slate-600 text-sm">Total Budget</p>
                        <p className="text-3xl font-bold text-slate-800">
                            ₹{filteredDepartments.reduce((sum, d) => sum + d.budget, 0).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Departments;

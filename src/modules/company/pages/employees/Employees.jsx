import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { employeesData } from "../../data/dummyData";

const Employees = () => {
    const [employees, setEmployees] = useState(employeesData);
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All");

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDept = departmentFilter === "All" || emp.department === departmentFilter;

        return matchesSearch && matchesDept;
    });

    const departments = ["All", ...new Set(employees.map(emp => emp.department))];

    const columns = [
        {
            key: "id",
            label: "Employee ID",
            width: "120px"
        },
        {
            key: "name",
            label: "Name",
            width: "180px",
            render: (value) => <span className="font-medium text-slate-800">{value}</span>
        },
        {
            key: "email",
            label: "Email",
            width: "200px"
        },
        {
            key: "department",
            label: "Department",
            width: "120px"
        },
        {
            key: "designation",
            label: "Designation",
            width: "140px"
        },
        {
            key: "status",
            label: "Status",
            width: "100px",
            render: (value) => (
                <StatusBadge
                    status={value}
                    variant={value === "Active" ? "active" : "inactive"}
                />
            )
        }
    ];

    const handleAddEmployee = () => {
        alert("Add employee form would open here");
    };

    const handleEdit = (employee) => {
        alert(`Edit employee: ${employee.name}`);
    };

    const handleDelete = (employee) => {
        if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
            setEmployees(employees.filter(e => e.id !== employee.id));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Employees"
                description="Manage your team members and their information"
                onAdd={handleAddEmployee}
            />

            {/* Filters */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                        <input
                            type="text"
                            placeholder="Search by name, email, or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        />
                    </div>

                    {/* Department Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                        <select
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        >
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredEmployees}
                pageSize={10}
                onAction={(employee) => {
                    alert(`Actions for ${employee.name}`);
                }}
            />

            {/* Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-slate-600 text-sm">Total Employees</p>
                        <p className="text-3xl font-bold text-slate-800">{filteredEmployees.length}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-slate-600 text-sm">Active</p>
                            <p className="text-2xl font-bold text-green-600">
                                {filteredEmployees.filter(e => e.status === "Active").length}
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-600 text-sm">Inactive</p>
                            <p className="text-2xl font-bold text-red-600">
                                {filteredEmployees.filter(e => e.status === "Inactive").length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Employees;

import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { attendanceData } from "../../data/dummyData";

const Attendance = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredData = attendanceData.filter(record => {
        const matchesSearch = record.employee.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || record.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const columns = [
        {
            key: "employee",
            label: "Employee",
            width: "150px",
            render: (value) => <span className="font-medium text-slate-800">{value}</span>
        },
        {
            key: "date",
            label: "Date",
            width: "120px"
        },
        {
            key: "checkIn",
            label: "Check In",
            width: "100px",
            render: (value) => <span className={value ? "text-slate-800" : "text-slate-400"}>{value || "N/A"}</span>
        },
        {
            key: "checkOut",
            label: "Check Out",
            width: "100px",
            render: (value) => <span className={value ? "text-slate-800" : "text-slate-400"}>{value || "N/A"}</span>
        },
        {
            key: "hours",
            label: "Hours",
            width: "80px",
            render: (value) => <span className="font-medium text-slate-800">{value}</span>
        },
        {
            key: "status",
            label: "Status",
            width: "100px",
            render: (value) => (
                <StatusBadge
                    status={value}
                    variant={
                        value === "Present" ? "active" :
                        value === "Absent" ? "rejected" :
                        value === "Late" ? "pending" : "default"
                    }
                />
            )
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Daily Attendance"
                description="Track employee attendance for today"
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

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        >
                            <option value="All">All Status</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <p className="text-sm text-green-700">Present</p>
                    <p className="text-2xl font-bold text-green-600">{filteredData.filter(r => r.status === "Present").length}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-sm text-red-700">Absent</p>
                    <p className="text-2xl font-bold text-red-600">{filteredData.filter(r => r.status === "Absent").length}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <p className="text-sm text-yellow-700">Late</p>
                    <p className="text-2xl font-bold text-yellow-600">{filteredData.filter(r => r.status === "Late").length}</p>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredData}
                pagination={true}
                pageSize={10}
            />
        </motion.div>
    );
};

export default Attendance;

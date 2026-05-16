import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { leaveRequestsData } from "../../data/dummyData";

const Leave = () => {
    const [leaves, setLeaves] = useState(leaveRequestsData);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredLeaves = leaves.filter(leave => {
        const matchesSearch = leave.employee.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || leave.status === statusFilter;
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
            key: "type",
            label: "Leave Type",
            width: "130px"
        },
        {
            key: "startDate",
            label: "Start Date",
            width: "110px"
        },
        {
            key: "endDate",
            label: "End Date",
            width: "110px"
        },
        {
            key: "days",
            label: "Days",
            width: "70px",
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
                        value === "Approved" ? "approved" :
                        value === "Pending" ? "pending" :
                        value === "Rejected" ? "rejected" : "default"
                    }
                />
            )
        }
    ];

    const handleApprove = (leave) => {
        setLeaves(leaves.map(l => l.id === leave.id ? { ...l, status: "Approved" } : l));
    };

    const handleReject = (leave) => {
        setLeaves(leaves.map(l => l.id === leave.id ? { ...l, status: "Rejected" } : l));
    };

    const stats = {
        approved: leaves.filter(l => l.status === "Approved").length,
        pending: leaves.filter(l => l.status === "Pending").length,
        rejected: leaves.filter(l => l.status === "Rejected").length,
        total: leaves.reduce((sum, l) => sum + l.days, 0)
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Leave Requests"
                description="Manage employee leave requests and approvals"
            />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={18} className="text-green-600" />
                        <p className="text-sm text-green-700">Approved</p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-yellow-600" />
                        <p className="text-sm text-yellow-700">Pending</p>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle size={18} className="text-red-600" />
                        <p className="text-sm text-red-700">Rejected</p>
                    </div>
                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700 mb-2">Total Days Used</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                </div>
            </div>

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
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredLeaves}
                pagination={true}
                pageSize={10}
            />
        </motion.div>
    );
};

export default Leave;

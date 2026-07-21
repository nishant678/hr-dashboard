import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../../../context/AuthContext";
import { withBase } from "../../../../config/apiConfig";

const Leave = () => {
    const { token } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const fetchLeaves = useCallback(async () => {
        try {
            const res = await fetch(withBase("/api/leaves"), { headers });
            const json = await res.json();
            setLeaves(json.data || []);
        } catch (e) {
            console.error("Failed to fetch leaves", e);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { fetchLeaves(); }, [fetchLeaves]);

    const handleApprove = async (id) => {
        try {
            const res = await fetch(withBase(`/api/leaves/${id}/approve`), { method: "PUT", headers });
            const json = await res.json();
            if (json.success) fetchLeaves();
        } catch (e) {
            console.error("Failed to approve leave", e);
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await fetch(withBase(`/api/leaves/${id}/reject`), {
                method: "PUT",
                headers,
                body: JSON.stringify({ rejectionReason: "Rejected by admin" }),
            });
            const json = await res.json();
            if (json.success) fetchLeaves();
        } catch (e) {
            console.error("Failed to reject leave", e);
        }
    };

    const filteredLeaves = leaves.filter(leave => {
        const matchesSearch = (leave.userName || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || leave.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const columns = [
        {
            key: "userName",
            label: "Employee",
            width: "150px",
            render: (value) => <span className="font-medium text-slate-800">{value || "—"}</span>
        },
        { key: "leaveType", label: "Leave Type", width: "110px" },
        { key: "fromDate", label: "Start Date", width: "110px" },
        { key: "toDate", label: "End Date", width: "110px" },
        { key: "reason", label: "Reason", width: "200px" },
        {
            key: "status",
            label: "Status",
            width: "100px",
            render: (value) => (
                <StatusBadge
                    status={value}
                    variant={
                        value === "APPROVED" ? "approved" :
                        value === "PENDING" ? "pending" :
                        value === "REJECTED" ? "rejected" : "default"
                    }
                />
            )
        },
        {
            key: "actions",
            label: "Actions",
            width: "160px",
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleApprove(row.id); }}
                        disabled={row.status !== "PENDING"}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            row.status === "PENDING"
                                ? "bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer"
                                : "bg-slate-50 text-slate-400 cursor-not-allowed"
                        }`}
                    >Approve</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleReject(row.id); }}
                        disabled={row.status !== "PENDING"}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            row.status === "PENDING"
                                ? "bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
                                : "bg-slate-50 text-slate-400 cursor-not-allowed"
                        }`}
                    >Reject</button>
                </div>
            )
        }
    ];

    const stats = {
        approved: leaves.filter(l => l.status === "APPROVED").length,
        pending: leaves.filter(l => l.status === "PENDING").length,
        rejected: leaves.filter(l => l.status === "REJECTED").length,
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <PageHeader title="Leave Requests" description="Manage employee leave requests and approvals" />

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
                    <p className="text-sm text-blue-700 mb-2">Total Requests</p>
                    <p className="text-2xl font-bold text-blue-600">{leaves.length}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        >
                            <option value="All">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading leaves...</div>
            ) : (
                <DataTable columns={columns} data={filteredLeaves} pagination={true} pageSize={10} />
            )}
        </motion.div>
    );
};

export default Leave;

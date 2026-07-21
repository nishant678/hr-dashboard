import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { DollarSign, CheckCircle, XCircle, Clock, Plus } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import AddExpenseModal from "./AddExpenseModal";
import { useAuth } from "../../../../context/AuthContext";
import { withBase } from "../../../../config/apiConfig";

const Expense = () => {
    const { token } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showModal, setShowModal] = useState(false);

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const fetchExpenses = useCallback(async () => {
        try {
            const res = await fetch(withBase("/api/expenses"), { headers });
            const json = await res.json();
            setExpenses(json.data || []);
        } catch (e) {
            console.error("Failed to fetch expenses", e);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { fetchExpenses(); }, [fetchExpenses]);

    const handleApprove = async (id) => {
        try {
            const res = await fetch(withBase(`/api/expenses/${id}/approve`), { method: "PUT", headers });
            const json = await res.json();
            if (json.success) fetchExpenses();
        } catch (e) {
            console.error("Failed to approve expense", e);
        }
    };

    const handleReject = async (id) => {
        const reason = prompt("Rejection reason:");
        if (!reason) return;
        try {
            const res = await fetch(withBase(`/api/expenses/${id}/reject`), {
                method: "PUT",
                headers,
                body: JSON.stringify({ rejectionReason: reason }),
            });
            const json = await res.json();
            if (json.success) fetchExpenses();
        } catch (e) {
            console.error("Failed to reject expense", e);
        }
    };

    const filtered = expenses.filter(e => {
        const q = searchTerm.toLowerCase();
        return (e.userName || "").toLowerCase().includes(q)
            || (e.expenseType || "").toLowerCase().includes(q)
            && (statusFilter === "All" || e.status === statusFilter);
    });

    const columns = [
        {
            key: "userName",
            label: "Employee",
            width: "150px",
            render: (v) => <span className="font-medium text-slate-800">{v || "—"}</span>
        },
        { key: "expenseType", label: "Type", width: "120px" },
        {
            key: "amount",
            label: "Amount",
            width: "100px",
            render: (v) => <span className="font-semibold text-slate-800">${parseFloat(v || 0).toFixed(2)}</span>
        },
        { key: "expenseDate", label: "Date", width: "110px" },
        { key: "description", label: "Description", width: "220px" },
        {
            key: "status",
            label: "Status",
            width: "100px",
            render: (v) => (
                <StatusBadge status={v} variant={v === "APPROVED" ? "approved" : v === "REJECTED" ? "rejected" : "pending"} />
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
        approved: expenses.filter(e => e.status === "APPROVED").reduce((s, e) => s + parseFloat(e.amount || 0), 0),
        pending: expenses.filter(e => e.status === "PENDING").reduce((s, e) => s + parseFloat(e.amount || 0), 0),
        rejected: expenses.filter(e => e.status === "REJECTED").reduce((s, e) => s + parseFloat(e.amount || 0), 0),
        total: expenses.reduce((s, e) => s + parseFloat(e.amount || 0), 0),
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <PageHeader title="Expenses" description="Manage employee expense claims and reimbursements" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={18} className="text-blue-600" />
                        <p className="text-sm text-blue-700">Total</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">${stats.total.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={18} className="text-green-600" />
                        <p className="text-sm text-green-700">Approved</p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">${stats.approved.toFixed(2)}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-yellow-600" />
                        <p className="text-sm text-yellow-700">Pending</p>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">${stats.pending.toFixed(2)}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle size={18} className="text-red-600" />
                        <p className="text-sm text-red-700">Rejected</p>
                    </div>
                    <p className="text-2xl font-bold text-red-600">${stats.rejected.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                            <input
                                type="text"
                                placeholder="Search by employee or type..."
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
                    <button
                        onClick={() => setShowModal(true)}
                        className="ml-4 px-4 py-2 bg-workbook-dark text-white rounded-lg text-sm font-semibold hover:bg-workbook-dark/90 flex items-center gap-2"
                    >
                        <Plus size={16} /> Add Expense
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading expenses...</div>
            ) : (
                <DataTable columns={columns} data={filtered} pagination={true} pageSize={10} />
            )}

            {showModal && (
                <AddExpenseModal
                    onClose={() => setShowModal(false)}
                    onSuccess={() => { setShowModal(false); fetchExpenses(); }}
                />
            )}
        </motion.div>
    );
};

export default Expense;

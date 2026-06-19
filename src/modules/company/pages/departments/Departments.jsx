import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2 } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import Modal from "../../../../components/common/Modal";
import { useAuth } from "../../../../context/AuthContext";
import { withBase } from "../../../../config/apiConfig";

const Departments = () => {
    const { token } = useAuth();
    const [departments, setDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [departmentForm, setDepartmentForm] = useState({ name: "", description: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const [loading, setLoading] = useState(true);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingDepartment, setDeletingDepartment] = useState(null);

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const fetchDepartments = useCallback(async () => {
        if (!token) return;
        setFetchError("");
        try {
            const res = await fetch(withBase("/api/departments?page=0&size=1000"), { headers });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.error || err?.message || `HTTP ${res.status}`);
            }
            const json = await res.json();
            setDepartments(json.data?.content || json.data || []);
        } catch (error) {
            setFetchError(error.message || "Failed to fetch departments");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { fetchDepartments(); }, [fetchDepartments]);

    const handleAdd = () => {
        setEditingDepartment(null);
        setDepartmentForm({ name: "", description: "" });
        setIsModalOpen(true);
    };

    const handleEdit = (dept) => {
        setEditingDepartment(dept);
        setDepartmentForm({ name: dept.name || "", description: dept.description || "" });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (dept) => {
        setDeletingDepartment(dept);
        setIsDeleteModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingDepartment(null);
        setDepartmentForm({ name: "", description: "" });
    };

    const filteredDepartments = departments.filter(dept =>
        (dept.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dept.description ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: "name", label: "Department Name", width: "180px",
            render: (value) => <span className="font-medium text-slate-800">{value}</span>
        },
        { key: "description", label: "Description", width: "300px" },
        {
            key: "active", label: "Status", width: "100px",
            render: (value) => <StatusBadge status={value ? "Active" : "Inactive"} variant={value ? "active" : "inactive"} />
        },
        {
            key: "actions", label: "Actions", width: "120px",
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(row); }}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600 hover:text-blue-700">
                        <Edit3 size={16} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(row); }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-600">
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        if (!departmentForm.name.trim() || isSubmitting) return;
        setIsSubmitting(true);
        setFetchError("");
        try {
            const url = editingDepartment
                ? withBase(`/api/departments/${editingDepartment.id}`)
                : withBase("/api/departments");
            const method = editingDepartment ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers,
                body: JSON.stringify({ name: departmentForm.name, description: departmentForm.description })
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.message || "Failed to save department");
            }
            handleModalClose();
            fetchDepartments();
        } catch (error) {
            setFetchError(error.message || "Failed to save department");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteDepartment = async () => {
        if (!deletingDepartment || isSubmitting) return;
        setIsSubmitting(true);
        setFetchError("");
        try {
            const res = await fetch(withBase(`/api/departments/${deletingDepartment.id}`), {
                method: "DELETE",
                headers
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.message || "Failed to delete department");
            }
            setIsDeleteModalOpen(false);
            setDeletingDepartment(null);
            fetchDepartments();
        } catch (error) {
            setFetchError(error.message || "Failed to delete department");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <PageHeader title="Departments" description="Manage company departments and structure" onAdd={handleAdd} />

            {fetchError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">{fetchError}</div>
            )}

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                    <input type="text" placeholder="Search by department name or description..." value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" />
                </div>
            </div>

            <DataTable columns={columns} data={filteredDepartments} pagination={true} pageSize={10} loading={loading} />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-slate-600 text-sm">Total Departments</p>
                        <p className="text-3xl font-bold text-slate-800">{filteredDepartments.length}</p>
                    </div>
                    <div>
                        <p className="text-slate-600 text-sm">Active</p>
                        <p className="text-3xl font-bold text-green-600">{filteredDepartments.filter(d => d.active).length}</p>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={handleModalClose} title={editingDepartment ? "Edit Department" : "Add Department"} size="md">
                <form onSubmit={handleCreateDepartment} className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Department Name</label>
                        <input value={departmentForm.name} onChange={(e) => setDepartmentForm({ ...departmentForm, name: e.target.value })}
                            type="text" placeholder="Enter department name"
                            className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" required />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Description</label>
                        <textarea value={departmentForm.description} onChange={(e) => setDepartmentForm({ ...departmentForm, description: e.target.value })}
                            placeholder="Enter department description"
                            className="w-full min-h-[120px] px-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" />
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={handleModalClose}
                            className="px-4 py-3 text-slate-700 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
                        <button type="submit" disabled={isSubmitting}
                            className={`px-5 py-3 rounded-2xl text-white transition-all ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-workbook-dark hover:bg-workbook-light"}`}>
                            {isSubmitting ? "Saving..." : editingDepartment ? "Update Department" : "Save Department"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setDeletingDepartment(null); }} title="Delete Department" size="sm">
                <div className="space-y-6">
                    <p className="text-slate-600">
                        Are you sure you want to delete <strong className="text-slate-800">{deletingDepartment?.name}</strong>? This action cannot be undone.
                    </p>
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => { setIsDeleteModalOpen(false); setDeletingDepartment(null); }}
                            className="px-4 py-3 text-slate-700 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
                        <button onClick={handleDeleteDepartment} disabled={isSubmitting}
                            className={`px-5 py-3 rounded-2xl text-white transition-all ${isSubmitting ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}>
                            {isSubmitting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};

export default Departments;

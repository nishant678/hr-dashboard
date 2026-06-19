import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2 } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import Modal from "../../../../components/common/Modal";
import { useAuth } from "../../../../context/AuthContext";
import { withBase } from "../../../../config/apiConfig";

const Designations = () => {
    const { token } = useAuth();
    const [designations, setDesignations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDesignation, setEditingDesignation] = useState(null);
    const [designationForm, setDesignationForm] = useState({ name: "", description: "", departmentId: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const [loading, setLoading] = useState(true);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingDesignation, setDeletingDesignation] = useState(null);

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const fetchDesignations = useCallback(async () => {
        if (!token) return;
        setFetchError("");
        try {
            const res = await fetch(withBase("/api/designations?page=0&size=1000"), { headers });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.error || err?.message || `HTTP ${res.status}`);
            }
            const json = await res.json();
            setDesignations(json.data?.content || json.data || []);
        } catch (error) {
            setFetchError(error.message || "Failed to fetch designations");
        } finally {
            setLoading(false);
        }
    }, [token]);

    const fetchDepartments = useCallback(async () => {
        if (!token) return;
        try {
            const res = await fetch(withBase("/api/departments?page=0&size=1000"), { headers });
            if (!res.ok) return;
            const json = await res.json();
            setDepartments(json.data?.content || json.data || []);
        } catch {
            // silent fallback
        }
    }, [token]);

    useEffect(() => {
        fetchDesignations();
        fetchDepartments();
    }, [fetchDesignations, fetchDepartments]);

    const deptMap = Object.fromEntries(departments.map(d => [d.id, d.name]));

    const handleAdd = () => {
        setEditingDesignation(null);
        setDesignationForm({ name: "", description: "", departmentId: "" });
        setIsModalOpen(true);
    };

    const handleEdit = (desig) => {
        setEditingDesignation(desig);
        setDesignationForm({
            name: desig.name || "",
            description: desig.description || "",
            departmentId: desig.departmentId ?? ""
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (desig) => {
        setDeletingDesignation(desig);
        setIsDeleteModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingDesignation(null);
        setDesignationForm({ name: "", description: "", departmentId: "" });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!designationForm.name.trim() || !designationForm.departmentId || isSubmitting) return;
        setIsSubmitting(true);
        setFetchError("");
        try {
            const url = editingDesignation
                ? withBase(`/api/designations/${editingDesignation.id}`)
                : withBase("/api/designations");
            const method = editingDesignation ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers,
                body: JSON.stringify({
                    name: designationForm.name,
                    description: designationForm.description,
                    departmentId: Number(designationForm.departmentId)
                })
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.message || "Failed to save designation");
            }
            handleModalClose();
            fetchDesignations();
        } catch (error) {
            setFetchError(error.message || "Failed to save designation");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingDesignation || isSubmitting) return;
        setIsSubmitting(true);
        setFetchError("");
        try {
            const res = await fetch(withBase(`/api/designations/${deletingDesignation.id}`), {
                method: "DELETE",
                headers
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.message || "Failed to delete designation");
            }
            setIsDeleteModalOpen(false);
            setDeletingDesignation(null);
            fetchDesignations();
        } catch (error) {
            setFetchError(error.message || "Failed to delete designation");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filtered = designations.filter(item =>
        (item.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        ((deptMap[item.departmentId] || "").toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const columns = [
        { key: "name", label: "Designation", width: "180px", render: (v) => <span className="font-medium text-slate-800">{v}</span> },
        {
            key: "department", label: "Department", width: "160px",
            render: (_, row) => deptMap[row.departmentId] || "-"
        },
        { key: "description", label: "Description", width: "280px" },
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

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <PageHeader title="Designations" description="Manage company job titles and role levels" onAdd={handleAdd} />

            {fetchError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">{fetchError}</div>
            )}

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        placeholder="Search by name, description, or department..." />
                </div>
            </div>

            <DataTable columns={columns} data={filtered} pagination={true} pageSize={10} loading={loading} />

            {/* Add/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={handleModalClose} title={editingDesignation ? "Edit Designation" : "Add Designation"} size="md">
                <form className="space-y-6" onSubmit={handleSave}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                        <select value={designationForm.departmentId}
                            onChange={(e) => setDesignationForm({ ...designationForm, departmentId: e.target.value })}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" required>
                            <option value="">Select department</option>
                            {departments.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Designation Name</label>
                        <input value={designationForm.name}
                            onChange={(e) => setDesignationForm({ ...designationForm, name: e.target.value })}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            placeholder="Enter designation name" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                        <textarea value={designationForm.description}
                            onChange={(e) => setDesignationForm({ ...designationForm, description: e.target.value })}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20 h-28 resize-none"
                            placeholder="Enter a description for this designation" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={handleModalClose}
                            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
                        <button type="submit" disabled={isSubmitting}
                            className={`rounded-2xl px-6 py-3 text-sm text-white transition-all ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-workbook-dark hover:bg-workbook-light"}`}>
                            {isSubmitting ? "Saving..." : editingDesignation ? "Update Designation" : "Save Designation"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setDeletingDesignation(null); }} title="Delete Designation" size="sm">
                <div className="space-y-6">
                    <p className="text-slate-600">
                        Are you sure you want to delete <strong className="text-slate-800">{deletingDesignation?.name}</strong>? This action cannot be undone.
                    </p>
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => { setIsDeleteModalOpen(false); setDeletingDesignation(null); }}
                            className="px-4 py-3 text-slate-700 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
                        <button onClick={handleDelete} disabled={isSubmitting}
                            className={`px-5 py-3 rounded-2xl text-white transition-all ${isSubmitting ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}>
                            {isSubmitting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};

export default Designations;

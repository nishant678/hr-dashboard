import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import Modal from "../../../../components/common/Modal";
import { useAuth } from "../../../../context/AuthContext";
import { withBase } from "../../../../config/apiConfig";

const Designations = () => {
    const { token, companyId } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [designations, setDesignations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [designationForm, setDesignationForm] = useState({ name: "", description: "", departmentId: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState("");

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const fetchDesignations = useCallback(async () => {
        if (!token || !companyId) return;
        setFetchError("");
        try {
            const res = await fetch(withBase(`/api/designations/company/${companyId}`), { headers });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.error || err?.message || `HTTP ${res.status}`);
            }
            const json = await res.json();
            setDesignations(json.data || []);
        } catch (error) {
            setFetchError(error.message || "Failed to fetch designations");
        }
    }, [token, companyId]);

    const fetchDepartments = useCallback(async () => {
        if (!token || !companyId) return;
        try {
            const res = await fetch(withBase(`/api/departments/company/${companyId}`), { headers });
            if (!res.ok) return;
            const json = await res.json();
            setDepartments(json.data || []);
        } catch (error) {
            console.error("Failed to fetch departments", error);
        }
    }, [token, companyId]);

    useEffect(() => {
        fetchDesignations();
        fetchDepartments();
    }, [fetchDesignations, fetchDepartments]);

    const deptMap = Object.fromEntries(departments.map(d => [d.id, d.name]));

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
        }
    ];

    const handleAdd = () => setIsModalOpen(true);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setDesignationForm({ name: "", description: "", departmentId: "" });
        setFetchError("");
    };

    const handleCreateDesignation = async (e) => {
        e.preventDefault();
        if (!designationForm.name.trim() || !designationForm.departmentId || isSubmitting) return;
        setIsSubmitting(true);
        setFetchError("");
        try {
            const res = await fetch(withBase("/api/designations"), {
                method: "POST",
                headers,
                body: JSON.stringify({
                    name: designationForm.name,
                    description: designationForm.description,
                    departmentId: Number(designationForm.departmentId)
                })
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.message || "Failed to create designation");
            }
            handleModalClose();
            fetchDesignations();
        } catch (error) {
            setFetchError(error.message || "Failed to create designation");
        } finally {
            setIsSubmitting(false);
        }
    };

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

            <DataTable columns={columns} data={filtered} pagination={true} pageSize={8} />

            <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Add Designation" size="md">
                <form className="space-y-6" onSubmit={handleCreateDesignation}>
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
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={handleModalClose}
                            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
                        <button type="submit" disabled={isSubmitting}
                            className="rounded-2xl bg-workbook-dark px-6 py-3 text-sm text-white hover:bg-workbook-light transition-all disabled:opacity-50">
                            {isSubmitting ? "Saving..." : "Save Designation"}
                        </button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    );
};

export default Designations;

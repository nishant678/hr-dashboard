import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import EmployeeFormModal from "./EmployeeFormModal";
import { withBase } from "../../../../config/apiConfig";
import { useAuth } from "../../../../context/AuthContext";

const Employees = () => {
    const { token } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [formModal, setFormModal] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const fetchEmployees = useCallback(async () => {
        try {
            const res = await fetch(withBase("/api/company-admin/users"), { headers });
            const json = await res.json();
            setEmployees(json.data || []);
        } catch { /* fallback */ } finally { setLoading(false); }
    }, [token]);

    useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

    const openAdd = () => { setSelectedEmployee(null); setFormModal("add"); };
    const openEdit = (emp) => { setSelectedEmployee(emp); setFormModal("edit"); };
    const openDetail = (emp) => { setSelectedEmployee(emp); setFormModal("view"); };

    const closeFormModal = () => { setFormModal(null); setSelectedEmployee(null); };

    const handleDelete = async (emp) => {
        if (!window.confirm(`Delete ${emp.firstName} ${emp.lastName}?`)) return;
        try {
            const res = await fetch(withBase(`/api/company-admin/users/${emp.id}`), { method: "DELETE", headers });
            if (!res.ok) throw new Error("Delete failed");
            setEmployees(employees.filter(e => e.id !== emp.id));
        } catch (err) { alert(err.message); }
    };

    const filtered = employees.filter(emp => {
        const q = searchTerm.toLowerCase();
        return (emp.firstName + " " + emp.lastName).toLowerCase().includes(q)
            || (emp.email || "").toLowerCase().includes(q)
            || (emp.departmentName || "").toLowerCase().includes(q);
    });

    const columns = [
        {
            key: "name", label: "Name", width: "200px",
            render: (_, row) => <span className="font-medium text-slate-800">{row.firstName} {row.lastName}</span>
        },
        { key: "email", label: "Email", width: "200px" },
        { key: "phone", label: "Phone", width: "130px" },
        { key: "departmentName", label: "Department", width: "130px" },
        { key: "designationName", label: "Designation", width: "140px" },
        { key: "userRoleName", label: "Role", width: "110px" },
        {
            key: "role", label: "Type", width: "100px",
            render: (value) => <StatusBadge status={value} variant={value === "HR" ? "active" : "pending"} />
        },
        {
            key: "actions", label: "Actions", width: "140px",
            render: (_, row) => (
                <div className="flex items-center gap-1 justify-end">
                    <button onClick={(e) => { e.stopPropagation(); openDetail(row); }} className="p-2 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600" title="Details"><Eye size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); openEdit(row); }} className="p-2 hover:bg-amber-50 rounded-lg text-slate-400 hover:text-amber-600" title="Edit"><Pencil size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(row); }} className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600" title="Delete"><Trash2 size={16} /></button>
                </div>
            )
        }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <PageHeader title="Employees" description="Manage your team members" onAdd={openAdd} addLabel="Add New Employee" />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                    <input type="text" placeholder="Search by name, email, or department..." value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" />
                </div>
            </div>

            <DataTable columns={columns} data={filtered} pagination={true} pageSize={10} />

            <EmployeeFormModal
                isOpen={formModal !== null}
                onClose={closeFormModal}
                token={token}
                onSuccess={fetchEmployees}
                mode={formModal}
                employee={selectedEmployee}
            />
        </motion.div>
    );
};

export default Employees;

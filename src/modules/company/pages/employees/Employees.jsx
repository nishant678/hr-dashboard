import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import Modal from "../../components/Modal";
import AddEmployeeModal from "./AddEmployeeModal";
import { withBase } from "../../../../config/apiConfig";
import { useAuth } from "../../../../context/AuthContext";

const emptyForm = {
    firstName: "", lastName: "", email: "", password: "", phone: "",
    role: "EMPLOYEE", departmentId: "", designationId: "", roleId: ""
};

const Employees = () => {
    const { token, companyId } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [roles, setRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detailEmp, setDetailEmp] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const fetchEmployees = useCallback(async () => {
        try {
            const res = await fetch(withBase("/api/company-admin/users"), { headers });
            const json = await res.json();
            setEmployees(json.data || []);
        } catch { /* fallback */ } finally { setLoading(false); }
    }, [token]);

    const fetchDropdowns = useCallback(async () => {
        if (!token || !companyId) return;
        try {
            const [deptRes, desigRes, roleRes] = await Promise.all([
                fetch(withBase(`/api/departments/company/${companyId}`), { headers }),
                fetch(withBase(`/api/designations/company/${companyId}`), { headers }),
                fetch(withBase(`/api/roles/company/${companyId}`), { headers })
            ]);
            const deptJson = deptRes.ok ? await deptRes.json() : { data: [] };
            const desigJson = desigRes.ok ? await desigRes.json() : { data: [] };
            const roleJson = roleRes.ok ? await roleRes.json() : { data: [] };
            setDepartments(deptJson.data || []);
            setDesignations(desigJson.data || []);
            setRoles(roleJson.data || []);
        } catch { /* fallback */ }
    }, [token, companyId]);

    useEffect(() => { fetchEmployees(); fetchDropdowns(); }, [fetchEmployees, fetchDropdowns]);

    const openAdd = () => { setShowAddForm(true); };

    const openEdit = (emp) => {
        setEditingId(emp.id);
        setForm({
            firstName: emp.firstName || "",
            lastName: emp.lastName || "",
            email: emp.email || "",
            password: "",
            phone: emp.phone || "",
            role: emp.role || "EMPLOYEE",
            departmentId: emp.departmentId || "",
            designationId: emp.designationId || "",
            roleId: emp.userRoleId || ""
        });
        setShowForm(true);
    };

    const openDetail = (emp) => { setDetailEmp(emp); setShowDetail(true); };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const body = {
                firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, role: form.role,
                ...(form.password ? { password: form.password } : {}),
                departmentId: form.departmentId ? Number(form.departmentId) : null,
                designationId: form.designationId ? Number(form.designationId) : null,
                roleId: form.roleId ? Number(form.roleId) : null
            };
            const url = editingId
                ? withBase(`/api/company-admin/users/${editingId}`)
                : withBase("/api/company-admin/users");
            const res = await fetch(url, {
                method: editingId ? "PUT" : "POST",
                headers, body: JSON.stringify(body)
            });
            if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Failed"); }
            setShowForm(false);
            fetchEmployees();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

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

    const deptOptions = Array.isArray(departments) ? departments : [];
    const desigOptions = Array.isArray(designations) ? designations : [];
    const roleOptions = Array.isArray(roles) ? roles : [];

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

            <AddEmployeeModal isOpen={showAddForm} onClose={() => setShowAddForm(false)} token={token} onSuccess={fetchEmployees} />

            <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={editingId ? "Edit Employee" : "Add New Employee"} size="lg">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                            <input name="firstName" value={form.firstName} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                            <input name="lastName" value={form.lastName} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{editingId ? "New Password (leave blank to keep)" : "Password *"}</label>
                            <input type="password" name="password" value={form.password} onChange={handleChange} required={!editingId} minLength={editingId ? 0 : 8} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                            <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                            <select name="departmentId" value={form.departmentId} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20">
                                <option value="">Select Department</option>
                                {deptOptions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                            <select name="designationId" value={form.designationId} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20">
                                <option value="">Select Designation</option>
                                {desigOptions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                            <select name="roleId" value={form.roleId} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20">
                                <option value="">Select Role</option>
                                {roleOptions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">User Type *</label>
                            <select name="role" value={form.role} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-workbook-dark/20">
                                <option value="EMPLOYEE">Employee</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>
                    </div>
                    <div className="xl:col-span-2 flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-medium">Cancel</button>
                        <button type="submit" disabled={submitting} className={`px-6 py-2.5 rounded-xl text-white font-medium transition-all shadow-lg ${submitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-workbook-dark hover:bg-workbook-light'}`} style={!submitting ? { boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)' } : {}}>{submitting ? 'Saving...' : editingId ? 'Update Employee' : 'Save Employee'}</button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showDetail} onClose={() => { setShowDetail(false); setDetailEmp(null); }} title="Employee Details" size="md">
                {detailEmp && (
                    <div className="space-y-5">
                        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                            <div className="w-14 h-14 rounded-xl bg-workbook-dark/10 text-workbook-dark flex items-center justify-center text-xl font-bold">
                                {(detailEmp.firstName || "?").charAt(0)}{(detailEmp.lastName || "").charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-slate-800">{detailEmp.firstName} {detailEmp.lastName}</h4>
                                <p className="text-sm text-slate-500">{detailEmp.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">Phone</span><span className="font-medium text-slate-700">{detailEmp.phone || "—"}</span></div>
                            <div><span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">Department</span><span className="font-medium text-slate-700">{detailEmp.departmentName || "—"}</span></div>
                            <div><span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">Designation</span><span className="font-medium text-slate-700">{detailEmp.designationName || "—"}</span></div>
                            <div><span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">Role</span><span className="font-medium text-slate-700">{detailEmp.userRoleName || "—"}</span></div>
                            <div><span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">User Type</span><StatusBadge status={detailEmp.role} variant={detailEmp.role === "HR" ? "active" : "pending"} /></div>
                            <div><span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">Employee ID</span><span className="font-medium text-slate-700">{detailEmp.id}</span></div>
                        </div>
                        <div className="pt-3 flex justify-end">
                            <button onClick={() => { setShowDetail(false); setDetailEmp(null); }} className="px-6 py-2.5 bg-workbook-dark text-white rounded-xl font-medium hover:bg-workbook-light transition-all shadow-lg" style={{ boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)' }}>Close</button>
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
};

export default Employees;

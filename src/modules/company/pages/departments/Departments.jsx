import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import Modal from "../../../../components/common/Modal";
import { useAuth } from "../../../../context/AuthContext";
import { departmentsData } from "../../data/dummyData";

const Departments = () => {
    const { token } = useAuth();
    const [departments, setDepartments] = useState(departmentsData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departmentForm, setDepartmentForm] = useState({ name: "", description: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState("");

    const filteredDepartments = departments.filter(dept =>
        (dept.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dept.head ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: "name",
            label: "Department Name",
            width: "150px",
            render: (value) => <span className="font-medium text-slate-800">{value}</span>
        },
        {
            key: "head",
            label: "Department Head",
            width: "150px"
        },
        {
            key: "employees",
            label: "Employees",
            width: "110px",
            render: (value) => <span className="font-medium text-slate-800">{value}</span>
        },
        {
            key: "budget",
            label: "Budget",
            width: "130px",
            render: (value) => (
                <span className="font-medium text-slate-800">
                    {typeof value === "number" ? `₹${value.toLocaleString()}` : "-"}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            width: "100px",
            render: (value) => (
                <StatusBadge status={value} variant="active" />
            )
        }
    ];

    const handleAdd = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setDepartmentForm({ name: "", description: "" });
    };

    const handleFormChange = (key, value) => {
        setDepartmentForm(prev => ({ ...prev, [key]: value }));
    };

    const fetchDepartments = async () => {
        if (!token) return;
        setFetchError("");

        try {
            const response = await fetch("http://localhost:8080/api/roles/company/1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => null);
                let message = "Failed to fetch departments";
                try {
                    const errorData = errorText ? JSON.parse(errorText) : null;
                    message = errorData?.message || errorData?.error || errorText || message;
                } catch {
                    if (errorText) message = errorText;
                }
                throw new Error(message);
            }

            const text = await response.text();
            let data;
            try {
                data = text ? JSON.parse(text) : {};
            } catch (parseError) {
                throw new Error(`Unexpected response from server: ${text?.slice(0, 250)}`);
            }

            const list = Array.isArray(data?.data)
                ? data.data
                : Array.isArray(data)
                    ? data
                    : [];

            setDepartments(list);
        } catch (error) {
            console.error("Department fetch error:", error);
            setFetchError(error.message || "Failed to fetch departments");
        }
    };

    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        if (!departmentForm.name.trim() || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:8080/api/departments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: departmentForm.name,
                    description: departmentForm.description,
                    companyId: 1
                })
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => null);
                let errorMessage = "Failed to create department";

                try {
                    const errorData = errorText ? JSON.parse(errorText) : null;
                    errorMessage = errorData?.message || errorData?.error || errorText || errorMessage;
                } catch {
                    if (errorText) errorMessage = errorText;
                }

                throw new Error(errorMessage);
            }

            const responseData = await response.json();
            const newDepartment = responseData?.data || responseData;
            setDepartments(prev => [
                {
                    id: newDepartment?.id || `DEPT${Date.now()}`,
                    name: newDepartment?.name || departmentForm.name,
                    head: newDepartment?.head || "TBD",
                    employees: newDepartment?.employees ?? 0,
                    budget: newDepartment?.budget ?? 0,
                    status: newDepartment?.status || "Active",
                    description: newDepartment?.description || departmentForm.description
                },
                ...prev
            ]);
            handleModalClose();
        } catch (error) {
            console.error("Department create error:", error);
            setFetchError(error.message || "Failed to create department");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, [token]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Departments"
                description="Manage company departments and structure"
                onAdd={handleAdd}
            />

            {/* Filters */}
            {fetchError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                    {fetchError}
                </div>
            )}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                    <input
                        type="text"
                        placeholder="Search by department name or head..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                    />
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredDepartments}
                pagination={true}
                pageSize={10}
            />

            {/* Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <p className="text-slate-600 text-sm">Total Departments</p>
                        <p className="text-3xl font-bold text-slate-800">{filteredDepartments.length}</p>
                    </div>
                    <div>
                        <p className="text-slate-600 text-sm">Total Employees</p>
                        <p className="text-3xl font-bold text-slate-800">
                            {filteredDepartments.reduce((sum, d) => sum + d.employees, 0)}
                        </p>
                    </div>
                    <div>
                        <p className="text-slate-600 text-sm">Total Budget</p>
                        <p className="text-3xl font-bold text-slate-800">
                            ₹{filteredDepartments.reduce((sum, d) => sum + d.budget, 0).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Add Department" size="md">
                <form onSubmit={handleCreateDepartment} className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Department Name</label>
                        <input
                            value={departmentForm.name}
                            onChange={(e) => handleFormChange("name", e.target.value)}
                            type="text"
                            placeholder="Enter department name"
                            className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            required
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Description</label>
                        <textarea
                            value={departmentForm.description}
                            onChange={(e) => handleFormChange("description", e.target.value)}
                            placeholder="Enter department description"
                            className="w-full min-h-[120px] px-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        />
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={handleModalClose}
                            className="px-4 py-3 text-slate-700 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-5 py-3 rounded-2xl text-white transition-all ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-workbook-dark hover:bg-workbook-light"}`}
                        >
                            {isSubmitting ? "Saving..." : "Save Department"}
                        </button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    );
};

export default Departments;

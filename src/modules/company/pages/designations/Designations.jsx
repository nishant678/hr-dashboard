import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import Modal from "../../../../components/common/Modal";
import { useAuth } from "../../../../context/AuthContext";
import { designationsData, departmentsData } from "../../data/dummyData";

const Designations = () => {
    const { token } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [designations, setDesignations] = useState(designationsData);
    const [departments, setDepartments] = useState(departmentsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [designationForm, setDesignationForm] = useState({
        name: "",
        description: "",
        departmentId: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState("");

    const filtered = designations.filter(item =>
        (item.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.level ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        ((item.department?.name || item.departmentName || item.department || "").toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const columns = [
        { key: "name", label: "Designation", width: "180px" },
        { key: "department", label: "Department", width: "160px", render: (_, row) => row.department?.name || row.departmentName || row.department || "-" },
        { key: "level", label: "Level", width: "120px" },
        { key: "description", label: "Description", width: "280px" }
    ];

    const handleAdd = () => setIsModalOpen(true);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setDesignationForm({ name: "", description: "", departmentId: "" });
        setFetchError("");
    };

    const handleFormChange = (key, value) => {
        setDesignationForm(prev => ({ ...prev, [key]: value }));
    };

    const fetchDesignations = async () => {
        if (!token) return;
        setFetchError("");

        try {
            const response = await fetch("http://localhost:8080/api/designations/company/1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => null);
                let message = "Failed to fetch designations";
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

            setDesignations(list);
        } catch (error) {
            console.error("Designations fetch error:", error);
            setFetchError(error.message || "Failed to fetch designations");
        }
    };

    const fetchDepartments = async () => {
        if (!token) return;

        try {
            const response = await fetch("http://localhost:8080/api/departments/company/1", {
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
            console.error("Departments fetch error:", error);
        }
    };

    const handleCreateDesignation = async (e) => {
        e.preventDefault();
        if (!designationForm.name.trim() || !designationForm.departmentId || isSubmitting) return;

        setIsSubmitting(true);
        setFetchError("");

        try {
            const response = await fetch("http://localhost:8080/api/designations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: designationForm.name,
                    description: designationForm.description,
                    departmentId: Number(designationForm.departmentId)
                })
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => null);
                let message = "Failed to create designation";
                try {
                    const errorData = errorText ? JSON.parse(errorText) : null;
                    message = errorData?.message || errorData?.error || errorText || message;
                } catch {
                    if (errorText) message = errorText;
                }
                throw new Error(message);
            }

            const responseText = await response.text();
            let responseData;
            try {
                responseData = responseText ? JSON.parse(responseText) : {};
            } catch {
                responseData = {};
            }

            const newDesignation = responseData?.data || responseData;
            const departmentName = departments.find(dept => String(dept.id) === String(designationForm.departmentId))?.name || "-";

            setDesignations(prev => [
                {
                    id: newDesignation?.id || `DES${Date.now()}`,
                    name: newDesignation?.name || designationForm.name,
                    description: newDesignation?.description || designationForm.description,
                    level: newDesignation?.level || "Junior",
                    department: { name: newDesignation?.department?.name || departmentName }
                },
                ...prev
            ]);

            handleModalClose();
        } catch (error) {
            console.error("Create designation error:", error);
            setFetchError(error.message || "Failed to create designation");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!token) return;
        fetchDesignations();
        fetchDepartments();
    }, [token]);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Designations"
                description="Manage company job titles and role levels"
                onAdd={handleAdd}
            />

            {fetchError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                    {fetchError}
                </div>
            )}

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Search Designations</label>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            placeholder="Developer, Manager, Analyst..."
                        />
                    </div>
                </div>

                <DataTable columns={columns} data={filtered} pagination={true} pageSize={8} />
            </div>

            <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Add Designation" size="md">
                <form className="space-y-6" onSubmit={handleCreateDesignation}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                        <select
                            value={designationForm.departmentId}
                            onChange={(e) => handleFormChange("departmentId", e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        >
                            <option value="">Select department</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name || department.departmentName || `Department ${department.id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Designation Name</label>
                        <input
                            value={designationForm.name}
                            onChange={(e) => handleFormChange("name", e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            placeholder="Enter designation name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                        <textarea
                            value={designationForm.description}
                            onChange={(e) => handleFormChange("description", e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20 h-28 resize-none"
                            placeholder="Enter a description for this designation"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleModalClose}
                            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-2xl bg-workbook-dark px-6 py-3 text-sm text-white hover:bg-workbook-light transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : "Save Designation"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Designations;

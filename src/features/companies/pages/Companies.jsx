import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Building2,
    Globe,
    Mail,
    Users as UsersIcon,
    ChevronLeft,
    ChevronRight,
    Pencil,
    Eye,
    X
} from "lucide-react";
import Modal from "../../../components/common/Modal";
import { useHeader } from "../../../context/HeaderContext";
import { useAuth } from "../../../context/AuthContext";
import { withBase } from "../../../config/apiConfig";

const Companies = () => {
    const { setHeaderData } = useHeader();
    const { token } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailCompany, setDetailCompany] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [form, setForm] = useState({
        companyName: "",
        ownerName: "",
        email: "",
        phone: "",
        website: "",
        logoUrl: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        gstNumber: "",
        panNumber: "",
        subscriptionPlan: "TRIAL",
        employeeLimit: 0,
        subscriptionStart: "",
        subscriptionEnd: "",
        timezone: "(GMT+05:30) Asia/Kolkata",
        currency: "INR",
        attendanceMandatory: true,
        autoEmailReports: true,
        adminFirstName: "",
        adminLastName: "",
        industryType: "SOFTWARE",
        adminEmail: "",
        adminPhone: "",
        adminPassword: ""
    });

    const buildAddress = () => {
        const addressParts = [form.addressLine1, form.addressLine2].filter(Boolean);
        return addressParts.join(", ");
    };

    const fetchCompanies = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await fetch(withBase("/api/super-admin/companies"), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Failed to load companies");
            const data = await response.json();
            setCompanies(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setCompanies([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setHeaderData({
            title: "Companies",
            description: "Manage all registered companies in the system.",
            actions: (
                <button
                    onClick={() => { setEditingCompany(null); setLogoFile(null); setLogoPreview(""); setForm(prev => ({ ...prev, logoUrl: "" })); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95" style={{ boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)' }}
                >
                    <Plus size={18} />
                    <span>Add Company</span>
                </button>
            )
        });
        fetchCompanies();
    }, [setHeaderData, token]);

    const filteredCompanies = companies.filter(company => {
        const term = searchTerm.toLowerCase();
        return (
            (company.companyName || company.name || "").toLowerCase().includes(term) ||
            (company.ownerName || "").toLowerCase().includes(term) ||
            (`${company.adminFirstName || ''} ${company.adminLastName || ''}`.toLowerCase().includes(term)) ||
            ((company.email || company.adminEmail || "").toLowerCase().includes(term))
        );
    });

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const openEdit = (company) => {
        setEditingCompany(company);
        setForm({
            companyName: company.companyName || company.name || "",
            ownerName: company.ownerName || "",
            email: company.email || "",
            phone: company.phone || "",
            website: company.website || "",
            logoUrl: company.logoUrl || "",
            addressLine1: company.address || "",
            addressLine2: "",
            city: company.city || "",
            state: company.state || "",
            country: company.country || "",
            postalCode: company.postalCode || "",
            gstNumber: company.gstNumber || "",
            panNumber: company.panNumber || "",
            subscriptionPlan: company.subscriptionPlan || "TRIAL",
            employeeLimit: company.employeeLimit ?? 0,
            subscriptionStart: company.subscriptionStart || "",
            subscriptionEnd: company.subscriptionEnd || "",
            timezone: company.timezone || "(GMT+05:30) Asia/Kolkata",
            currency: company.currency || "INR",
            attendanceMandatory: company.attendanceMandatory ?? true,
            autoEmailReports: company.autoEmailReports ?? true,
            adminFirstName: company.adminFirstName || "",
            adminLastName: company.adminLastName || "",
            industryType: company.industryType || "SOFTWARE",
            adminEmail: company.adminEmail || "",
            adminPhone: company.adminPhone || "",
            adminPassword: ""
        });
        setLogoPreview(company.logoUrl || "");
        setIsModalOpen(true);
    };

    const parseApiError = async (response) => {
        const errorData = await response.json().catch(() => null);
        if (!errorData) return response.statusText || "Unable to create company.";
        if (errorData.message) return errorData.message;
        if (errorData.error) {
            const duplicateMatch = /Key \(([^)]+)\)=\(([^)]+)\)/.exec(errorData.error);
            if (duplicateMatch) {
                return `A company with this ${duplicateMatch[1]} already exists.`;
            }
            return errorData.error;
        }
        return JSON.stringify(errorData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setSubmitError("");
        if (!form.companyName || !form.ownerName || !form.email || !form.phone || !form.adminFirstName || !form.adminEmail || !form.adminPassword) {
            setSubmitError("Please complete all required fields before saving a company.");
            return;
        }

        if (companies.some((company) => company.phone === form.phone)) {
            setSubmitError("A company with this phone number already exists.");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                companyName: form.companyName,
                ownerName: form.ownerName,
                email: form.email,
                phone: form.phone,
                website: form.website,
                logoUrl: logoFile ? "" : form.logoUrl,
                address: buildAddress(),
                city: form.city,
                state: form.state,
                country: form.country,
                postalCode: form.postalCode,
                gstNumber: form.gstNumber,
                panNumber: form.panNumber,
                industryType: form.industryType,
                subscriptionPlan: form.subscriptionPlan,
                employeeLimit: Number(form.employeeLimit),
                subscriptionStart: form.subscriptionStart,
                subscriptionEnd: form.subscriptionEnd,
                timezone: form.timezone,
                currency: form.currency,
                attendanceMandatory: form.attendanceMandatory,
                autoEmailReports: form.autoEmailReports,
                adminFirstName: form.adminFirstName,
                adminLastName: form.adminLastName,
                adminEmail: form.adminEmail,
                adminPhone: form.adminPhone,
                adminPassword: form.adminPassword
            };

            if (logoFile) {
                const base64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result?.split(",")[1] || "");
                    reader.readAsDataURL(logoFile);
                });
                const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY || "YOUR_IMGBB_API_KEY"}`, {
                    method: "POST",
                    body: new URLSearchParams({ image: base64 })
                });
                if (imgbbRes.ok) {
                    const imgData = await imgbbRes.json();
                    payload.logoUrl = imgData.data?.url || imgData.data?.display_url || "";
                }
            }

            const isEdit = !!editingCompany;
            const url = isEdit
                ? withBase(`/api/super-admin/companies/${editingCompany.id}`)
                : withBase("/api/super-admin/create-companies");

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const message = await parseApiError(response);
                throw new Error(message || `Failed to ${isEdit ? 'update' : 'create'} company`);
            }

            await fetchCompanies();
            setIsModalOpen(false);
            setEditingCompany(null);
            setLogoFile(null);
            setLogoPreview("");
            setForm(prev => ({
                ...prev,
                companyName: "",
                ownerName: "",
                email: "",
                phone: "",
                website: "",
                logoUrl: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                gstNumber: "",
                panNumber: "",
                subscriptionPlan: "TRIAL",
                industryType: "SOFTWARE",
                employeeLimit: 0,
                subscriptionStart: "",
                subscriptionEnd: "",
                timezone: "(GMT+05:30) Asia/Kolkata",
                currency: "INR",
                attendanceMandatory: true,
                autoEmailReports: true,
                adminFirstName: "",
                adminLastName: "",
                adminEmail: "",
                adminPhone: "",
                adminPassword: ""
            }));
        } catch (error) {
            console.error(error);
            setSubmitError(error?.message || "Unable to create company. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusStyle = (status) => {
        const s = (status || "").toString().toLowerCase();
        if (s.includes("active")) return "bg-green-50 text-green-600";
        if (s.includes("expiring") || s.includes("soon")) return "bg-orange-50 text-orange-600";
        if (s.includes("expired")) return "bg-red-50 text-red-600";
        return "bg-slate-50 text-slate-600";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-left border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Company Name</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Admin Name</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Users</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Plan</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                                        Loading companies...
                                    </td>
                                </tr>
                            ) : filteredCompanies.length > 0 ? (
                                filteredCompanies.map((company) => {
                                    const name = company.companyName || company.name || "Unknown";
                                    const adminName = `${company.adminFirstName || ""} ${company.adminLastName || ""}`.trim() || company.ownerName || "—";
                                    const email = company.adminEmail || company.email || "—";
                                    const users = company.employeeLimit ?? 0;
                                    const plan = company.subscriptionPlan || company.plan || "N/A";
                                    const status = company.status || "Active";
                                    const date = company.subscriptionStart || company.date || "—";

                                    return (
                                        <tr key={company.id || name} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-workbook-dark/10 text-workbook-dark flex items-center justify-center font-bold">
                                                        {name.charAt(0)}
                                                    </div>
                                                    <span className="font-semibold text-slate-700">{name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">{adminName}</td>
                                            <td className="px-6 py-4 text-slate-500">{email}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold text-xs">
                                                    {users}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-700 font-medium">{plan}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(status)}`}>
                                                    {status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{date}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button onClick={() => { setDetailCompany(company); setShowDetailModal(true); }} className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-slate-400 hover:text-blue-600" title="View Details">
                                                        <Eye size={16} />
                                                    </button>
                                                    <button onClick={() => openEdit(company)} className="p-2 hover:bg-amber-50 rounded-lg transition-colors text-slate-400 hover:text-amber-600" title="Edit Company">
                                                        <Pencil size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                                        No companies found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium">Showing 1 to 8 of 24 entries</p>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-white border border-slate-200 rounded text-slate-400 disabled:opacity-50" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center bg-workbook-dark text-white text-xs font-bold rounded shadow-sm">1</button>
                        <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">2</button>
                        <button className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50">3</button>
                        <button className="p-1 hover:bg-white border border-slate-200 rounded text-slate-400">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add / Edit Company Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingCompany(null); }}
                title={editingCompany ? "Edit Company" : "Add New Company"}
                size="xl"
            >
                <form className="space-y-6 max-h-[70vh] overflow-y-auto" onSubmit={handleSubmit}>
                    {submitError && (
                        <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3">
                            <p className="font-semibold">{editingCompany ? "Unable to update company" : "Unable to create company"}</p>
                            <p className="text-sm mt-1 whitespace-pre-wrap">{submitError}</p>
                        </div>
                    )}
                    {/* Basic Information Section */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Company Name <span className="text-red-500">*</span></label>
                                <input
                                    value={form.companyName}
                                    onChange={(e) => handleChange("companyName", e.target.value)}
                                    type="text"
                                    placeholder="Enter company name"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Owner Name <span className="text-red-500">*</span></label>
                                <input
                                    value={form.ownerName}
                                    onChange={(e) => handleChange("ownerName", e.target.value)}
                                    type="text"
                                    placeholder="Enter owner name"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Company Email <span className="text-red-500">*</span></label>
                                <input
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    type="email"
                                    placeholder="company@example.com"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Company Phone <span className="text-red-500">*</span></label>
                                <input
                                    value={form.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    type="tel"
                                    placeholder="Enter phone number"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Website</label>
                                <input
                                    value={form.website}
                                    onChange={(e) => handleChange("website", e.target.value)}
                                    type="url"
                                    placeholder="https://www.example.com"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Company Logo</label>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Preview" className="h-28 object-contain p-2" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-slate-400">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            <span className="text-xs">Click to upload logo</span>
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setLogoFile(file);
                                            setLogoPreview(URL.createObjectURL(file));
                                            handleChange("logoUrl", "");
                                        }
                                    }} />
                                </label>
                                {logoPreview && (
                                    <button type="button" onClick={() => { setLogoFile(null); setLogoPreview(""); handleChange("logoUrl", ""); }} className="text-xs text-red-500 hover:underline">Remove</button>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">GST Number</label>
                                <input
                                    value={form.gstNumber}
                                    onChange={(e) => handleChange("gstNumber", e.target.value)}
                                    type="text"
                                    placeholder="Enter GST number"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">PAN Number</label>
                                <input
                                    value={form.panNumber}
                                    onChange={(e) => handleChange("panNumber", e.target.value)}
                                    type="text"
                                    placeholder="Enter PAN number"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information Section */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-4">Address Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Address Line 1 <span className="text-red-500">*</span></label>
                                <input
                                    value={form.addressLine1}
                                    onChange={(e) => handleChange("addressLine1", e.target.value)}
                                    type="text"
                                    placeholder="Enter address line 1"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Address Line 2</label>
                                <input
                                    value={form.addressLine2}
                                    onChange={(e) => handleChange("addressLine2", e.target.value)}
                                    type="text"
                                    placeholder="Enter address line 2 (optional)"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Country <span className="text-red-500">*</span></label>
                                <select
                                    value={form.country}
                                    onChange={(e) => handleChange("country", e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                >
                                    <option value="">Select country</option>
                                    <option>India</option>
                                    <option>USA</option>
                                    <option>UK</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">State / Province <span className="text-red-500">*</span></label>
                                <select
                                    value={form.state}
                                    onChange={(e) => handleChange("state", e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                >
                                    <option value="">Select state / province</option>
                                    <option>Karnataka</option>
                                    <option>Maharashtra</option>
                                    <option>Delhi</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">City <span className="text-red-500">*</span></label>
                                <select
                                    value={form.city}
                                    onChange={(e) => handleChange("city", e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                >
                                    <option value="">Select city</option>
                                    <option>Bangalore</option>
                                    <option>Mumbai</option>
                                    <option>Delhi</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">ZIP / Postal Code <span className="text-red-500">*</span></label>
                                <input
                                    value={form.postalCode}
                                    onChange={(e) => handleChange("postalCode", e.target.value)}
                                    type="text"
                                    placeholder="Enter zip / postal code"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Admin Information Section */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-4">Admin Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Admin First Name <span className="text-red-500">*</span></label>
                                <input
                                    value={form.adminFirstName}
                                    onChange={(e) => handleChange("adminFirstName", e.target.value)}
                                    type="text"
                                    placeholder="Enter admin first name"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Admin Last Name <span className="text-red-500">*</span></label>
                                <input
                                    value={form.adminLastName}
                                    onChange={(e) => handleChange("adminLastName", e.target.value)}
                                    type="text"
                                    placeholder="Enter admin last name"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Admin Email <span className="text-red-500">*</span></label>
                                <input
                                    value={form.adminEmail}
                                    onChange={(e) => handleChange("adminEmail", e.target.value)}
                                    type="email"
                                    placeholder="admin@example.com"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Admin Phone <span className="text-red-500">*</span></label>
                                <input
                                    value={form.adminPhone}
                                    onChange={(e) => handleChange("adminPhone", e.target.value)}
                                    type="tel"
                                    placeholder="Enter phone number"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Admin Password <span className="text-red-500">*</span></label>
                                <input
                                    value={form.adminPassword}
                                    onChange={(e) => handleChange("adminPassword", e.target.value)}
                                    type="password"
                                    placeholder="Enter password"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-4">Additional Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Subscription Plan <span className="text-red-500">*</span></label>
                                <select
                                    value={form.subscriptionPlan}
                                    onChange={(e) => handleChange("subscriptionPlan", e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                >
                                    <option value="TRIAL">TRIAL</option>
                                    <option value="BASIC">BASIC</option>
                                    <option value="STANDARD">STANDARD</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Industry Type</label>
                                <select
                                    value={form.industryType}
                                    onChange={(e) => handleChange("industryType", e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                >
                                    <option value="SOFTWARE">SOFTWARE</option>
                                    <option value="FINANCE">FINANCE</option>
                                    <option value="HEALTHCARE">HEALTHCARE</option>
                                    <option value="EDUCATION">EDUCATION</option>
                                    <option value="MANUFACTURING">MANUFACTURING</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Employee Limit</label>
                                <input
                                    value={form.employeeLimit}
                                    onChange={(e) => handleChange("employeeLimit", e.target.value)}
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Currency <span className="text-red-500">*</span></label>
                                <select
                                    value={form.currency}
                                    onChange={(e) => handleChange("currency", e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                >
                                    <option value="INR">INR (₹)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Timezone <span className="text-red-500">*</span></label>
                                <select
                                    value={form.timezone}
                                    onChange={(e) => handleChange("timezone", e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                >
                                    <option>(GMT+05:30) Asia/Kolkata</option>
                                    <option>(GMT-05:00) America/New_York</option>
                                    <option>(GMT+00:00) Europe/London</option>
                                    <option>(GMT+08:00) Asia/Singapore</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Subscription Start</label>
                                <input
                                    value={form.subscriptionStart}
                                    onChange={(e) => handleChange("subscriptionStart", e.target.value)}
                                    type="date"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Subscription End</label>
                                <input
                                    value={form.subscriptionEnd}
                                    onChange={(e) => handleChange("subscriptionEnd", e.target.value)}
                                    type="date"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-700"
                                />
                            </div>
                            <div className="space-y-2 flex items-center gap-3 mt-6">
                                <input
                                    id="attendanceMandatory"
                                    type="checkbox"
                                    checked={form.attendanceMandatory}
                                    onChange={(e) => handleChange("attendanceMandatory", e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-workbook-dark focus:ring-workbook-dark"
                                />
                                <label htmlFor="attendanceMandatory" className="text-sm font-medium text-slate-700">Attendance Mandatory</label>
                            </div>
                            <div className="space-y-2 flex items-center gap-3 mt-6">
                                <input
                                    id="autoEmailReports"
                                    type="checkbox"
                                    checked={form.autoEmailReports}
                                    onChange={(e) => handleChange("autoEmailReports", e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-workbook-dark focus:ring-workbook-dark"
                                />
                                <label htmlFor="autoEmailReports" className="text-sm font-medium text-slate-700">Auto Email Reports</label>
                            </div>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-3 pt-4 border-t border-slate-100">
                        <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded cursor-pointer" defaultChecked />
                        <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer">
                            I confirm that the above information is correct and I agree to the <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a>.
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 px-4 py-3 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-workbook-dark hover:bg-workbook-light'}`}
                            style={!isSubmitting ? { boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)' } : {}}
                        >
                            {isSubmitting ? 'Saving...' : editingCompany ? 'Update Company' : 'Save Company'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Company Detail Modal */}
            <Modal isOpen={showDetailModal} onClose={() => { setShowDetailModal(false); setDetailCompany(null); }} title="Company Details" size="lg">
                {detailCompany && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                            <div className="w-14 h-14 rounded-xl bg-workbook-dark/10 text-workbook-dark flex items-center justify-center text-xl font-bold">
                                {(detailCompany.companyName || detailCompany.name || "?").charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800">{detailCompany.companyName || detailCompany.name}</h4>
                                <p className="text-sm text-slate-500">{detailCompany.industryType || "—"}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Owner</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.ownerName || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.email || detailCompany.adminEmail || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Phone</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.phone || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Website</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.website || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Address</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.address || `${detailCompany.city || ""}, ${detailCompany.state || ""}, ${detailCompany.country || ""}` || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Postal Code</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.postalCode || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">GST Number</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.gstNumber || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">PAN Number</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.panNumber || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Subscription Plan</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.subscriptionPlan || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Employee Limit</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.employeeLimit ?? "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Status</p>
                                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(detailCompany.status)}`}>{detailCompany.status || "Active"}</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Timezone</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.timezone || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Subscription Start</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.subscriptionStart || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Subscription End</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.subscriptionEnd || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Currency</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.currency || "—"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Attendance Mandatory</p>
                                <p className="text-sm font-medium text-slate-700">{detailCompany.attendanceMandatory ? "Yes" : "No"}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-end">
                            <button onClick={() => { setShowDetailModal(false); setDetailCompany(null); }} className="px-6 py-2.5 bg-workbook-dark text-white rounded-xl font-medium hover:bg-workbook-light transition-all shadow-lg" style={{ boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)' }}>Close</button>
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
};

export default Companies;

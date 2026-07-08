import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Copy, CheckCircle } from "lucide-react";
import { withBase } from "../../../../config/apiConfig";

const Field = ({ label, required, mode, ...props }) => {
    const isView = mode === "view";
    const baseClass = "w-full h-12 px-3.5 border rounded-xl text-sm transition-all placeholder:text-slate-400";
    const disabledClass = "bg-slate-50 text-slate-500 border-slate-200 cursor-default";
    const editableClass = "text-slate-700 bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400";

    if (props.type === "textarea") {
        return (
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}{required && isView !== true && <span className="text-red-400 ml-0.5">*</span>}</label>
                <textarea {...props} disabled={isView} className={`w-full h-24 px-3.5 py-2.5 rounded-xl text-sm transition-all resize-none placeholder:text-slate-400 ${isView ? disabledClass : editableClass}`} />
            </div>
        );
    }
    if (props.type === "select") {
        return (
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}{required && isView !== true && <span className="text-red-400 ml-0.5">*</span>}</label>
                <select {...props} disabled={isView} className={`${baseClass} ${isView ? `${disabledClass} appearance-none` : "appearance-none cursor-pointer"}`}>
                    {props.children}
                </select>
            </div>
        );
    }
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}{required && isView !== true && <span className="text-red-400 ml-0.5">*</span>}</label>
            <input {...props} disabled={isView} className={`${baseClass} ${isView ? disabledClass : editableClass}`} />
        </div>
    );
};

const SectionCard = ({ title, children }) => (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">{title}</h3>
        </div>
        {children}
    </div>
);

const SectionGrid = ({ children }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
    </div>
);

const EmployeeFormModal = ({ isOpen, onClose, token, onSuccess, mode = "add", employee = null }) => {
    const isView = mode === "view";
    const isEdit = mode === "edit";
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const lastPassword = useRef("");

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const defaultForm = {
        firstName: "", middleName: "", lastName: "", employeeId: "", dateOfBirth: "", gender: "",
        maritalStatus: "", nationality: "", bloodGroup: "", panNumber: "", aadhaarNumber: "", passportNumber: "",
        profilePhoto: "", email: "", password: "Pass@1234", phone: "", departmentId: "", designationId: "",
        employmentType: "", dateOfJoining: "", reportingManager: "", workLocation: "", probationPeriod: "",
        confirmationDate: "", shift: "", employeeCategory: "", costCenter: "", businessUnit: "",
        officialEmail: "", officialPhone: "", personalEmail: "", personalPhone: "", currentAddress: "", permanentAddress: "",
        paySchedule: "", currency: "", basicSalary: "", grossSalary: "", paymentFrequency: "",
        bankName: "", bankAccountNumber: "", ifscCode: "", pfNumber: "", esiNumber: "", uanNumber: "", taxRegime: "",
        education: "", experienceYears: "", skills: "", languagesKnown: "",
        emergencyContactName: "", emergencyContactRelationship: "", emergencyContactPhone: "",
        role: "EMPLOYEE"
    };

    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (!isOpen) return;
        if (employee && (isEdit || isView)) {
            setForm({
                firstName: employee.firstName || "",
                middleName: employee.middleName || "",
                lastName: employee.lastName || "",
                employeeId: employee.employeeId || "",
                dateOfBirth: employee.dateOfBirth || "",
                gender: employee.gender || "",
                maritalStatus: employee.maritalStatus || "",
                nationality: employee.nationality || "",
                bloodGroup: employee.bloodGroup || "",
                panNumber: employee.panNumber || "",
                aadhaarNumber: employee.aadhaarNumber || "",
                passportNumber: employee.passportNumber || "",
                profilePhoto: employee.profilePhoto || "",
                email: employee.email || "",
                password: "",
                phone: employee.phone || "",
                departmentId: employee.departmentId || "",
                designationId: employee.designationId || "",
                employmentType: employee.employmentType || "",
                dateOfJoining: employee.dateOfJoining || "",
                reportingManager: employee.reportingManager || "",
                workLocation: employee.workLocation || "",
                probationPeriod: employee.probationPeriod || "",
                confirmationDate: employee.confirmationDate || "",
                shift: employee.shift || "",
                employeeCategory: employee.employeeCategory || "",
                costCenter: employee.costCenter || "",
                businessUnit: employee.businessUnit || "",
                officialEmail: employee.officialEmail || "",
                officialPhone: employee.officialPhone || "",
                personalEmail: employee.personalEmail || "",
                personalPhone: employee.personalPhone || "",
                currentAddress: employee.currentAddress || "",
                permanentAddress: employee.permanentAddress || "",
                paySchedule: employee.paySchedule || "",
                currency: employee.currency || "",
                basicSalary: employee.basicSalary || "",
                grossSalary: employee.grossSalary || "",
                paymentFrequency: employee.paymentFrequency || "",
                bankName: employee.bankName || "",
                bankAccountNumber: employee.bankAccountNumber || "",
                ifscCode: employee.ifscCode || "",
                pfNumber: employee.pfNumber || "",
                esiNumber: employee.esiNumber || "",
                uanNumber: employee.uanNumber || "",
                taxRegime: employee.taxRegime || "",
                education: employee.education || "",
                experienceYears: employee.experienceYears || "",
                skills: employee.skills || "",
                languagesKnown: employee.languagesKnown || "",
                emergencyContactName: employee.emergencyContactName || "",
                emergencyContactRelationship: employee.emergencyContactRelationship || "",
                emergencyContactPhone: employee.emergencyContactPhone || "",
                role: employee.role || "EMPLOYEE"
            });
        } else {
            setForm(defaultForm);
        }
        setError("");
        setSuccess(null);
        lastPassword.current = "";
    }, [isOpen, employee, isEdit, isView]);

    useEffect(() => {
        if (!isOpen || !token) return;
        const fetchOptions = async () => {
            try {
                const [deptRes, desigRes] = await Promise.all([
                    fetch(withBase("/api/departments?page=0&size=1000"), { headers }),
                    fetch(withBase("/api/designations?page=0&size=1000"), { headers })
                ]);
                if (deptRes.ok) {
                    const json = await deptRes.json();
                    setDepartments(json.data?.content || json.data || []);
                }
                if (desigRes.ok) {
                    const json = await desigRes.json();
                    setDesignations(json.data?.content || json.data || []);
                }
            } catch { /* silent fallback */ }
        };
        fetchOptions();
    }, [isOpen, token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === "password") lastPassword.current = e.target.value;
    };

    const buildBody = () => {
        const body = {
            firstName: form.firstName, middleName: form.middleName, lastName: form.lastName,
            employeeId: form.employeeId, dateOfBirth: form.dateOfBirth || null,
            gender: form.gender, maritalStatus: form.maritalStatus, nationality: form.nationality,
            bloodGroup: form.bloodGroup, panNumber: form.panNumber, aadhaarNumber: form.aadhaarNumber,
            passportNumber: form.passportNumber, profilePhoto: form.profilePhoto,
            email: form.email, phone: form.phone,
            departmentId: form.departmentId ? Number(form.departmentId) : null,
            designationId: form.designationId ? Number(form.designationId) : null,
            role: form.role,
            employmentType: form.employmentType, dateOfJoining: form.dateOfJoining || null,
            reportingManager: form.reportingManager, workLocation: form.workLocation,
            probationPeriod: form.probationPeriod, confirmationDate: form.confirmationDate || null,
            shift: form.shift, employeeCategory: form.employeeCategory, costCenter: form.costCenter,
            businessUnit: form.businessUnit,
            officialEmail: form.officialEmail, officialPhone: form.officialPhone,
            personalEmail: form.personalEmail, personalPhone: form.personalPhone,
            currentAddress: form.currentAddress, permanentAddress: form.permanentAddress,
            paySchedule: form.paySchedule, currency: form.currency,
            basicSalary: form.basicSalary ? Number(form.basicSalary) : null,
            grossSalary: form.grossSalary ? Number(form.grossSalary) : null,
            paymentFrequency: form.paymentFrequency, bankName: form.bankName,
            bankAccountNumber: form.bankAccountNumber, ifscCode: form.ifscCode,
            pfNumber: form.pfNumber, esiNumber: form.esiNumber, uanNumber: form.uanNumber,
            taxRegime: form.taxRegime,
            education: form.education, experienceYears: form.experienceYears ? Number(form.experienceYears) : null,
            skills: form.skills, languagesKnown: form.languagesKnown,
            emergencyContactName: form.emergencyContactName,
            emergencyContactRelationship: form.emergencyContactRelationship,
            emergencyContactPhone: form.emergencyContactPhone
        };
        if (form.password) body.password = form.password;
        return body;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            const body = buildBody();
            const url = isEdit && employee?.id
                ? withBase(`/api/company-admin/users/${employee.id}`)
                : withBase("/api/company-admin/users");
            const res = await fetch(url, {
                method: isEdit ? "PUT" : "POST", headers, body: JSON.stringify(body)
            });
            if (!res.ok) { const err = await res.json().catch(() => null); throw new Error(err?.message || err?.error || "Failed to save employee"); }
            onSuccess && onSuccess();
            const pwChanged = isEdit && lastPassword.current;
            setSuccess({
                email: form.email,
                password: !isEdit ? lastPassword.current : pwChanged ? lastPassword.current : null,
                message: !isEdit ? "Employee created successfully" : pwChanged ? "Employee updated with new password" : "Employee updated successfully"
            });
        } catch (err) { setError(err.message); }
        finally { setSubmitting(false); }
    };

    const handleCopy = (text) => navigator.clipboard.writeText(text);

    const title = isView ? "Employee Details" : isEdit ? "Edit Employee" : "Add Employee";
    const subtitle = isView ? "View all employee information" : isEdit ? "Update employee details" : "Fill in the details to add a new employee";

    const ReadOnlyValue = ({ label, value }) => (
        <div className="space-y-1">
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
            <span className="block text-sm text-slate-800 font-medium py-2">{value || "—"}</span>
        </div>
    );

    const renderViewSection = (title, fields) => (
        <SectionCard title={title}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {fields.map((f, i) => (
                    <ReadOnlyValue key={i} label={f.label} value={f.value} />
                ))}
            </div>
        </SectionCard>
    );

    const formContent = (
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar">
            {isView ? (
                <>
                    {(() => {
                        const emp = employee || form;
                        return renderViewSection("Personal Information", [
                            { label: "First Name", value: emp.firstName },
                            { label: "Middle Name", value: emp.middleName },
                            { label: "Last Name", value: emp.lastName },
                            { label: "Employee ID", value: emp.employeeId },
                            { label: "Date of Birth", value: emp.dateOfBirth },
                            { label: "Gender", value: emp.gender },
                            { label: "Marital Status", value: emp.maritalStatus },
                            { label: "Nationality", value: emp.nationality },
                            { label: "Blood Group", value: emp.bloodGroup },
                            { label: "PAN Number", value: emp.panNumber },
                            { label: "Aadhaar Number", value: emp.aadhaarNumber },
                            { label: "Passport Number", value: emp.passportNumber },
                            { label: "Email (Login ID)", value: emp.email },
                            { label: "Phone", value: emp.phone },
                            { label: "Password", value: "•••••••• (set)" },
                        ]);
                    })()}

                    {(() => {
                        const emp = employee || form;
                        return renderViewSection("Job Information", [
                            { label: "Department", value: emp.departmentName || (departments.find(d => d.id == emp.departmentId)?.name) },
                            { label: "Designation", value: emp.designationName || (designations.find(d => d.id == emp.designationId)?.name) },
                            { label: "Employment Type", value: emp.employmentType },
                            { label: "Date of Joining", value: emp.dateOfJoining },
                            { label: "Reporting Manager", value: emp.reportingManager },
                            { label: "Work Location", value: emp.workLocation },
                            { label: "Probation Period", value: emp.probationPeriod },
                            { label: "Confirmation Date", value: emp.confirmationDate },
                            { label: "Shift", value: emp.shift },
                            { label: "Employee Category", value: emp.employeeCategory },
                            { label: "Cost Center", value: emp.costCenter },
                            { label: "Business Unit", value: emp.businessUnit },
                            { label: "User Type", value: emp.role },
                        ]);
                    })()}

                    {(() => {
                        const emp = employee || form;
                        return renderViewSection("Contact Information", [
                            { label: "Official Email", value: emp.officialEmail },
                            { label: "Official Phone", value: emp.officialPhone },
                            { label: "Personal Email", value: emp.personalEmail },
                            { label: "Personal Phone", value: emp.personalPhone },
                        ]);
                    })()}

                    {(() => {
                        const emp = employee || form;
                        return (
                            <SectionCard title="Contact Information (Addresses)">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Address</span>
                                        <span className="block text-sm text-slate-800 font-medium p-3 bg-slate-50 rounded-xl min-h-[60px]">{emp.currentAddress || "—"}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Permanent Address</span>
                                        <span className="block text-sm text-slate-800 font-medium p-3 bg-slate-50 rounded-xl min-h-[60px]">{emp.permanentAddress || "—"}</span>
                                    </div>
                                </div>
                            </SectionCard>
                        );
                    })()}

                    {(() => {
                        const emp = employee || form;
                        return renderViewSection("Salary & Payroll Information", [
                            { label: "Pay Schedule", value: emp.paySchedule },
                            { label: "Currency", value: emp.currency },
                            { label: "Basic Salary", value: emp.basicSalary },
                            { label: "Gross Salary (CTC)", value: emp.grossSalary },
                            { label: "Payment Frequency", value: emp.paymentFrequency },
                            { label: "Bank Name", value: emp.bankName },
                            { label: "Bank Account Number", value: emp.bankAccountNumber },
                            { label: "IFSC Code", value: emp.ifscCode },
                            { label: "PF Number", value: emp.pfNumber },
                            { label: "ESI Number", value: emp.esiNumber },
                            { label: "UAN Number", value: emp.uanNumber },
                            { label: "Tax Regime", value: emp.taxRegime },
                        ]);
                    })()}

                    {(() => {
                        const emp = employee || form;
                        return renderViewSection("Additional Information", [
                            { label: "Education", value: emp.education },
                            { label: "Experience (Years)", value: emp.experienceYears },
                            { label: "Skills", value: emp.skills },
                            { label: "Languages Known", value: emp.languagesKnown },
                            { label: "Emergency Contact Name", value: emp.emergencyContactName },
                            { label: "Emergency Contact Relationship", value: emp.emergencyContactRelationship },
                            { label: "Emergency Contact Phone", value: emp.emergencyContactPhone },
                        ]);
                    })()}
                </>
            ) : (
                <>
                    {/* 1. PERSONAL INFORMATION */}
                    <SectionCard title="Personal Information">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-3">
                                <SectionGrid>
                                    <Field label="First Name" required mode={mode} type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" />
                                    <Field label="Middle Name" mode={mode} type="text" name="middleName" value={form.middleName} onChange={handleChange} placeholder="Michael" />
                                    <Field label="Last Name" required mode={mode} type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
                                    <Field label="Employee ID" mode={mode} type="text" name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="EMP-2024-001" />
                                    <Field label="Date of Birth" required mode={mode} type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
                                    <Field label="Gender" required mode={mode} type="select" name="gender" value={form.gender} onChange={handleChange}><option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></Field>
                                    <Field label="Marital Status" mode={mode} type="select" name="maritalStatus" value={form.maritalStatus} onChange={handleChange}><option value="">Select</option><option value="Single">Single</option><option value="Married">Married</option><option value="Divorced">Divorced</option><option value="Widowed">Widowed</option></Field>
                                    <Field label="Nationality" required mode={mode} type="select" name="nationality" value={form.nationality} onChange={handleChange}><option value="">Select</option><option value="Indian">Indian</option><option value="American">American</option><option value="British">British</option><option value="Other">Other</option></Field>
                                    <Field label="Blood Group" mode={mode} type="select" name="bloodGroup" value={form.bloodGroup} onChange={handleChange}><option value="">Select</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option></Field>
                                    <Field label="PAN Number" mode={mode} type="text" name="panNumber" value={form.panNumber} onChange={handleChange} placeholder="ABCDE1234F" />
                                    <Field label="Aadhaar Number" mode={mode} type="text" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} placeholder="XXXX XXXX XXXX" />
                                    <Field label="Passport Number" mode={mode} type="text" name="passportNumber" value={form.passportNumber} onChange={handleChange} placeholder="Z1234567" />
                                    <Field label="Email (Login ID)" required mode={mode} type="email" name="email" value={form.email} onChange={handleChange} placeholder="john.doe@company.com" />
                                    <Field label="Phone" mode={mode} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" />
                                    <Field label={isEdit ? "New Password (leave blank to keep)" : "Password"} required={!isEdit} mode={mode} type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
                                </SectionGrid>
                            </div>
                            <div className="lg:col-span-1">
                                <div className="flex flex-col items-center justify-center h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 group">
                                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center transition-all mb-3">
                                        <Upload size={28} className="text-slate-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-600">Upload Photo</p>
                                    <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, GIF</p>
                                    <input type="file" accept="image/*" className="hidden" disabled={isView} />
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    {/* 2. JOB INFORMATION */}
                    <SectionCard title="Job Information">
                        <SectionGrid>
                            <Field label="Department" required mode={mode} type="select" name="departmentId" value={form.departmentId} onChange={handleChange}><option value="">Select Department</option>{departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</Field>
                            <Field label="Designation" required mode={mode} type="select" name="designationId" value={form.designationId} onChange={handleChange}><option value="">Select Designation</option>{designations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</Field>
                            <Field label="Employment Type" required mode={mode} type="select" name="employmentType" value={form.employmentType} onChange={handleChange}><option value="">Select Type</option><option value="Full-Time">Full-Time</option><option value="Part-Time">Part-Time</option><option value="Contract">Contract</option><option value="Intern">Intern</option><option value="Probation">Probation</option></Field>
                            <Field label="Date of Joining" required mode={mode} type="date" name="dateOfJoining" value={form.dateOfJoining} onChange={handleChange} />
                            <Field label="Reporting Manager" mode={mode} type="select" name="reportingManager" value={form.reportingManager} onChange={handleChange}><option value="">Select Manager</option><option value="Rahul Verma">Rahul Verma</option><option value="Priya Sharma">Priya Sharma</option><option value="Amit Kumar">Amit Kumar</option></Field>
                            <Field label="Work Location" required mode={mode} type="select" name="workLocation" value={form.workLocation} onChange={handleChange}><option value="">Select Location</option><option value="Bangalore">Bangalore</option><option value="Mumbai">Mumbai</option><option value="Delhi">Delhi</option><option value="Pune">Pune</option><option value="Hyderabad">Hyderabad</option></Field>
                            <Field label="Probation Period" mode={mode} type="select" name="probationPeriod" value={form.probationPeriod} onChange={handleChange}><option value="">Select Period</option><option value="3 Months">3 Months</option><option value="6 Months">6 Months</option><option value="12 Months">12 Months</option></Field>
                            <Field label="Confirmation Date" mode={mode} type="date" name="confirmationDate" value={form.confirmationDate} onChange={handleChange} />
                            <Field label="Shift" mode={mode} type="select" name="shift" value={form.shift} onChange={handleChange}><option value="">Select Shift</option><option value="General">General</option><option value="Morning">Morning</option><option value="Evening">Evening</option><option value="Night">Night</option><option value="Rotational">Rotational</option></Field>
                            <Field label="Employee Category" mode={mode} type="select" name="employeeCategory" value={form.employeeCategory} onChange={handleChange}><option value="">Select Category</option><option value="Permanent">Permanent</option><option value="Contractual">Contractual</option><option value="Temporary">Temporary</option><option value="Probationary">Probationary</option></Field>
                            <Field label="Cost Center" mode={mode} type="text" name="costCenter" value={form.costCenter} onChange={handleChange} placeholder="CC-001" />
                            <Field label="Business Unit" mode={mode} type="select" name="businessUnit" value={form.businessUnit} onChange={handleChange}><option value="">Select Unit</option><option value="Corporate">Corporate</option><option value="Division A">Division A</option><option value="Division B">Division B</option><option value="Subsidiary">Subsidiary</option></Field>
                            <Field label="User Type" required mode={mode} type="select" name="role" value={form.role} onChange={handleChange}><option value="EMPLOYEE">Employee</option><option value="HR">HR</option></Field>
                        </SectionGrid>
                    </SectionCard>

                    {/* 3. CONTACT INFORMATION */}
                    <SectionCard title="Contact Information">
                        <div className="space-y-4">
                            <SectionGrid>
                                <Field label="Official Email" required mode={mode} type="email" name="officialEmail" value={form.officialEmail} onChange={handleChange} placeholder="john.doe@company.com" />
                                <Field label="Official Phone" mode={mode} type="tel" name="officialPhone" value={form.officialPhone} onChange={handleChange} placeholder="+91 9876543210" />
                                <Field label="Personal Email" mode={mode} type="email" name="personalEmail" value={form.personalEmail} onChange={handleChange} placeholder="john@gmail.com" />
                                <Field label="Personal Phone" mode={mode} type="tel" name="personalPhone" value={form.personalPhone} onChange={handleChange} placeholder="+91 9876543210" />
                            </SectionGrid>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <Field label="Current Address" required mode={mode} type="textarea" name="currentAddress" value={form.currentAddress} onChange={handleChange} placeholder="Enter current address..." />
                                <Field label="Permanent Address" mode={mode} type="textarea" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="Enter permanent address..." />
                            </div>
                        </div>
                    </SectionCard>

                    {/* 4. SALARY & PAYROLL */}
                    <SectionCard title="Salary & Payroll Information">
                        <SectionGrid>
                            <Field label="Pay Schedule" required mode={mode} type="select" name="paySchedule" value={form.paySchedule} onChange={handleChange}><option value="">Select Schedule</option><option value="Monthly">Monthly</option><option value="Weekly">Weekly</option><option value="Bi-Weekly">Bi-Weekly</option></Field>
                            <Field label="Currency" required mode={mode} type="select" name="currency" value={form.currency} onChange={handleChange}><option value="">Select Currency</option><option value="INR">INR (₹)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option></Field>
                            <Field label="Basic Salary" required mode={mode} type="text" name="basicSalary" value={form.basicSalary} onChange={handleChange} placeholder="₹ 50,000" />
                            <Field label="Gross Salary (CTC)" required mode={mode} type="text" name="grossSalary" value={form.grossSalary} onChange={handleChange} placeholder="₹ 8,00,000" />
                            <Field label="Payment Frequency" required mode={mode} type="select" name="paymentFrequency" value={form.paymentFrequency} onChange={handleChange}><option value="">Select Frequency</option><option value="Monthly">Monthly</option><option value="Quarterly">Quarterly</option><option value="Annual">Annual</option></Field>
                            <Field label="Bank Name" required mode={mode} type="text" name="bankName" value={form.bankName} onChange={handleChange} placeholder="Enter bank name" />
                            <Field label="Bank Account Number" required mode={mode} type="text" name="bankAccountNumber" value={form.bankAccountNumber} onChange={handleChange} placeholder="XXXXXXXXXXXX" />
                            <Field label="IFSC Code" required mode={mode} type="text" name="ifscCode" value={form.ifscCode} onChange={handleChange} placeholder="HDFC0001234" />
                            <Field label="PF Number" mode={mode} type="text" name="pfNumber" value={form.pfNumber} onChange={handleChange} placeholder="PF/12345/ABCD" />
                            <Field label="ESI Number" mode={mode} type="text" name="esiNumber" value={form.esiNumber} onChange={handleChange} placeholder="ESI/12345" />
                            <Field label="UAN Number" mode={mode} type="text" name="uanNumber" value={form.uanNumber} onChange={handleChange} placeholder="123456789012" />
                            <Field label="Tax Regime" mode={mode} type="select" name="taxRegime" value={form.taxRegime} onChange={handleChange}><option value="">Select Regime</option><option value="New Tax Regime">New Tax Regime</option><option value="Old Tax Regime">Old Tax Regime</option></Field>
                        </SectionGrid>
                    </SectionCard>

                    {/* 5. ADDITIONAL INFORMATION */}
                    <SectionCard title="Additional Information">
                        <SectionGrid>
                            <Field label="Education" mode={mode} type="text" name="education" value={form.education} onChange={handleChange} placeholder="B.Tech Computer Science" />
                            <Field label="Experience (Years)" mode={mode} type="number" name="experienceYears" value={form.experienceYears} onChange={handleChange} placeholder="5" />
                            <Field label="Skills" mode={mode} type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, Python" />
                            <Field label="Languages Known" mode={mode} type="text" name="languagesKnown" value={form.languagesKnown} onChange={handleChange} placeholder="English, Hindi" />
                            <Field label="Emergency Contact Name" mode={mode} type="text" name="emergencyContactName" value={form.emergencyContactName} onChange={handleChange} placeholder="Jane Doe" />
                            <Field label="Emergency Contact Relationship" mode={mode} type="text" name="emergencyContactRelationship" value={form.emergencyContactRelationship} onChange={handleChange} placeholder="Spouse" />
                            <Field label="Emergency Contact Phone" mode={mode} type="tel" name="emergencyContactPhone" value={form.emergencyContactPhone} onChange={handleChange} placeholder="+91 9876543210" />
                        </SectionGrid>
                    </SectionCard>
                </>
            )}
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={success ? null : onClose} className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm" />
                    <motion.div initial={{ scale: 0.96, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 10 }}
                        className="relative w-full bg-white rounded-[20px] shadow-2xl z-10 flex flex-col"
                        style={{ width: success ? "480px" : "min(90vw, 1400px)", height: success ? "auto" : "min(90vh, 900px)" }}>
                        {success ? (
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size="32" className="text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 mb-1">{success.message}</h2>
                                <p className="text-sm text-slate-500 mb-6">Login credentials for the employee</p>
                                <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-3 mb-6">
                                    <div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email (Login ID)</span>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-sm font-medium text-slate-800">{success.email}</span>
                                            <button onClick={() => handleCopy(success.email)} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-600"><Copy size={14} /></button>
                                        </div>
                                    </div>
                                    {success.password && (
                                        <div>
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</span>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-sm font-mono font-bold text-slate-800">{success.password}</span>
                                                <button onClick={() => handleCopy(success.password)} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-600"><Copy size={14} /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => { setSuccess(null); onClose(); }}
                                    className="h-11 px-8 rounded-xl bg-workbook-dark text-white text-sm font-semibold hover:bg-workbook-light transition-all shadow-lg" style={{ boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)' }}>Close</button>
                            </div>
                        ) : isView ? (
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 shrink-0">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                                        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
                                    </div>
                                    <button type="button" onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600">
                                        <X size={20} />
                                    </button>
                                </div>
                                {formContent}
                                <div className="shrink-0 px-8 py-4 border-t border-slate-200 bg-white rounded-b-[20px] flex justify-end">
                                    <button type="button" onClick={onClose} className="h-11 px-8 rounded-xl bg-workbook-dark text-white text-sm font-semibold hover:bg-workbook-light transition-all shadow-lg" style={{ boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)' }}>Close</button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col h-full">
                                <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 shrink-0">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                                        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={onClose} className="h-11 px-5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
                                        <button type="submit" disabled={submitting}
                                            className={`h-11 px-6 rounded-xl text-white text-sm font-semibold transition-all shadow-lg flex items-center gap-2 ${submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/25'}`}>
                                            {submitting ? (
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                            )}
                                            {submitting ? "Saving..." : isEdit ? "Update Employee" : "Save Employee"}
                                        </button>
                                        <button type="button" onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600">
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mx-8 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">{error}</div>
                                )}

                                {formContent}

                                <div className="shrink-0 px-8 py-4 border-t border-slate-200 bg-white rounded-b-[20px] flex items-center justify-between">
                                    <p className="text-xs text-slate-400 font-medium">* Required fields</p>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={onClose} className="h-11 px-6 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
                                        <button type="submit" disabled={submitting}
                                            className={`h-11 px-8 rounded-xl text-white text-sm font-semibold transition-all shadow-lg flex items-center gap-2 ${submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/25'}`}>
                                            {submitting ? (
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                            )}
                                            {submitting ? "Saving..." : isEdit ? "Update Employee" : "Save Employee"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EmployeeFormModal;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { withBase } from "../../../../config/apiConfig";

const Field = ({ label, required, ...props }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
        {props.type === "textarea" ? (
            <textarea {...props} className="w-full h-24 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none placeholder:text-slate-400" />
        ) : props.type === "select" ? (
            <select {...props} className="w-full h-12 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all appearance-none cursor-pointer">
                {props.children}
            </select>
        ) : props.type === "file" ? (
            <input {...props} className="w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition-all cursor-pointer" />
        ) : (
            <input {...props} className="w-full h-12 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-slate-400" />
        )}
    </div>
);

const SectionCard = ({ title, children, rightContent }) => (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">{title}</h3>
            {rightContent}
        </div>
        {children}
    </div>
);

const SectionGrid = ({ children }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
    </div>
);

const AddEmployeeModal = ({ isOpen, onClose, departments = [], designations = [], token, onSuccess }) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [documents, setDocuments] = useState([{ type: "", file: null }]);

    const [form, setForm] = useState({
        firstName: "", middleName: "", lastName: "", employeeId: "", dateOfBirth: "", gender: "",
        maritalStatus: "", nationality: "", bloodGroup: "", panNumber: "", aadhaarNumber: "", passportNumber: "",
        profilePhoto: "", email: "", password: "Pass@1234", phone: "", departmentId: "", designationId: "",
        employmentType: "", dateOfJoining: "", reportingManager: "", workLocation: "", probationPeriod: "",
        confirmationDate: "", shift: "", employeeCategory: "", costCenter: "", businessUnit: "",
        officialEmail: "", officialPhone: "", personalEmail: "", personalPhone: "", currentAddress: "", permanentAddress: "",
        paySchedule: "", currency: "", basicSalary: "", grossSalary: "", paymentFrequency: "",
        bankName: "", bankAccountNumber: "", ifscCode: "", pfNumber: "", esiNumber: "", uanNumber: "", taxRegime: "",
        education: "", experienceYears: "", skills: "", languagesKnown: "",
        emergencyContactName: "", emergencyContactRelationship: "", emergencyContactPhone: ""
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
            const body = {
                firstName: form.firstName, middleName: form.middleName, lastName: form.lastName,
                employeeId: form.employeeId, dateOfBirth: form.dateOfBirth || null,
                gender: form.gender, maritalStatus: form.maritalStatus, nationality: form.nationality,
                bloodGroup: form.bloodGroup, panNumber: form.panNumber, aadhaarNumber: form.aadhaarNumber,
                passportNumber: form.passportNumber, profilePhoto: form.profilePhoto,
                email: form.email, password: form.password, phone: form.phone,
                departmentId: form.departmentId ? Number(form.departmentId) : null,
                designationId: form.designationId ? Number(form.designationId) : null,
                role: "EMPLOYEE",
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
            const res = await fetch(withBase("/api/company-admin/users"), {
                method: "POST", headers, body: JSON.stringify(body)
            });
            if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Failed to save employee"); }
            onSuccess && onSuccess();
            onClose();
        } catch (err) { setError(err.message); }
        finally { setSubmitting(false); }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose} className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm" />
                    <motion.div initial={{ scale: 0.96, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 10 }}
                        className="relative w-full max-w-[1400px] bg-white rounded-[20px] shadow-2xl z-10 flex flex-col"
                        style={{ height: "min(90vh, 900px)" }}>
                        <form onSubmit={handleSubmit} className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 shrink-0">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">Add Employee</h2>
                                    <p className="text-sm text-slate-500 mt-0.5">Fill in the details to add a new employee to the organization</p>
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
                                        {submitting ? "Saving..." : "Save Employee"}
                                    </button>
                                    <button type="button" onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="mx-8 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">{error}</div>
                            )}

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar">
                                {/* 1. PERSONAL INFORMATION */}
                                <SectionCard title="Personal Information">
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                        <div className="lg:col-span-3">
                                            <SectionGrid>
                                                <Field label="First Name" required type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" />
                                                <Field label="Middle Name" type="text" name="middleName" value={form.middleName} onChange={handleChange} placeholder="Michael" />
                                                <Field label="Last Name" required type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
                                                <Field label="Employee ID" type="text" name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="EMP-2024-001" />
                                                <Field label="Date of Birth" required type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
                                                <Field label="Gender" required type="select" name="gender" value={form.gender} onChange={handleChange}><option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></Field>
                                                <Field label="Marital Status" type="select" name="maritalStatus" value={form.maritalStatus} onChange={handleChange}><option value="">Select</option><option value="Single">Single</option><option value="Married">Married</option><option value="Divorced">Divorced</option><option value="Widowed">Widowed</option></Field>
                                                <Field label="Nationality" required type="select" name="nationality" value={form.nationality} onChange={handleChange}><option value="">Select</option><option value="Indian">Indian</option><option value="American">American</option><option value="British">British</option><option value="Other">Other</option></Field>
                                                <Field label="Blood Group" type="select" name="bloodGroup" value={form.bloodGroup} onChange={handleChange}><option value="">Select</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option></Field>
                                                <Field label="PAN Number" type="text" name="panNumber" value={form.panNumber} onChange={handleChange} placeholder="ABCDE1234F" />
                                                <Field label="Aadhaar Number" type="text" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} placeholder="XXXX XXXX XXXX" />
                                                <Field label="Passport Number" type="text" name="passportNumber" value={form.passportNumber} onChange={handleChange} placeholder="Z1234567" />
                                            </SectionGrid>
                                        </div>
                                        <div className="lg:col-span-1">
                                            <div className="flex flex-col items-center justify-center h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-300 transition-all cursor-pointer group">
                                                <div className="w-20 h-20 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-all mb-3">
                                                    <Upload size={28} className="text-slate-400 group-hover:text-indigo-500 transition-all" />
                                                </div>
                                                <p className="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-all">Upload Photo</p>
                                                <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, GIF</p>
                                                <input type="file" accept="image/*" className="hidden" />
                                            </div>
                                        </div>
                                    </div>
                                </SectionCard>

                                {/* 2. JOB INFORMATION */}
                                <SectionCard title="Job Information">
                                    <SectionGrid>
                                        <Field label="Department" required type="select" name="departmentId" value={form.departmentId} onChange={handleChange}><option value="">Select Department</option>{departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</Field>
                                        <Field label="Designation" required type="select" name="designationId" value={form.designationId} onChange={handleChange}><option value="">Select Designation</option>{designations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</Field>
                                        <Field label="Employment Type" required type="select" name="employmentType" value={form.employmentType} onChange={handleChange}><option value="">Select Type</option><option value="Full-Time">Full-Time</option><option value="Part-Time">Part-Time</option><option value="Contract">Contract</option><option value="Intern">Intern</option><option value="Probation">Probation</option></Field>
                                        <Field label="Date of Joining" required type="date" name="dateOfJoining" value={form.dateOfJoining} onChange={handleChange} />
                                        <Field label="Reporting Manager" type="select" name="reportingManager" value={form.reportingManager} onChange={handleChange}><option value="">Select Manager</option><option value="Rahul Verma">Rahul Verma</option><option value="Priya Sharma">Priya Sharma</option><option value="Amit Kumar">Amit Kumar</option></Field>
                                        <Field label="Work Location" required type="select" name="workLocation" value={form.workLocation} onChange={handleChange}><option value="">Select Location</option><option value="Bangalore">Bangalore</option><option value="Mumbai">Mumbai</option><option value="Delhi">Delhi</option><option value="Pune">Pune</option><option value="Hyderabad">Hyderabad</option></Field>
                                        <Field label="Probation Period" type="select" name="probationPeriod" value={form.probationPeriod} onChange={handleChange}><option value="">Select Period</option><option value="3 Months">3 Months</option><option value="6 Months">6 Months</option><option value="12 Months">12 Months</option></Field>
                                        <Field label="Confirmation Date" type="date" name="confirmationDate" value={form.confirmationDate} onChange={handleChange} />
                                        <Field label="Shift" type="select" name="shift" value={form.shift} onChange={handleChange}><option value="">Select Shift</option><option value="General">General</option><option value="Morning">Morning</option><option value="Evening">Evening</option><option value="Night">Night</option><option value="Rotational">Rotational</option></Field>
                                        <Field label="Employee Category" type="select" name="employeeCategory" value={form.employeeCategory} onChange={handleChange}><option value="">Select Category</option><option value="Permanent">Permanent</option><option value="Contractual">Contractual</option><option value="Temporary">Temporary</option><option value="Probationary">Probationary</option></Field>
                                        <Field label="Cost Center" type="text" name="costCenter" value={form.costCenter} onChange={handleChange} placeholder="CC-001" />
                                        <Field label="Business Unit" type="select" name="businessUnit" value={form.businessUnit} onChange={handleChange}><option value="">Select Unit</option><option value="Corporate">Corporate</option><option value="Division A">Division A</option><option value="Division B">Division B</option><option value="Subsidiary">Subsidiary</option></Field>
                                    </SectionGrid>
                                </SectionCard>

                                {/* 3. CONTACT INFORMATION */}
                                <SectionCard title="Contact Information">
                                    <div className="space-y-4">
                                        <SectionGrid>
                                            <Field label="Official Email" required type="email" name="officialEmail" value={form.officialEmail} onChange={handleChange} placeholder="john.doe@company.com" />
                                            <Field label="Official Phone" type="tel" name="officialPhone" value={form.officialPhone} onChange={handleChange} placeholder="+91 9876543210" />
                                            <Field label="Personal Email" type="email" name="personalEmail" value={form.personalEmail} onChange={handleChange} placeholder="john@gmail.com" />
                                            <Field label="Personal Phone" type="tel" name="personalPhone" value={form.personalPhone} onChange={handleChange} placeholder="+91 9876543210" />
                                        </SectionGrid>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <Field label="Current Address" required type="textarea" name="currentAddress" value={form.currentAddress} onChange={handleChange} placeholder="Enter current address..." />
                                            <Field label="Permanent Address" type="textarea" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="Enter permanent address..." />
                                        </div>
                                    </div>
                                </SectionCard>

                                {/* 4. SALARY & PAYROLL */}
                                <SectionCard title="Salary & Payroll Information">
                                    <SectionGrid>
                                        <Field label="Pay Schedule" required type="select" name="paySchedule" value={form.paySchedule} onChange={handleChange}><option value="">Select Schedule</option><option value="Monthly">Monthly</option><option value="Weekly">Weekly</option><option value="Bi-Weekly">Bi-Weekly</option></Field>
                                        <Field label="Currency" required type="select" name="currency" value={form.currency} onChange={handleChange}><option value="">Select Currency</option><option value="INR">INR (₹)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option></Field>
                                        <Field label="Basic Salary" required type="text" name="basicSalary" value={form.basicSalary} onChange={handleChange} placeholder="₹ 50,000" />
                                        <Field label="Gross Salary (CTC)" required type="text" name="grossSalary" value={form.grossSalary} onChange={handleChange} placeholder="₹ 8,00,000" />
                                        <Field label="Payment Frequency" required type="select" name="paymentFrequency" value={form.paymentFrequency} onChange={handleChange}><option value="">Select Frequency</option><option value="Monthly">Monthly</option><option value="Quarterly">Quarterly</option><option value="Annual">Annual</option></Field>
                                        <Field label="Bank Name" required type="text" name="bankName" value={form.bankName} onChange={handleChange} placeholder="Enter bank name" />
                                        <Field label="Bank Account Number" required type="text" name="bankAccountNumber" value={form.bankAccountNumber} onChange={handleChange} placeholder="XXXXXXXXXXXX" />
                                        <Field label="IFSC Code" required type="text" name="ifscCode" value={form.ifscCode} onChange={handleChange} placeholder="HDFC0001234" />
                                        <Field label="PF Number" type="text" name="pfNumber" value={form.pfNumber} onChange={handleChange} placeholder="PF/12345/ABCD" />
                                        <Field label="ESI Number" type="text" name="esiNumber" value={form.esiNumber} onChange={handleChange} placeholder="ESI/12345" />
                                        <Field label="UAN Number" type="text" name="uanNumber" value={form.uanNumber} onChange={handleChange} placeholder="123456789012" />
                                        <Field label="Tax Regime" type="select" name="taxRegime" value={form.taxRegime} onChange={handleChange}><option value="">Select Regime</option><option value="New Tax Regime">New Tax Regime</option><option value="Old Tax Regime">Old Tax Regime</option></Field>
                                    </SectionGrid>
                                </SectionCard>

                                {/* 5. ADDITIONAL INFORMATION */}
                                <SectionCard title="Additional Information">
                                    <SectionGrid>
                                        <Field label="Education" type="text" name="education" value={form.education} onChange={handleChange} placeholder="B.Tech Computer Science" />
                                        <Field label="Experience (Years)" type="number" name="experienceYears" value={form.experienceYears} onChange={handleChange} placeholder="5" />
                                        <Field label="Skills" type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, Python" />
                                        <Field label="Languages Known" type="text" name="languagesKnown" value={form.languagesKnown} onChange={handleChange} placeholder="English, Hindi" />
                                        <Field label="Emergency Contact Name" type="text" name="emergencyContactName" value={form.emergencyContactName} onChange={handleChange} placeholder="Jane Doe" />
                                        <Field label="Emergency Contact Relationship" type="text" name="emergencyContactRelationship" value={form.emergencyContactRelationship} onChange={handleChange} placeholder="Spouse" />
                                        <Field label="Emergency Contact Phone" type="tel" name="emergencyContactPhone" value={form.emergencyContactPhone} onChange={handleChange} placeholder="+91 9876543210" />
                                    </SectionGrid>
                                </SectionCard>
                            </div>

                            {/* Sticky Footer */}
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
                                        {submitting ? "Saving..." : "Save Employee"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddEmployeeModal;

import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";

const CompanySettings = () => {
    const [settings, setSettings] = useState({
        companyName: "Acme Corporation",
        timezone: "Asia/Kolkata",
        currency: "INR",
        leavePolicy: "Flexible",
        attendanceMethod: "Biometric"
    });

    const handleChange = (field, value) => setSettings(prev => ({ ...prev, [field]: value }));

    return (
        <div className="space-y-6">
            <PageHeader title="Company Settings" description="Configure company details, currency and attendance policies" />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">Company Name</label>
                    <input
                        value={settings.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                    />
                </div>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">Timezone</label>
                    <input
                        value={settings.timezone}
                        onChange={(e) => handleChange("timezone", e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                    />
                </div>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">Currency</label>
                    <input
                        value={settings.currency}
                        onChange={(e) => handleChange("currency", e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                    />
                </div>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">Leave Policy</label>
                    <input
                        value={settings.leavePolicy}
                        onChange={(e) => handleChange("leavePolicy", e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                    />
                </div>
                <div className="space-y-4 xl:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Attendance Method</label>
                    <input
                        value={settings.attendanceMethod}
                        onChange={(e) => handleChange("attendanceMethod", e.target.value)}
                        className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                    />
                </div>
                <div className="xl:col-span-2 flex justify-end">
                    <button className="bg-workbook-dark text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-workbook-light transition-all">Save Settings</button>
                </div>
            </div>
        </div>
    );
};

export default CompanySettings;

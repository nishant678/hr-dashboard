import React from "react";
import PageHeader from "../../components/PageHeader";
import { employeesData, payrollData, attendanceData, leaveRequestsData } from "../../data/dummyData";

const Reports = () => {
    return (
        <div className="space-y-6">
            <PageHeader title="Reports" description="Generate operational reports across HR, attendance, and payroll." />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Employee Headcount</p>
                    <p className="text-4xl font-bold text-slate-800">{employeesData.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Payroll Records</p>
                    <p className="text-4xl font-bold text-slate-800">{payrollData.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Attendance Entries</p>
                    <p className="text-4xl font-bold text-slate-800">{attendanceData.length}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-800 mb-3">Leave Request Summary</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-sm text-slate-500">Pending</p>
                            <p className="text-2xl font-bold text-yellow-700">{leaveRequestsData.filter(item => item.status === "Pending").length}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-2xl">
                            <p className="text-sm text-slate-500">Approved</p>
                            <p className="text-2xl font-bold text-green-700">{leaveRequestsData.filter(item => item.status === "Approved").length}</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-2xl">
                            <p className="text-sm text-slate-500">Rejected</p>
                            <p className="text-2xl font-bold text-red-700">{leaveRequestsData.filter(item => item.status === "Rejected").length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold text-slate-800">Insights</h2>
                    <p className="text-sm text-slate-500">Review trends and plan strategic HR actions with built-in analytics and report exports.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-workbook-dark/5 p-4 rounded-2xl">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Avg Retention</p>
                            <p className="text-2xl font-bold text-workbook-dark">87%</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-2xl">
                            <p className="text-xs uppercase tracking-[0.2em] text-blue-500">Attendance</p>
                            <p className="text-2xl font-bold text-blue-700">92%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;

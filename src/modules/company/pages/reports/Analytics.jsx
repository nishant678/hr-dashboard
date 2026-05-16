import React from "react";
import PageHeader from "../../components/PageHeader";
import { employeesData, attendanceData, payrollData } from "../../data/dummyData";

const Analytics = () => {
    const activeEmployees = employeesData.filter(emp => emp.status === "Active").length;
    const averageHours = (attendanceData.reduce((sum, rec) => sum + rec.hours, 0) / attendanceData.length).toFixed(1);
    const paidPayroll = payrollData.filter(item => item.status === "Paid").length;

    return (
        <div className="space-y-6">
            <PageHeader title="Analytics" description="View workforce analytics and operational trends" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Active Employees</p>
                    <p className="text-4xl font-bold text-slate-800">{activeEmployees}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Average Working Hours</p>
                    <p className="text-4xl font-bold text-slate-800">{averageHours} hrs</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Payroll Paid</p>
                    <p className="text-4xl font-bold text-slate-800">{paidPayroll}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-800 mb-3">Attendance Trend</h2>
                    <div className="space-y-3">
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full w-[92%] bg-green-500"></div>
                        </div>
                        <p className="text-sm text-slate-500">Attendance is holding steady across the last month.</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-800 mb-3">Salary Trend</h2>
                    <div className="space-y-3">
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full w-[64%] bg-blue-500"></div>
                        </div>
                        <p className="text-sm text-slate-500">Payroll disbursements remain consistent month over month.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;

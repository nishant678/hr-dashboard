import React from "react";
import PageHeader from "../../components/PageHeader";
import { attendanceData } from "../../data/dummyData";

const AttendanceReports = () => {
    const present = attendanceData.filter(item => item.status === "Present").length;
    const absent = attendanceData.filter(item => item.status === "Absent").length;
    const late = attendanceData.filter(item => item.status === "Late").length;

    return (
        <div className="space-y-6">
            <PageHeader title="Attendance Reports" description="View attendance summary and trends" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Present</p>
                    <p className="text-4xl font-bold text-green-600">{present}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Absent</p>
                    <p className="text-4xl font-bold text-red-600">{absent}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Late</p>
                    <p className="text-4xl font-bold text-yellow-600">{late}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800">Attendance Breakdown</h2>
                        <p className="text-sm text-slate-500">Monthly compliance at a glance.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {attendanceData.map(record => (
                        <div key={record.id} className="flex items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl">
                            <div>
                                <p className="font-semibold text-slate-800">{record.employee}</p>
                                <p className="text-sm text-slate-500">{record.date}</p>
                            </div>
                            <p className="text-sm text-slate-600">{record.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttendanceReports;

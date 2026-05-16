import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { attendanceData } from "../../data/dummyData";

const BulkAttendance = () => {
    const [data] = useState(attendanceData);

    const columns = [
        { key: "employee", label: "Employee", width: "180px" },
        { key: "date", label: "Date", width: "120px" },
        { key: "status", label: "Status", width: "120px" },
        { key: "checkIn", label: "Check In", width: "120px" },
        { key: "checkOut", label: "Check Out", width: "120px" },
        { key: "hours", label: "Hours", width: "80px" }
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Bulk Attendance" description="Upload and manage bulk attendance records" />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">Upload Template</h2>
                            <p className="text-sm text-slate-500">Use the CSV template to import attendance in bulk.</p>
                        </div>
                        <button className="bg-workbook-dark text-white px-5 py-3 rounded-2xl shadow-lg hover:bg-workbook-light transition-all">Download Template</button>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-dashed border-slate-200 text-slate-600">
                        <p className="font-medium mb-2">Drag & drop or browse files</p>
                        <p className="text-sm">Supported formats: CSV, XLSX</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div>
                        <p className="text-sm text-slate-500">Latest Upload</p>
                        <p className="text-xl font-bold text-slate-800">Attendance_2024_May.csv</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-2xl">
                            <p className="text-sm text-green-700">Processed Records</p>
                            <p className="text-3xl font-bold text-green-700">32</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-2xl">
                            <p className="text-sm text-orange-700">Errors Found</p>
                            <p className="text-3xl font-bold text-orange-700">2</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <DataTable columns={columns} data={data} pagination={true} pageSize={8} />
            </div>
        </div>
    );
};

export default BulkAttendance;

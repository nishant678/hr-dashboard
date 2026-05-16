import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { attendanceData } from "../../data/dummyData";

const AttendanceApproval = () => {
    const [records, setRecords] = useState(attendanceData);

    const handleApprove = (id) => {
        setRecords(records.map(record => record.id === id ? { ...record, status: "Present" } : record));
    };

    const handleReject = (id) => {
        setRecords(records.map(record => record.id === id ? { ...record, status: "Absent" } : record));
    };

    const columns = [
        { key: "employee", label: "Employee", width: "180px" },
        { key: "date", label: "Date", width: "120px" },
        {
            key: "status",
            label: "Status",
            width: "140px",
            render: (value) => (
                <StatusBadge
                    status={value}
                    variant={value === "Present" ? "active" : value === "Absent" ? "rejected" : "pending"}
                />
            )
        },
        { key: "checkIn", label: "Check In", width: "120px" },
        { key: "checkOut", label: "Check Out", width: "120px" },
        {
            key: "actions",
            label: "Actions",
            width: "180px",
            render: (_, row) => (
                <div className="flex items-center gap-2 justify-end">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(row.id);
                        }}
                        className="px-3 py-2 rounded-full bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100"
                    >
                        Approve
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleReject(row.id);
                        }}
                        className="px-3 py-2 rounded-full bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100"
                    >
                        Reject
                    </button>
                </div>
            )
        }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <PageHeader title="Attendance Approval" description="Review and approve attendance anomalies" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Waiting Approval</p>
                    <p className="text-3xl font-bold text-slate-800">{records.filter(r => r.status === "Late" || r.status === "Absent").length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Late Records</p>
                    <p className="text-3xl font-bold text-orange-600">{records.filter(r => r.status === "Late").length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Absent Records</p>
                    <p className="text-3xl font-bold text-red-600">{records.filter(r => r.status === "Absent").length}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <DataTable columns={columns} data={records} pagination={true} pageSize={8} />
            </div>
        </motion.div>
    );
};

export default AttendanceApproval;

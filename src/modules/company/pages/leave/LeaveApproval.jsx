import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { leaveRequestsData } from "../../data/dummyData";

const LeaveApproval = () => {
    const [requests, setRequests] = useState(leaveRequestsData);

    const handleUpdate = (id, status) => {
        setRequests(requests.map(item => item.id === id ? { ...item, status } : item));
    };

    const columns = [
        { key: "employee", label: "Employee", width: "180px" },
        { key: "type", label: "Leave Type", width: "140px" },
        { key: "startDate", label: "From", width: "110px" },
        { key: "endDate", label: "To", width: "110px" },
        { key: "days", label: "Days", width: "80px" },
        {
            key: "status",
            label: "Status",
            width: "120px",
            render: (value) => (
                <StatusBadge status={value} variant={value === "Approved" ? "approved" : value === "Rejected" ? "rejected" : "pending"} />
            )
        },
        {
            key: "actions",
            label: "Actions",
            width: "200px",
            render: (_, row) => (
                <div className="flex items-center gap-2 justify-end">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleUpdate(row.id, "Approved"); }}
                        className="px-3 py-2 rounded-full bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100"
                    >Approve</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleUpdate(row.id, "Rejected"); }}
                        className="px-3 py-2 rounded-full bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100"
                    >Reject</button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Leave Approval" description="Approve or decline pending leave requests" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Pending Requests</p>
                    <p className="text-3xl font-bold text-slate-800">{requests.filter(r => r.status === "Pending").length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Approved</p>
                    <p className="text-3xl font-bold text-green-600">{requests.filter(r => r.status === "Approved").length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Rejected</p>
                    <p className="text-3xl font-bold text-red-600">{requests.filter(r => r.status === "Rejected").length}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <DataTable columns={columns} data={requests} pagination={true} pageSize={8} />
            </div>
        </div>
    );
};

export default LeaveApproval;

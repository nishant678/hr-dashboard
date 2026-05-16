import React from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { shiftsData } from "../../data/dummyData";

const Shifts = () => {
    const columns = [
        { key: "name", label: "Shift Name", width: "180px" },
        { key: "start", label: "Start", width: "110px" },
        { key: "end", label: "End", width: "110px" },
        { key: "days", label: "Days", width: "110px" },
        { key: "employees", label: "Employees", width: "120px" }
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Shift Management" description="Create and assign shift schedules" />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Total Shifts</p>
                    <p className="text-4xl font-bold text-slate-800">{shiftsData.length}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm">
                    <p className="text-sm text-green-700">Average Coverage</p>
                    <p className="text-4xl font-bold text-green-600">92%</p>
                </div>
                <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 shadow-sm">
                    <p className="text-sm text-teal-700">Open Shift Requests</p>
                    <p className="text-4xl font-bold text-teal-700">4</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <DataTable columns={columns} data={shiftsData} pagination={true} pageSize={6} />
            </div>
        </div>
    );
};

export default Shifts;

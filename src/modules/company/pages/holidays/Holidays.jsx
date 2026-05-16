import React from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { holidaysData } from "../../data/dummyData";

const Holidays = () => {
    const columns = [
        { key: "name", label: "Holiday", width: "220px" },
        { key: "date", label: "Date", width: "140px" },
        { key: "type", label: "Type", width: "140px" }
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Holidays" description="Manage the company holiday schedule" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Total Holidays</p>
                    <p className="text-4xl font-bold text-slate-800">{holidaysData.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Upcoming Holiday</p>
                    <p className="text-2xl font-bold text-workbook-dark">{holidaysData[3].name}</p>
                    <p className="text-sm text-slate-500 mt-1">{holidaysData[3].date}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-500">Holiday Types</p>
                    <p className="text-lg font-semibold text-slate-800">National & Festival</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <DataTable columns={columns} data={holidaysData} pagination={true} pageSize={6} />
            </div>
        </div>
    );
};

export default Holidays;

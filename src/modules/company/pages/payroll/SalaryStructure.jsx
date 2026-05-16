import React from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { designationsData } from "../../data/dummyData";

const SalaryStructure = () => {
    const columns = [
        { key: "name", label: "Designation", width: "200px" },
        { key: "level", label: "Level", width: "140px" },
        { key: "description", label: "Base Salary", width: "160px", render: (_, row) => {
            const amounts = { Executive: 150000, Senior: 90000, Junior: 45000 };
            return `₹${(amounts[row.level] || 40000).toLocaleString()}`;
        }},
        { key: "", label: "Bonus Range", width: "160px", render: () => "5% - 12%" }
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Salary Structure" description="Review base salary ranges for each role" />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <DataTable columns={columns} data={designationsData} pagination={true} pageSize={8} />
            </div>
        </div>
    );
};

export default SalaryStructure;

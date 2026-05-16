import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { designationsData } from "../../data/dummyData";

const Designations = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = designationsData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.level.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { key: "name", label: "Designation", width: "180px" },
        { key: "level", label: "Level", width: "120px" },
        { key: "description", label: "Description", width: "280px" }
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Designations" description="Manage company job titles and role levels" />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Search Designations</label>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            placeholder="Developer, Manager, Analyst..."
                        />
                    </div>
                </div>

                <DataTable columns={columns} data={filtered} pagination={true} pageSize={8} />
            </div>
        </div>
    );
};

export default Designations;

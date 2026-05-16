import React from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { documentsData } from "../../data/dummyData";

const Documents = () => {
    const columns = [
        { key: "title", label: "Document", width: "220px" },
        { key: "type", label: "Type", width: "100px" },
        { key: "owner", label: "Owner", width: "140px" },
        { key: "updated", label: "Updated", width: "120px" },
        { key: "", label: "Action", width: "120px", render: () => <button className="text-workbook-dark text-sm font-medium hover:underline">Open</button> }
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Documents" description="Manage company policies, guides and resources" />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <DataTable columns={columns} data={documentsData} pagination={true} pageSize={8} />
            </div>
        </div>
    );
};

export default Documents;

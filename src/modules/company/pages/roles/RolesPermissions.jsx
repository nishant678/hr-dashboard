import React from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { rolesData } from "../../data/dummyData";

const RolesPermissions = () => {
    const columns = [
        { key: "role", label: "Role", width: "180px" },
        { key: "access", label: "Access Level", width: "200px" },
        { key: "members", label: "Members", width: "120px" },
        { key: "", label: "Action", width: "120px", render: () => <button className="text-workbook-dark text-sm font-medium hover:underline">Edit</button> }
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Roles & Permissions" description="Control who can access which features" />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <DataTable columns={columns} data={rolesData} pagination={true} pageSize={8} />
            </div>
        </div>
    );
};

export default RolesPermissions;

import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { employeesData } from "../../data/dummyData";

const EmployeeDirectory = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = employeesData.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { key: "id", label: "ID", width: "100px" },
        { key: "name", label: "Name", width: "180px" },
        { key: "department", label: "Department", width: "140px" },
        { key: "designation", label: "Designation", width: "150px" },
        { key: "email", label: "Email", width: "220px" },
        { key: "phone", label: "Phone", width: "140px" }
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Employee Directory"
                description="Search employee details and view team structure"
            />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Search Directory</label>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            placeholder="Search by name, department, or designation"
                        />
                    </div>
                </div>

                <DataTable columns={columns} data={filtered} pagination={true} pageSize={8} />
            </div>
        </div>
    );
};

export default EmployeeDirectory;

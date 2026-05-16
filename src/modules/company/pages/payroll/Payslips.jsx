import React from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import { payrollData } from "../../data/dummyData";

const Payslips = () => {
    const columns = [
        { key: "employee", label: "Employee", width: "180px" },
        { key: "month", label: "Month", width: "130px" },
        { key: "netSalary", label: "Net Salary", width: "150px", render: (value) => `₹${value.toLocaleString()}` },
        { key: "status", label: "Status", width: "120px" },
        { key: "", label: "Download", width: "120px", render: () => <button className="text-workbook-dark text-sm font-medium hover:underline">Download</button> }
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Payslips" description="Access employee payslip downloads and month-by-month records" />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <DataTable columns={columns} data={payrollData} pagination={true} pageSize={8} />
            </div>
        </div>
    );
};

export default Payslips;

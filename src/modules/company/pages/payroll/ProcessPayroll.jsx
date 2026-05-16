import React from "react";
import PageHeader from "../../components/PageHeader";

const ProcessPayroll = () => {
    return (
        <div className="space-y-6">
            <PageHeader title="Process Payroll" description="Run payroll and approve salary disbursals." />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Pending Runs</p>
                    <p className="text-4xl font-bold text-slate-800">1</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm">
                    <p className="text-sm text-green-700">Net Amount</p>
                    <p className="text-4xl font-bold text-green-600">₹234,000</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500">Last Processed</p>
                    <p className="text-2xl font-semibold text-slate-800">May 25, 2024</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <p className="text-sm text-slate-500">Payroll Cycle</p>
                        <p className="font-semibold text-slate-800">Monthly</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Pay Date</p>
                        <p className="font-semibold text-slate-800">June 1, 2024</p>
                    </div>
                    <button className="bg-workbook-dark text-white px-5 py-3 rounded-2xl hover:bg-workbook-light transition-all">Run Payroll</button>
                </div>
            </div>
        </div>
    );
};

export default ProcessPayroll;

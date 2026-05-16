import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DataTable = ({ columns, data, pagination = true, pageSize = 10, onAction }) => {
    const [page, setPage] = React.useState(1);
    const totalPages = Math.ceil(data.length / pageSize);
    const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            {columns.map((column, idx) => (
                                <th key={idx} className="whitespace-nowrap px-6 py-4 font-semibold">
                                    {column.label}
                                </th>
                            ))}
                            {onAction && <th className="px-6 py-4 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {pagedData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="whitespace-nowrap px-6 py-4 align-top">
                                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                                    </td>
                                ))}
                                {onAction && (
                                    <td className="whitespace-nowrap px-6 py-4 text-right">
                                        <button onClick={() => onAction(row)} className="text-workbook-dark text-sm font-medium hover:underline">Actions</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pagination && totalPages > 1 && (
                <div className="flex items-center justify-between gap-4 px-6 py-4 bg-slate-50">
                    <p className="text-sm text-slate-500">Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data.length)} of {data.length}</p>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="rounded-2xl p-2 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40">
                            <ChevronLeft size={18} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button key={pageNumber} onClick={() => setPage(pageNumber)} className={`rounded-2xl px-3 py-2 text-sm ${page === pageNumber ? "bg-workbook-dark text-white" : "bg-white text-slate-700 hover:bg-slate-100"}`}>
                                {pageNumber}
                            </button>
                        ))}
                        <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded-2xl p-2 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;

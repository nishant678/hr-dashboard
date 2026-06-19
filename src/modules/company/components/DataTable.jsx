import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, Loader2 } from "lucide-react";

const DataTable = ({ 
    columns, 
    data, 
    onRowClick,
    onAction,
    pagination = true,
    pageSize = 10,
    loading = false
}) => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / pageSize);

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            {columns.map((column, idx) => (
                                <th
                                    key={idx}
                                    className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
                                    style={{ width: column.width }}
                                >
                                    {column.label}
                                </th>
                            ))}
                            {onAction && <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + (onAction ? 1 : 0)} className="px-6 py-12 text-center text-slate-400">
                                    <Loader2 size={24} className="animate-spin inline-block mr-2" /> Loading...
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (onAction ? 1 : 0)} className="px-6 py-12 text-center text-slate-400">
                                    No data found
                                </td>
                            </tr>
                        ) : (paginatedData.map((row, rowIdx) => (
                            <tr
                                key={rowIdx}
                                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                                onClick={() => onRowClick && onRowClick(row)}
                            >
                                {columns.map((column, colIdx) => (
                                    <td
                                        key={colIdx}
                                        className="px-6 py-4 text-sm text-slate-700"
                                    >
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : row[column.key]
                                        }
                                    </td>
                                ))}
                                {onAction && (
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onAction(row);
                                            }}
                                            className="p-1.5 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
                                        >
                                            <MoreHorizontal size={16} className="text-slate-400" />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && totalPages > 1 && !loading && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500">
                        Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} results
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={18} className="text-slate-600" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-lg font-medium transition-all ${
                                    currentPage === page
                                        ? "bg-workbook-dark text-white"
                                        : "hover:bg-slate-50 text-slate-700"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={18} className="text-slate-600" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;

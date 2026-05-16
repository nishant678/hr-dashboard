import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, setPage, totalPages }) => {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex items-center gap-2">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="rounded-2xl p-2 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">
                    <ChevronLeft size={18} />
                </button>
                <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded-2xl p-2 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;

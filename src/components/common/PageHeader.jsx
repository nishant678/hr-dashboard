import React from "react";
import { Plus, Filter, Download } from "lucide-react";

const PageHeader = ({ title, description, onAdd, onFilter, onDownload, showActions = true }) => {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
                {description && <p className="text-sm text-slate-500 mt-2">{description}</p>}
            </div>
            {showActions && (
                <div className="flex flex-wrap items-center gap-3">
                    {onFilter && (
                        <button onClick={onFilter} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <Filter size={16} className="inline-block mr-2" />Filter
                        </button>
                    )}
                    {onDownload && (
                        <button onClick={onDownload} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <Download size={16} className="inline-block mr-2" />Export
                        </button>
                    )}
                    {onAdd && (
                        <button onClick={onAdd} className="rounded-2xl bg-workbook-dark px-4 py-2 text-sm text-white hover:bg-workbook-light transition-all">
                            <Plus size={16} className="inline-block mr-2" />Add New
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default PageHeader;

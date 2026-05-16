import React from "react";
import { Plus, Download, Filter } from "lucide-react";

const PageHeader = ({ 
    title, 
    description, 
    onAdd, 
    onDownload, 
    onFilter,
    showActions = true 
}) => {
    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
                    {description && <p className="text-slate-500 mt-1">{description}</p>}
                </div>

                {showActions && (
                    <div className="flex items-center gap-3">
                        {onFilter && (
                            <button
                                onClick={onFilter}
                                className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
                            >
                                <Filter size={18} />
                                Filter
                            </button>
                        )}

                        {onDownload && (
                            <button
                                onClick={onDownload}
                                className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
                            >
                                <Download size={18} />
                                Export
                            </button>
                        )}

                        {onAdd && (
                            <button
                                onClick={onAdd}
                                className="flex items-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg text-sm active:scale-95"
                                style={{ boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)' }}
                            >
                                <Plus size={18} />
                                Add New
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageHeader;

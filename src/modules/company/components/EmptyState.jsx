import React from "react";
import { Plus, Inbox } from "lucide-react";

const EmptyState = ({ icon: Icon = Inbox, title, description, actionLabel, onAction }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Icon size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-sm">{description}</p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="flex items-center gap-2 bg-workbook-dark hover:bg-workbook-light text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg text-sm active:scale-95"
                    style={{ boxShadow: '0 4px 12px rgba(31, 71, 136, 0.3)' }}
                >
                    <Plus size={18} />
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;

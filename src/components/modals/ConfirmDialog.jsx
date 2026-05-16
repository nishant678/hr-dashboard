import React from "react";
import Modal from "./Modal";

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
    return (
        <Modal isOpen={isOpen} onClose={onCancel} title={title || "Confirm Action"}>
            <div className="space-y-6">
                <p className="text-sm text-slate-600">{message || "Are you sure you want to continue?"}</p>
                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Cancel</button>
                    <button onClick={onConfirm} className="rounded-2xl bg-workbook-dark px-4 py-2 text-sm text-white hover:bg-workbook-light">Confirm</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;

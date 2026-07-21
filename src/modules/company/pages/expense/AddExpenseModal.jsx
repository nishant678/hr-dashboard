import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { withBase } from "../../../../config/apiConfig";

const EXPENSE_TYPES = ["TRAVEL", "MEALS", "OFFICE_SUPPLIES", "UTILITIES", "SOFTWARE", "EQUIPMENT", "TRANSPORT", "OTHER"];

const AddExpenseModal = ({ onClose, onSuccess }) => {
    const { token } = useAuth();
    const [expenseType, setExpenseType] = useState("TRAVEL");
    const [amount, setAmount] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !expenseDate) return;

        setSubmitting(true);
        setError("");

        try {
            const res = await fetch(withBase("/api/expenses"), {
                method: "POST",
                headers,
                body: JSON.stringify({ expenseType, amount: parseFloat(amount), expenseDate, description: description.trim() || undefined }),
            });
            const json = await res.json();
            if (json.success) {
                onSuccess();
            } else {
                setError(json.message || "Failed to submit expense");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-800">Submit Expense</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Expense Type</label>
                        <select
                            value={expenseType}
                            onChange={(e) => setExpenseType(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        >
                            {EXPENSE_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                        <input
                            type="date"
                            value={expenseDate}
                            onChange={(e) => setExpenseDate(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description (optional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >Cancel</button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-4 py-2 bg-workbook-dark text-white rounded-lg text-sm font-semibold hover:bg-workbook-dark/90 disabled:opacity-50"
                        >{submitting ? "Submitting..." : "Submit"}</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddExpenseModal;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
    const sizeClasses = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
                    <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl overflow-hidden z-10`}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="px-6 py-6 max-h-[80vh] overflow-y-auto custom-scrollbar">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;

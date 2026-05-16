import React from "react";
import { motion } from "framer-motion";
import workBookLogo from "../../assets/work_book_web_logo.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-workbook-dark via-slate-900 to-slate-800 text-slate-50">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.1),_transparent_25%)]" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl"
        >
          <div className="grid min-h-[640px] grid-cols-1 gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
            <div className="relative overflow-hidden bg-gradient-to-br from-workbook-dark to-slate-900 px-8 py-10 text-white">
              <div className="flex items-center gap-3">
                <img src={workBookLogo} alt="Logo" className="h-11 w-11 rounded-2xl bg-white/10 p-2" />
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-white/70">HRMS Suite</p>
                  <h1 className="mt-2 text-2xl font-bold">WorkBook</h1>
                </div>
              </div>
              <div className="mt-10 space-y-6">
                <div className="rounded-3xl bg-white/10 p-6 shadow-lg shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.2em] text-workbook-orange">Quick access</p>
                  <h2 className="mt-3 text-2xl font-semibold">Super Admin & Company Admin</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">Use the demo credentials below to access each portal immediately.</p>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl bg-white/10 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Super Admin</p>
                    <p className="mt-2 text-sm text-slate-100">superadmin@workbook.com</p>
                    <p className="text-sm text-slate-100">SuperAdmin123</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Company Admin</p>
                    <p className="mt-2 text-sm text-slate-100">companyadmin@acme.com</p>
                    <p className="text-sm text-slate-100">CompanyAdmin123</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto rounded-[2rem] bg-white/10 p-6 text-sm text-slate-200">
                <h3 className="font-semibold text-white">Production-ready UI</h3>
                <p className="mt-2 leading-relaxed text-slate-300">Clean layout, branded gradient, animated login form and responsive design for mobile, tablet and desktop.</p>
              </div>
            </div>
            <div className="px-8 py-10 sm:px-12">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Mail, User, Lock, Building2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "companyadmin" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const destination = user.role === "companyadmin" ? "/company/dashboard" : "/";
      navigate(destination, { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please complete all fields before registering.");
      return;
    }

    const result = register({ name: form.name, email: form.email, role: form.role });
    if (!result.success) {
      setError(result.message);
      return;
    }

    const destination = form.role === "companyadmin" ? "/company/dashboard" : "/";
    navigate(destination, { replace: true });
  };

  return (
    <div className="relative flex h-full flex-col justify-center rounded-[2rem] bg-white/95 px-6 py-10 shadow-2xl sm:px-10 lg:px-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.35em] text-workbook-dark/70">Create account</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Register as a portal user</h1>
          <p className="mt-2 text-sm text-slate-500">Select your role and get quick access to the right dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <User size={18} /> Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Amit Sharma"
              className="mt-3 w-full bg-transparent text-slate-900 outline-none"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <Mail size={18} /> Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="user@acme.com"
              className="mt-3 w-full bg-transparent text-slate-900 outline-none"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <Lock size={18} /> Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Choose a secure password"
              className="mt-3 w-full bg-transparent text-slate-900 outline-none"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <Building2 size={18} /> Role
            </label>
            <select
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="mt-3 w-full bg-transparent text-slate-900 outline-none"
            >
              <option value="companyadmin">Company Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-workbook-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-workbook-light"
          >
            Register <ArrowRight size={18} />
          </button>

          <div className="text-center text-sm text-slate-500">
            Already a user? <Link to="/auth/login" className="font-semibold text-workbook-dark hover:text-workbook-light">Sign in</Link>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-100 p-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
              <CheckCircle2 size={18} /> Demo note
            </div>
            <p>If you choose Super Admin, the app will open the Super Admin dashboard after registration. Choose Company Admin for company portal access.</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;

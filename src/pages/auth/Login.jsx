import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      const destination = user.role === "companyadmin" ? "/company/dashboard" : "/";
      navigate(destination, { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (key, value) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = credentials.email.trim().replace(/\^@/g, "@");
    const password = credentials.password.trim();

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }

    const destination = result.user.role === "companyadmin" ? "/company/dashboard" : "/";
    navigate(destination, { replace: true });
  };

  return (
    <div className="relative flex h-full flex-col justify-center rounded-[2rem] bg-white/95 px-6 py-10 shadow-2xl sm:px-10 lg:px-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.35em] text-workbook-dark/70">Welcome back</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Sign in to your account</h1>
          <p className="mt-2 text-sm text-slate-500">Use demo credentials to access Super Admin or Company Admin portal.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <Mail size={18} /> Email
            </label>
            <input
              value={credentials.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="superadmin@workbook.com"
              className="mt-3 w-full bg-transparent text-slate-900 outline-none"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <Lock size={18} /> Password
            </label>
            <div className="mt-3 flex items-center gap-3">
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="SuperAdmin123"
                className="w-full bg-transparent text-slate-900 outline-none"
              />
              <button
                type="button"
                className="text-slate-500 hover:text-slate-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-workbook-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-workbook-light"
          >
            Sign In <ArrowRight size={18} />
          </button>

          <div className="text-center text-sm text-slate-500">
            Don’t have an account? <Link to="/auth/register" className="font-semibold text-workbook-dark hover:text-workbook-light">Create one</Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

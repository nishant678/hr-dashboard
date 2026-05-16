import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "Amit Sharma",
        role: "Company Admin",
        email: "admin@acme.com",
        phone: "+91 98765 43210",
        location: "Mumbai, India"
    });

    const handleChange = (field, value) => setProfile(prev => ({ ...prev, [field]: value }));

    return (
        <div className="space-y-6">
            <PageHeader title="Profile" description="Update your admin profile and contact details" />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
                    <img src="https://i.pravatar.cc/150?u=company-admin" alt="Profile" className="w-28 h-28 rounded-full object-cover shadow-sm" />
                    <div>
                        <p className="font-semibold text-slate-800">{profile.name}</p>
                        <p className="text-sm text-slate-500">{profile.role}</p>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                        <input
                            value={profile.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                            <input
                                value={profile.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                        <input
                            value={profile.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-workbook-dark/20"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-workbook-dark text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-workbook-light transition-all">Save Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

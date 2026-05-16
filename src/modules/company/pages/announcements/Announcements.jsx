import React from "react";
import PageHeader from "../../components/PageHeader";
import { announcementsData } from "../../data/dummyData";

const Announcements = () => {
    return (
        <div className="space-y-6">
            <PageHeader title="Announcements" description="Publish news and company updates to your team" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500">Announcements Published</p>
                    <p className="text-4xl font-bold text-slate-800">{announcementsData.length}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm">
                    <p className="text-sm text-green-700">High Priority</p>
                    <p className="text-4xl font-bold text-green-700">{announcementsData.filter(item => item.priority === "High").length}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500">Last Updated</p>
                    <p className="text-2xl font-semibold text-slate-800">{announcementsData[0].date}</p>
                </div>
            </div>

            <div className="space-y-4">
                {announcementsData.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-800">{item.title}</h3>
                                <p className="text-sm text-slate-500">{item.author} • {item.date}</p>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.priority}</span>
                        </div>
                        <p className="mt-4 text-slate-600">{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcements;

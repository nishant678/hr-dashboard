import React from "react";
import PageHeader from "../../components/PageHeader";
import { integrationsData } from "../../data/dummyData";

const Integrations = () => {
    return (
        <div className="space-y-6">
            <PageHeader title="Integrations" description="Manage connected tools and external services." />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {integrationsData.map(integration => (
                    <div key={integration.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">{integration.name}</h3>
                            <span className={`text-xs font-semibold ${integration.status === "Connected" ? "text-green-700" : "text-slate-500"}`}>
                                {integration.status}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500">{integration.description}</p>
                        <button className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                            {integration.status === "Connected" ? "Manage" : "Connect"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Integrations;

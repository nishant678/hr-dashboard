import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { notificationsData } from "../../data/dummyData";

const Notifications = () => {
    const [notifications, setNotifications] = useState(notificationsData);

    const markAllRead = () => setNotifications(notifications.map(item => ({ ...item, read: true })));

    return (
        <div className="space-y-6">
            <PageHeader title="Notifications" description="Review recent alerts and company updates" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <p className="text-slate-500">Unread notifications will appear at the top.</p>
                    <p className="text-2xl font-semibold text-slate-800">{notifications.filter(item => !item.read).length} unread</p>
                </div>
                <button onClick={markAllRead} className="bg-workbook-dark text-white px-5 py-3 rounded-2xl hover:bg-workbook-light transition-all">Mark All Read</button>
            </div>

            <div className="space-y-4">
                {notifications.map(notification => (
                    <div key={notification.id} className={`bg-white p-5 rounded-2xl border ${notification.read ? "border-slate-100" : "border-workbook-dark/20"} shadow-sm`}>
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-500">{notification.type}</p>
                                <p className="font-semibold text-slate-800">{notification.message}</p>
                            </div>
                            <span className="text-xs text-slate-500">{notification.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;

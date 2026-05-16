import React from "react";
import PageHeader from "../../components/PageHeader";

const LeaveCalendar = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weeks = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31, "", "", "", ""]
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Leave Calendar" description="Review leave plans and team availability" />

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="grid grid-cols-7 gap-2 text-center mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {days.map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2 text-sm">
                    {weeks.flat().map((date, index) => (
                        <div
                            key={index}
                            className={`min-h-[90px] rounded-2xl border p-2 ${date === 15 || date === 22 ? "bg-workbook-dark/5 border-workbook-dark/15" : "bg-slate-50 border-slate-200"}`}
                        >
                            <div className="text-right text-xs text-slate-500 mb-2">{date}</div>
                            {date === 15 && <div className="rounded-xl bg-blue-100 px-2 py-1 text-[11px] text-blue-700">Team Offsite</div>}
                            {date === 22 && <div className="rounded-xl bg-orange-100 px-2 py-1 text-[11px] text-orange-700">Holiday</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeaveCalendar;

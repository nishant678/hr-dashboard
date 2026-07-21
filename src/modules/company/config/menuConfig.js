import {
    LayoutDashboard,
    Users,
    Building2,
    Clock,
    Calendar,
    DollarSign,
    BarChart3,
    Bell,
    FileText,
    Settings,
    Shield,
    Briefcase,
    UserCog,
    Award,
    CalendarCheck,
    Layers,
    Activity,
    Globe,
    FilePlus,
    ClipboardList
} from "lucide-react";

export const companyMenuItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/company/dashboard",
        description: "Overview & Analytics"
    },
    {
        name: "Employees",
        icon: Users,
        path: "/company/employees",
        description: "Manage Team Members"
    },
    {
        name: "Departments",
        icon: Building2,
        path: "/company/departments",
        description: "Organizational Structure"
    },
    {
        name: "Designations",
        icon: Award,
        path: "/company/designations",
        description: "Job Titles & Roles"
    },
    {
        name: "Attendance",
        icon: Clock,
        path: "/company/attendance",
        description: "Track Attendance",
        subMenu: [
            { name: "Daily Attendance", path: "/company/attendance" },
            { name: "Bulk Upload", path: "/company/attendance/bulk" },
            { name: "Approval", path: "/company/attendance/approval" },
            { name: "Reports", path: "/company/attendance/reports" }
        ]
    },
    {
        name: "Leave Management",
        icon: Calendar,
        path: "/company/leave",
        description: "Leave Requests & Approvals"
    },
    {
        name: "Expenses",
        icon: DollarSign,
        path: "/company/expenses",
        description: "Expense Claims & Reimbursements"
    },
    {
        name: "Holidays",
        icon: CalendarCheck,
        path: "/company/holidays",
        description: "Company Holiday Calendar"
    },
    {
        name: "Shifts",
        icon: Layers,
        path: "/company/shifts",
        description: "Shift Management"
    },
    {
        name: "Payroll",
        icon: DollarSign,
        path: "/company/payroll",
        description: "Salary Management",
        subMenu: [
            { name: "Overview", path: "/company/payroll" },
            { name: "Salary Structure", path: "/company/payroll/structure" },
            { name: "Payslips", path: "/company/payroll/payslips" },
            { name: "Process Payroll", path: "/company/payroll/process" }
        ]
    },
    {
        name: "Reports",
        icon: BarChart3,
        path: "/company/reports",
        description: "Analytics & Insights"
    },
    {
        name: "Analytics",
        icon: Activity,
        path: "/company/analytics",
        description: "Performance Metrics"
    },
    {
        name: "Notifications",
        icon: Bell,
        path: "/company/notifications",
        description: "Alerts & Updates"
    },
    {
        name: "Announcements",
        icon: FileText,
        path: "/company/announcements",
        description: "Internal Communications"
    },
    {
        name: "Documents",
        icon: FilePlus,
        path: "/company/documents",
        description: "File Management"
    },
    {
        name: "Roles & Permissions",
        icon: Shield,
        path: "/company/roles",
        description: "Access Control"
    },
    {
        name: "Integrations",
        icon: Globe,
        path: "/company/integrations",
        description: "Tool Connections"
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/company/settings",
        description: "Company Configuration"
    },
    {
        name: "Profile",
        icon: UserCog,
        path: "/company/profile",
        description: "Company Profile"
    }
];

export const getMenuItemByPath = (path) => {
    const findItem = (items) => {
        for (let item of items) {
            if (item.path === path) return item;
            if (item.subMenu) {
                const found = findItem(item.subMenu);
                if (found) return found;
            }
        }
        return null;
    };
    return findItem(companyMenuItems);
};

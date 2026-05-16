// Employees Data
export const employeesData = [
    {
        id: "EMP001",
        name: "Rahul Verma",
        email: "rahul.verma@acme.com",
        department: "Engineering",
        designation: "Senior Developer",
        joinDate: "2022-01-15",
        status: "Active",
        salary: 75000,
        phone: "9876543210"
    },
    {
        id: "EMP002",
        name: "Priya Sharma",
        email: "priya.sharma@acme.com",
        department: "HR",
        designation: "HR Manager",
        joinDate: "2021-06-20",
        status: "Active",
        salary: 65000,
        phone: "9876543211"
    },
    {
        id: "EMP003",
        name: "Amit Kumar",
        email: "amit.kumar@acme.com",
        department: "Finance",
        designation: "Financial Analyst",
        joinDate: "2022-03-10",
        status: "Active",
        salary: 55000,
        phone: "9876543212"
    },
    {
        id: "EMP004",
        name: "Neha Singh",
        email: "neha.singh@acme.com",
        department: "Sales",
        designation: "Sales Executive",
        joinDate: "2023-01-05",
        status: "Active",
        salary: 45000,
        phone: "9876543213"
    },
    {
        id: "EMP005",
        name: "Vikram Patel",
        email: "vikram.patel@acme.com",
        department: "Engineering",
        designation: "Junior Developer",
        joinDate: "2023-06-15",
        status: "Active",
        salary: 35000,
        phone: "9876543214"
    },
    {
        id: "EMP006",
        name: "Anjali Gupta",
        email: "anjali.gupta@acme.com",
        department: "Marketing",
        designation: "Marketing Manager",
        joinDate: "2022-08-22",
        status: "Active",
        salary: 60000,
        phone: "9876543215"
    },
    {
        id: "EMP007",
        name: "Rajesh Nair",
        email: "rajesh.nair@acme.com",
        department: "Operations",
        designation: "Operations Lead",
        joinDate: "2021-11-03",
        status: "Inactive",
        salary: 58000,
        phone: "9876543216"
    },
    {
        id: "EMP008",
        name: "Sneha Reddy",
        email: "sneha.reddy@acme.com",
        department: "Engineering",
        designation: "QA Engineer",
        joinDate: "2022-09-12",
        status: "Active",
        salary: 48000,
        phone: "9876543217"
    }
];

// Departments Data
export const departmentsData = [
    {
        id: "DEPT001",
        name: "Engineering",
        head: "Rahul Verma",
        employees: 5,
        budget: 500000,
        status: "Active"
    },
    {
        id: "DEPT002",
        name: "HR",
        head: "Priya Sharma",
        employees: 2,
        budget: 150000,
        status: "Active"
    },
    {
        id: "DEPT003",
        name: "Finance",
        head: "Amit Kumar",
        employees: 3,
        budget: 200000,
        status: "Active"
    },
    {
        id: "DEPT004",
        name: "Sales",
        head: "Neha Singh",
        employees: 4,
        budget: 300000,
        status: "Active"
    },
    {
        id: "DEPT005",
        name: "Marketing",
        head: "Anjali Gupta",
        employees: 2,
        budget: 180000,
        status: "Active"
    },
    {
        id: "DEPT006",
        name: "Operations",
        head: "Rajesh Nair",
        employees: 3,
        budget: 200000,
        status: "Active"
    }
];

// Designations Data
export const designationsData = [
    { id: 1, name: "CEO", level: "Executive", description: "Chief Executive Officer" },
    { id: 2, name: "Manager", level: "Senior", description: "Department Manager" },
    { id: 3, name: "Senior Developer", level: "Senior", description: "Senior Software Developer" },
    { id: 4, name: "Developer", level: "Junior", description: "Software Developer" },
    { id: 5, name: "Junior Developer", level: "Junior", description: "Junior Software Developer" },
    { id: 6, name: "HR Manager", level: "Senior", description: "Human Resources Manager" },
    { id: 7, name: "Finance Manager", level: "Senior", description: "Finance Manager" },
    { id: 8, name: "Sales Executive", level: "Junior", description: "Sales Executive" },
    { id: 9, name: "QA Engineer", level: "Senior", description: "Quality Assurance Engineer" },
    { id: 10, name: "Analyst", level: "Junior", description: "Business Analyst" }
];

// Attendance Data
export const attendanceData = [
    {
        id: 1,
        employee: "Rahul Verma",
        date: "2024-05-15",
        checkIn: "09:00 AM",
        checkOut: "06:00 PM",
        status: "Present",
        hours: 9
    },
    {
        id: 2,
        employee: "Priya Sharma",
        date: "2024-05-15",
        checkIn: "09:30 AM",
        checkOut: "06:30 PM",
        status: "Present",
        hours: 9
    },
    {
        id: 3,
        employee: "Amit Kumar",
        date: "2024-05-15",
        checkIn: null,
        checkOut: null,
        status: "Absent",
        hours: 0
    },
    {
        id: 4,
        employee: "Neha Singh",
        date: "2024-05-15",
        checkIn: "10:00 AM",
        checkOut: "06:15 PM",
        status: "Late",
        hours: 8.25
    },
    {
        id: 5,
        employee: "Vikram Patel",
        date: "2024-05-15",
        checkIn: "09:15 AM",
        checkOut: "05:45 PM",
        status: "Present",
        hours: 8.5
    }
];

// Leave Requests Data
export const leaveRequestsData = [
    {
        id: "LR001",
        employee: "Rahul Verma",
        type: "Sick Leave",
        startDate: "2024-05-20",
        endDate: "2024-05-22",
        days: 3,
        reason: "Medical appointment",
        status: "Pending",
        appliedOn: "2024-05-15"
    },
    {
        id: "LR002",
        employee: "Priya Sharma",
        type: "Casual Leave",
        startDate: "2024-05-25",
        endDate: "2024-05-26",
        days: 2,
        reason: "Personal work",
        status: "Approved",
        appliedOn: "2024-05-10"
    },
    {
        id: "LR003",
        employee: "Neha Singh",
        type: "Annual Leave",
        startDate: "2024-06-01",
        endDate: "2024-06-10",
        days: 10,
        reason: "Vacation",
        status: "Pending",
        appliedOn: "2024-05-15"
    },
    {
        id: "LR004",
        employee: "Amit Kumar",
        type: "Sick Leave",
        startDate: "2024-05-18",
        endDate: "2024-05-18",
        days: 1,
        reason: "Fever",
        status: "Rejected",
        appliedOn: "2024-05-18"
    },
    {
        id: "LR005",
        employee: "Vikram Patel",
        type: "Casual Leave",
        startDate: "2024-05-23",
        endDate: "2024-05-23",
        days: 1,
        reason: "Family work",
        status: "Approved",
        appliedOn: "2024-05-20"
    }
];

// Payroll Data
export const payrollData = [
    {
        id: 1,
        employee: "Rahul Verma",
        month: "May 2024",
        salary: 75000,
        bonus: 5000,
        deductions: 8000,
        netSalary: 72000,
        status: "Paid"
    },
    {
        id: 2,
        employee: "Priya Sharma",
        month: "May 2024",
        salary: 65000,
        bonus: 4000,
        deductions: 7000,
        netSalary: 62000,
        status: "Paid"
    },
    {
        id: 3,
        employee: "Amit Kumar",
        month: "May 2024",
        salary: 55000,
        bonus: 3000,
        deductions: 6000,
        netSalary: 52000,
        status: "Pending"
    },
    {
        id: 4,
        employee: "Neha Singh",
        month: "May 2024",
        salary: 45000,
        bonus: 2000,
        deductions: 5000,
        netSalary: 42000,
        status: "Paid"
    }
];

// Holidays Data
export const holidaysData = [
    { id: 1, name: "Republic Day", date: "2024-01-26", type: "National" },
    { id: 2, name: "Holi", date: "2024-03-25", type: "Festival" },
    { id: 3, name: "Independence Day", date: "2024-08-15", type: "National" },
    { id: 4, name: "Diwali", date: "2024-11-01", type: "Festival" },
    { id: 5, name: "Christmas", date: "2024-12-25", type: "National" },
    { id: 6, name: "Company Foundation Day", date: "2024-04-10", type: "Company" }
];

// Announcements Data
export const announcementsData = [
    {
        id: 1,
        title: "New Office Policy",
        content: "We are implementing a new work-from-home policy starting next month.",
        author: "Admin",
        date: "2024-05-15",
        priority: "High"
    },
    {
        id: 2,
        title: "Team Building Event",
        content: "Join us for our annual team building event on June 10th at the company resort.",
        author: "HR",
        date: "2024-05-14",
        priority: "Medium"
    },
    {
        id: 3,
        title: "Updated Leave Policy",
        content: "The leave policy has been updated. Please check your email for details.",
        author: "Admin",
        date: "2024-05-10",
        priority: "High"
    }
];

// Notifications Data
export const notificationsData = [
    {
        id: 1,
        type: "Leave Request",
        message: "New leave request from Rahul Verma",
        timestamp: "2024-05-15 10:30 AM",
        read: false
    },
    {
        id: 2,
        type: "Attendance",
        message: "Attendance approval pending for 5 employees",
        timestamp: "2024-05-15 09:00 AM",
        read: false
    },
    {
        id: 3,
        type: "Payroll",
        message: "Payroll processing completed for May",
        timestamp: "2024-05-14 05:00 PM",
        read: true
    },
    {
        id: 4,
        type: "System",
        message: "System maintenance scheduled for tonight",
        timestamp: "2024-05-13 02:00 PM",
        read: true
    },
    {
        id: 5,
        type: "Employee",
        message: "New employee registration: Sneha Reddy",
        timestamp: "2024-05-12 11:30 AM",
        read: true
    }
];

export const shiftsData = [
    { id: 1, name: "Morning Shift", start: "09:00 AM", end: "05:00 PM", days: "Mon-Fri", employees: 12 },
    { id: 2, name: "Evening Shift", start: "02:00 PM", end: "10:00 PM", days: "Mon-Fri", employees: 8 },
    { id: 3, name: "Night Shift", start: "10:00 PM", end: "06:00 AM", days: "Sun-Thu", employees: 5 },
    { id: 4, name: "Weekend Shift", start: "10:00 AM", end: "04:00 PM", days: "Sat-Sun", employees: 6 }
];

export const documentsData = [
    { id: 1, title: "Employee Handbook", type: "PDF", owner: "HR", updated: "2024-05-10" },
    { id: 2, title: "Expense Policy", type: "PDF", owner: "Finance", updated: "2024-04-22" },
    { id: 3, title: "WFO Policy", type: "DOCX", owner: "Admin", updated: "2024-05-01" },
    { id: 4, title: "Holiday List", type: "XLSX", owner: "HR", updated: "2024-04-15" }
];

export const rolesData = [
    { id: 1, role: "Admin", access: "Full Access", members: 2 },
    { id: 2, role: "HR Manager", access: "Manage HR & Leave", members: 1 },
    { id: 3, role: "Finance", access: "Payroll Only", members: 1 },
    { id: 4, role: "Employee", access: "View Only", members: 20 }
];

export const integrationsData = [
    { id: 1, name: "Slack", status: "Connected", description: "Team notifications and alerts." },
    { id: 2, name: "Google Calendar", status: "Connected", description: "Sync holiday and leave events." },
    { id: 3, name: "Zoom", status: "Not Connected", description: "Meeting scheduling and links." },
    { id: 4, name: "Payroll API", status: "Connected", description: "Automated payroll transactions." }
];

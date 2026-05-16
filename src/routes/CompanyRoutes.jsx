import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CompanyDashboard from "../modules/company/pages/dashboard/Dashboard";
import Employees from "../modules/company/pages/employees/Employees";
import AddEmployee from "../modules/company/pages/employees/AddEmployee";
import EmployeeDirectory from "../modules/company/pages/employees/Directory";
import Departments from "../modules/company/pages/departments/Departments";
import Designations from "../modules/company/pages/designations/Designations";
import Attendance from "../modules/company/pages/attendance/Attendance";
import BulkAttendance from "../modules/company/pages/attendance/BulkAttendance";
import AttendanceApproval from "../modules/company/pages/attendance/AttendanceApproval";
import AttendanceReports from "../modules/company/pages/attendance/AttendanceReports";
import Leave from "../modules/company/pages/leave/Leave";
import LeaveApproval from "../modules/company/pages/leave/LeaveApproval";
import LeaveCalendar from "../modules/company/pages/leave/LeaveCalendar";
import Holidays from "../modules/company/pages/holidays/Holidays";
import Shifts from "../modules/company/pages/shifts/Shifts";
import Payroll from "../modules/company/pages/payroll/Payroll";
import SalaryStructure from "../modules/company/pages/payroll/SalaryStructure";
import Payslips from "../modules/company/pages/payroll/Payslips";
import ProcessPayroll from "../modules/company/pages/payroll/ProcessPayroll";
import Reports from "../modules/company/pages/reports/Reports";
import Analytics from "../modules/company/pages/reports/Analytics";
import Notifications from "../modules/company/pages/notifications/Notifications";
import Announcements from "../modules/company/pages/announcements/Announcements";
import Documents from "../modules/company/pages/documents/Documents";
import RolesPermissions from "../modules/company/pages/roles/RolesPermissions";
import CompanySettings from "../modules/company/pages/settings/CompanySettings";
import Profile from "../modules/company/pages/settings/Profile";
import Integrations from "../modules/company/pages/integrations/Integrations";

const CompanyRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/add" element={<AddEmployee />} />
            <Route path="employees/directory" element={<EmployeeDirectory />} />
            <Route path="departments" element={<Departments />} />
            <Route path="designations" element={<Designations />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="attendance/bulk" element={<BulkAttendance />} />
            <Route path="attendance/approval" element={<AttendanceApproval />} />
            <Route path="attendance/reports" element={<AttendanceReports />} />
            <Route path="leave" element={<Leave />} />
            <Route path="leave/approval" element={<LeaveApproval />} />
            <Route path="leave/calendar" element={<LeaveCalendar />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="shifts" element={<Shifts />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="payroll/structure" element={<SalaryStructure />} />
            <Route path="payroll/payslips" element={<Payslips />} />
            <Route path="payroll/process" element={<ProcessPayroll />} />
            <Route path="reports" element={<Reports />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="documents" element={<Documents />} />
            <Route path="roles" element={<RolesPermissions />} />
            <Route path="settings" element={<CompanySettings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
    );
};

export default CompanyRoutes;

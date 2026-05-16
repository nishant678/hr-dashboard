import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Companies from "../features/companies/pages/Companies";
import Users from "../features/users/pages/Users";
import Transactions from "../features/transactions/pages/Transactions";
import Reports from "../features/reports/pages/Reports";
import SupportTickets from "../features/support/pages/SupportTickets";
import SystemSettings from "../features/settings/pages/SystemSettings";
import AppSettings from "../features/settings/pages/AppSettings";
import Notifications from "../features/notifications/pages/Notifications";
import ActivityLogs from "../features/logs/pages/ActivityLogs";
import RolesPermissions from "../features/roles/pages/RolesPermissions";
import BackupRestore from "../features/backup/pages/BackupRestore";
import Integrations from "../features/integrations/pages/Integrations";
import Subscriptions from "../features/subscriptions/pages/Subscriptions";
import CompanyAdminLayout from "../modules/company/layouts/CompanyAdminLayout";
import CompanyRoutes from "./CompanyRoutes";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/companies"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <Companies />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <Users />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/subscriptions"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <Subscriptions />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/transactions"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <Transactions />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reports"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <Reports />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/support"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <SupportTickets />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <SystemSettings />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/app-settings"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <AppSettings />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notifications"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <Notifications />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/logs"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <ActivityLogs />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/roles"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <RolesPermissions />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/backup"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <BackupRestore />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/integrations"
                element={
                    <ProtectedRoute allowedRoles={["superadmin"]}>
                        <MainLayout>
                            <Integrations />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/company/*"
                element={
                    <ProtectedRoute allowedRoles={["companyadmin"]}>
                        <CompanyAdminLayout>
                            <CompanyRoutes />
                        </CompanyAdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
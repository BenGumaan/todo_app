import { lazy } from "react";
import { Route, Routes } from "react-router";
const DashboardPage = lazy(() => import("@/pages/main/DashboardPage"));

export default function PublicRoutes() {
    return (
        <Routes>
            <Route index element={<DashboardPage />} />
        </Routes>
    )
}

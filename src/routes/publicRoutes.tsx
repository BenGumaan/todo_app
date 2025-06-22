import { lazy } from "react";
import { Route, Routes } from "react-router";
const LoginPage = lazy(() => import("@/pages/login"));
export default function PublicRoutes() {
    return (
        <Routes>
            <Route index element={<LoginPage />} />
        </Routes>
    )
}

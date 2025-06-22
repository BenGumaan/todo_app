import { lazy } from "react";
import { Route, Routes } from "react-router";
const LandingPage = lazy(() => import("../pages/main"));
export default function ProtectedRoutes() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
        </Routes>
    )
}

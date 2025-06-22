import { Route, Routes } from "react-router";
import MainLayout from "./routes/layout";
import ProtectedRoutes from "./routes/protectedRoutes";
import PublicRoutes from "./routes/publicRoutes";

export default function Router() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/public/*" element={<PublicRoutes />} />

      {/* Protected routes inside layout */}
      <Route path="/*" element={<MainLayout />}>
        <Route path="*" element={<ProtectedRoutes />} />
      </Route>
    </Routes>
  );
}

import { Header, Footer } from "@/components/shared";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <Outlet />
      <div>
        <Footer />
      </div>
    </div>
  );
}

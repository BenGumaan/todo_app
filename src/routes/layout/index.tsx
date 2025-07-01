// import { Header, Footer } from "@/components/shared";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
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

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-end items-center min-h-[10vh] bg-secondary p-4">
      <Button
        variant="link"
        onClick={() => navigate("/login")}
        className="cursor-pointer"
      >
        Login
      </Button>
      <Button
        variant="link"
        onClick={() => navigate("/public")}
        className="cursor-pointer"
      >
        Dashboard
      </Button>
    </header>
  );
}

export default Header;

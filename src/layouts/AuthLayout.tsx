import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  isAuthenticated: boolean;
}

export default function AuthLayout({ isAuthenticated }: AuthLayoutProps) {
  return (
    <>
      Auth Layout
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <div>
          <p>"Not Authenticated"</p>
          <Button><Link to="auth">Go Here</Link></Button>
        </div>
      )}
    </>
  );
}

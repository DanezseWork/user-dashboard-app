import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";


interface AuthLayoutProps {
  isAuthenticated: boolean;
}

export default function AuthLayout({ isAuthenticated }: AuthLayoutProps) {
  return (
    <>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <Outlet />
        </>
      ) : (
        <div>
          <p>"Not Authenticated"</p>
          <Button>
            <Link to="auth">Go Here</Link>
          </Button>
        </div>
      )}
    </>
  );
}

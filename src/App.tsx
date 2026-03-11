import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Settings } from "./pages/authenticated/Settings";
import Dashboard from "./pages/authenticated/Dashboard";
import Home from "./pages/authenticated/Home";
import { Users } from "./pages/authenticated/Users";
import { NotFound } from "@/pages/NotFoundPage";
import { useState } from "react";
import AuthPage from "./pages/guest/AuthPage";
import { HeroGeometric } from "./pages/guest/LandingPage";
import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  function authFromStorage() {
    const value = localStorage.getItem("Auth");

    return value ? true : false;
  }

  const [auth, setAuth] = useState(authFromStorage);

  function handleAuthenticationToggle() {
    if (auth) {
      localStorage.removeItem("Auth");
      setAuth(false);
    } else {
      localStorage.setItem("Auth", "true");
      setAuth(true);
    }
  }

  const router = createBrowserRouter([
    {
      Component: GuestLayout,
      children: [
        {
          path: "/",
          Component: HeroGeometric,
        },
        {
          path: "auth",
          element: (
            <AuthPage
              isAuthenticated={auth}
              onClick={handleAuthenticationToggle}
            />
          ),
        },
      ],
    },
    {
      element: <AuthLayout isAuthenticated={auth} />,
      children: [
        // Nested Routes
        {
          path: "/dashboard",
          Component: Dashboard,
          children: [{ index: true, Component: Home }],
        },
        { path: "users", Component: Users },
        { path: "settings", Component: Settings },
      ],
    },
    {
      path: "*",
      Component: NotFound,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

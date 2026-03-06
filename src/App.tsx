import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Settings } from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { UserLayout } from "./layouts/UserLayout";
import { User } from "./pages/User";
import { EditUser } from "./pages/EditUser";
import { NotFound } from "@/pages/NotFoundPage";
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import { HeroGeometric } from "./pages/Hero";
import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";

 

function App() {
  function authFromStorage(){
    const value = localStorage.getItem('Auth')

    return value ? true : false
  }

  const [auth, setAuth] = useState(authFromStorage);

  function handleAuthenticationToggle(){
      if (auth){
        localStorage.removeItem('Auth')
        setAuth(false)
      } else {
        localStorage.setItem('Auth', 'true')
        setAuth(true)
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
        {
          element: <AuthLayout isAuthenticated={auth} />,
          children: [
            // Nested Routes
            {
              path: "/dashboard",
              Component: Dashboard,
              children: [
                { index: true, Component: Home },
                { path: "settings", Component: Settings },
              ],
            },
          ],
        },

        // Layout Route
        // {
        //   Component: UserLayout, // No Path
        //   children: [
        //     { index: true, Component: User },
        //     {
        //       path: ":id/edit",
        //       Component: EditUser,
        //     },
        //   ],
        // },
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

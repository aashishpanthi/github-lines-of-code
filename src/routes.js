import { useRoutes } from "react-router-dom";

// layouts
import NavAndFooterLayout from "./layouts/NavAndFooterLayout";
import NavOnlyLayout from "./layouts/NavOnly";

//import other pages
import NotFound from "./pages/Page404";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Card from "./pages/Card";
import Login from "./pages/Login";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <NavAndFooterLayout />,
      children: [{ path: "", element: <Home /> }],
    },
    {
      path: "/app",
      element: <NavOnlyLayout />,
      children: [{ path: "", element: <Dashboard /> }],
    },
    {
      path: "/card",
      element: <Card />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "*", element: <NotFound /> },
  ]);
}

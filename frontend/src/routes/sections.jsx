import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import PrivateRoutes from "./PrivateRoute";
import RestaurantDetails from "../sections/restaurrant/restaurantDetails";

export const IndexPage = lazy(() => import("../pages/app"));
export const BlogPage = lazy(() => import("../pages/blog"));
export const UserPage = lazy(() => import("../pages/user"));
export const LoginPage = lazy(() => import("../pages/login"));
export const ProductsPage = lazy(() => import("../pages/products"));
export const Page404 = lazy(() => import("../pages/page-not-found"));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <PrivateRoutes>
            <Suspense>
              <Outlet />
            </Suspense>
          </PrivateRoutes>
        </DashboardLayout>
      ),
      children: [
        { element: <UserPage />, index: true },
        { path: 'restaurantDetails/:id', element: <RestaurantDetails /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },

    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

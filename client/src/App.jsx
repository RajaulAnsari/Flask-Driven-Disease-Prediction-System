import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import SymptomsChecker from "./components/SymptomsChecker";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import BlogPage from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import FAQ from "./components/FAQ";
import UserHistory from "./components/UserHistory";
import AdminAllUsers from "./components/AdminAllUsers";
const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/login",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: "/register",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Register />
              </Suspense>
            ),
          },
          {
            path: "/symptomschecker",
            element: (
              <PrivateRoute>
                <Suspense fallback={<div>Loading...</div>}>
                  <SymptomsChecker />
                </Suspense>
              </PrivateRoute>
            ),
          },
          {
            path: "/reports",
            element: (
              <PrivateRoute>
                <Suspense fallback={<div>Loading...</div>}>
                  <UserHistory />
                </Suspense>
              </PrivateRoute>
            ),
          },
          {
            path: "/admin",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AdminLogin />
              </Suspense>
            ),
          },
          {
            path: "/admin/dashboard",
            element: (
              <AdminRoute>
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminDashboard />
                </Suspense>
              </AdminRoute>
            ),
          },
          {
            path: "/admin/users",
            element: (
              <AdminRoute>
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminAllUsers />
                </Suspense>
              </AdminRoute>
            ),
          },
          {
            path: "/blog",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <BlogPage />
              </Suspense>
            ),
          },
          {
            path: "/blog/:id",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <BlogDetails />
              </Suspense>
            ),
          },
          {
            path: "/faq",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <FAQ />
              </Suspense>
            ),
          },
        ])}
      />
    </>
  );
}

export default App;

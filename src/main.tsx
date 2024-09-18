import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Signup } from "./pages/Signup.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { AuthLayout } from "./pages/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: (
        <AuthLayout>
          <Signin />
        </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
        <AuthLayout>
          <Signup />
        </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);

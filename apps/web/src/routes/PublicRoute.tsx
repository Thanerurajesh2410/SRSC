import { Navigate, Outlet } from "react-router-dom";

import { auth } from "../utils/auth";

export default function PublicRoute() {
  const token = auth.getToken();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
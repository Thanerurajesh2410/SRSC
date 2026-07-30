import { Navigate, Outlet } from "react-router-dom";

import { auth } from "../utils/auth";

export default function ProtectedRoute() {
  const token = auth.getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
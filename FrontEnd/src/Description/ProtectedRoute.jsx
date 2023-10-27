import { Outlet, Navigate } from "react-router";

export default function ProtectedRoute() {
  const Authenticated = sessionStorage.getItem("token");

  return Authenticated ? (
    <Outlet replace={true} />
  ) : (
    <Navigate to="/Login" replace={true} />
  );
}

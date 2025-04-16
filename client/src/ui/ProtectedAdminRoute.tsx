import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Auth/useAuth";
import Spinner from "./Spinner";

export default function ProtectedAdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.is_superuser) return <Navigate to="/home" replace />;

  return <Outlet />;
}

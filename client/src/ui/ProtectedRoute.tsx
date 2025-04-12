import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "../contexts/AuthContext";
import { removeToken } from "../lib/utils/manageCookie";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) {
    removeToken();
    return <Navigate to="/login" replace />;
  }

  return children;
}

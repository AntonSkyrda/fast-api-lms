// import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../lib/utils/manageCookie";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const isAuthenticated = !!getToken();
  const { isLoading } = useUser();
  useEffect(
    function () {
      // console.log("Component mounted");
      if (!isAuthenticated) {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate],
  );
  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return null;

  return children;
}

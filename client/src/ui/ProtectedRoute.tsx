// import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../lib/utils/manageCookie";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  // const isAuthenticated = useIsAuthenticated();
  const isAuthenticated = !!getToken();
  console.log(isAuthenticated);

  useEffect(
    function () {
      // console.log("Component mounted");
      if (!isAuthenticated) {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate],
  );

  if (!isAuthenticated) return null;

  return children;
}

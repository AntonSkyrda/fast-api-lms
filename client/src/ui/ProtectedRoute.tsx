import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(
    function () {
      // console.log("Component mounted");
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate],
  );

  if (!isAuthenticated) return null;

  return children;
}

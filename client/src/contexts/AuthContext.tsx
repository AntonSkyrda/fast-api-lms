import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import { userSchema } from "../schemas/usersSchema";
import { removeToken, saveToken } from "../lib/utils/manageCookie";
import {
  login as loginApi,
  logout as logoutApi,
} from "../lib/services/apiAuth";
import { getUserByToken } from "../lib/services/apiUsers";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type User = z.infer<typeof userSchema> | null;

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginError: string;
  getUserError: Error | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  refetchUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const [loginError, setLoginError] = useState("");

  const {
    data: user,
    isLoading,
    refetch: refetchUser,
    error: getUserError,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUserByToken,
    enabled: pathname !== "/login",
    staleTime: 0,
    retry: false,
  });

  useEffect(
    function () {
      if (getUserError) {
        toast.error(getUserError.message);
        removeToken();
        navigate("/login");
      }
    },
    [getUserError, navigate],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { token } = await loginApi({ email, password });
        saveToken(token);
        await refetchUser();
        navigate("/home", {
          replace: true,
        });
      } catch (err) {
        setLoginError((err as Error).message);
      }
    },
    [refetchUser, navigate],
  );

  const logout = useCallback(async () => {
    await logoutApi();
    removeToken();
    queryClient.removeQueries({ queryKey: ["user"], exact: true });
    navigate("/login", { replace: true });
  }, [queryClient, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        loginError,
        getUserError,
        login,
        logout,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

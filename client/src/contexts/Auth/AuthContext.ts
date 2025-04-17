import { createContext } from "react";
import { userSchema } from "../../schemas/plainShemas";
import { z } from "zod";

export type User = z.infer<typeof userSchema> | null;

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

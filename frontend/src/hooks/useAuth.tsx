import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, logoutUser } from "@/lib/queries/auth";

export function useAuth() {
  const register = useMutation({ mutationFn: registerUser });
  const login = useMutation({ mutationFn: loginUser });
  const logout = useMutation({ mutationFn: logoutUser });

  return {
    register,
    login,
    logout,
  };
}

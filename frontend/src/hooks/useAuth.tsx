import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserInformation,
} from "@/lib/queries/auth";

export function useAuth() {
  const register = useMutation({ mutationFn: registerUser });
  const login = useMutation({ mutationFn: loginUser });
  const logout = useMutation({ mutationFn: logoutUser });
  const getUserInFo = useMutation({
    mutationFn: getUserInformation,
  });

  return {
    register,
    login,
    logout,
    getUserInFo,
  };
}

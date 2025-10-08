import type { LoginRequestBody, SignUpRequestBody } from "./request-bodys";

interface AuthState {
  user: any;
  success: boolean;
  message: string;
  resetUrl: string;
  isLoading: boolean;
  checkingAuth: boolean;
  signup: (data: SignUpRequestBody, onSuccess?: () => void) => Promise<void>;
  login: (data: LoginRequestBody, onSuccess?: () => void) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    token: string,
    newPassword: string,
    onSuccess?: () => void
  ) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export type { AuthState };

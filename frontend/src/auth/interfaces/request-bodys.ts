interface SignUpRequestBody {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
  remember?: boolean;
}

export type { SignUpRequestBody, LoginRequestBody };

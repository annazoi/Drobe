export interface SignUp {
  email: string;
  username: string;
  password: string;
  age?: number;
  avatar?: any;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  age?: number;
  avatar?: string;
}

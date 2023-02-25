import { LoginRequest, SignUpRequest } from "@/types/request/user";
import jwtDecode from "jwt-decode";

const url: string = process.env.API_URL as string;

export const useAuth = (): [
  (request: LoginRequest) => Promise<void>,
  (request: SignUpRequest) => Promise<void>,
  () => boolean
] => {
  const login = async (request: LoginRequest): Promise<void> => {
    try {
      const res: Response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      console.log(data.token);
    } catch (error) {
      () => console.log(error);
    }
  };

  const signup = async (request: SignUpRequest): Promise<void> => {
    try {
      const res: Response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      console.log(data.token);
    } catch (error) {
      () => console.log(error);
    }
  };

  const isLoggedIn = (): boolean => {
    const token = localStorage.getItem("token");
    if (token == null) {
      return false;
    }
    const decoded: { exp: number; iat: number; username: string } =
      jwtDecode(token);
    return new Date().getTime() / 1000 < decoded.exp;
  };

  return [login, signup, isLoggedIn];
};

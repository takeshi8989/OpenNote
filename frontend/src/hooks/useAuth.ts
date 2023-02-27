import { LoginRequest, SignUpRequest } from "@/types/request/userRequest";
import jwtDecode from "jwt-decode";

const url: string = process.env.API_URL as string;

export const useAuth = (): {
  login: (request: LoginRequest) => Promise<boolean>;
  signup: (request: SignUpRequest) => Promise<boolean>;
  checkIsLoggedIn: () => boolean;
} => {
  const login = async (request: LoginRequest): Promise<boolean> => {
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
      const decoded: { exp: number; iat: number; sub: string } = jwtDecode(
        data.token
      );
      localStorage.setItem("username", decoded.sub);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const signup = async (request: SignUpRequest): Promise<boolean> => {
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
      const decoded: { exp: number; iat: number; sub: string } = jwtDecode(
        data.token
      );
      localStorage.setItem("username", decoded.sub);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const checkIsLoggedIn = (): boolean => {
    const token = localStorage.getItem("token");
    if (token == null) {
      return false;
    }
    const decoded: { exp: number; iat: number; sub: string } = jwtDecode(token);
    return new Date().getTime() / 1000 < decoded.exp;
  };

  return { login, signup, checkIsLoggedIn };
};

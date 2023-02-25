import { LoginRequest, SignUpRequest } from "@/types/request/user";

const url: string = process.env.API_URL as string;

export const useAuth = (): [
  (request: LoginRequest) => Promise<void>,
  (request: SignUpRequest) => Promise<void>
] => {
  const login = async (request: LoginRequest): Promise<void> => {
    try {
      const res: Response = await fetch(`${url}/auth/login}`, {
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
      const res: Response = await fetch(`${url}/auth/signup}`, {
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

  return [login, signup];
};

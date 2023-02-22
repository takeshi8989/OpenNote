import { UserRequest } from "@/types/request/user";
import React, { useState } from "react";

// {
//     "username": "newuser",
//     "email" : "newu@gmail.com",
//     "password" : "password"
// }
const url: string = process.env.API_URL as string;
const LoginForm = ({ formType }: { formType: string }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: any): Promise<void> => {
    e.preventDefault();
    const request: UserRequest = { username, email, password };
    try {
      const res: Response = await fetch(`${url}/auth/${formType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
    } catch (error) {
      () => console.log(error);
    }
  };

  return (
    <div>
      <form action="submit">
        <input
          type="text"
          placeholder="usernmae"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLogin}>
          {formType}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

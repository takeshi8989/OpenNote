//   const handleLogin = async (e: any): Promise<void> => {
//     e.preventDefault();
//     const request: UserRequest = { username, email, password };
//     try {
//       const res: Response = await fetch(`${url}/auth/${formType}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(request),
//       });
//       const data = await res.json();
//       localStorage.setItem("token", data.token);
//     } catch (error) {
//       () => console.log(error);
//     }
//   };

import React, { useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { useAuth } from "@/hooks/useAuth";
import { LoginRequest, SignUpRequest } from "@/types/request/user";

export const LoginModal = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [login, signup] = useAuth();

  const handler = () => setVisible(true);

  const closeHandler = (): void => {
    setVisible(false);
  };

  const handleAuth = () => {
    if (isSignUp) {
      const request: SignUpRequest = { username, email, password };
      signup(request);
    } else {
      const request: LoginRequest = { username, password };
      login(request);
    }
  };

  return (
    <div>
      <Button auto flat onPress={handler}>
        Login
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18} className="ml-2">
              Open Note
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text
            size={14}
            className="text-center text-blue-400"
            onClick={() => {
              console.log("fsa");
              setIsSignUp(!isSignUp);
            }}
          >
            {isSignUp ? "Already have an account?" : "Create an account?"}
          </Text>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {isSignUp && (
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          )}
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {!isSignUp && (
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text size={14}>Forgot password?</Text>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto flat color="default" onPress={handleAuth}>
            {isSignUp ? "Sign up" : "Log in"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

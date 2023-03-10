import React, { useState, useEffect } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { useAuth } from "@/hooks/useAuth";
import { LoginRequest, SignUpRequest } from "@/types/request/userRequest";
import { useAtom, useSetAtom } from "jotai/react";
import {
  isLoggedInAtom,
  openLoginModalAtom,
  usernameAtom,
} from "@/jotai/authAtom";
import { useRouter } from "next/router";

export const LoginModal = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openLoginModal, setOpenLoginModal] = useAtom(openLoginModalAtom);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const setGlobalUsername = useSetAtom(usernameAtom);
  const router = useRouter();
  const { validateSignUp, login, signup } = useAuth();

  const handler = () => setOpenLoginModal(true);

  useEffect(() => {
    resetModal();
  }, [isSignUp]);

  const closeHandler = (): void => {
    setOpenLoginModal(false);
    resetModal();
  };

  const resetModal = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  const handleAuth = (): void => {
    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  const handleSignUp = () => {
    const msg = validateSignUp(username, password);
    if (msg !== "") {
      setErrorMessage(msg);
      return;
    }
    const request: SignUpRequest = { username, email, password };
    signup(request).then((loginSuccess) => {
      if (loginSuccess) {
        setIsLoggedIn(true);
        setGlobalUsername(username);
        closeHandler();
      } else {
        setErrorMessage("Failed to signup");
      }
    });
  };

  const handleLogin = () => {
    const request: LoginRequest = { username, password };
    login(request).then((loginSuccess) => {
      if (loginSuccess) {
        setIsLoggedIn(true);
        setGlobalUsername(username);
        closeHandler();
      } else {
        setErrorMessage("the user does not exist. login failed.");
      }
    });
  };

  return (
    <div>
      <Button auto flat onPress={handler}>
        Login
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={openLoginModal}
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
          {errorMessage && (
            <Text size="$lg" className="text-center text-red-400">
              {errorMessage}
            </Text>
          )}
          <Text
            size={14}
            className="text-center text-blue-400"
            onClick={() => {
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
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          {isSignUp && (
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
          )}
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          {/* TO-DO Remember me -> extend expire date */}

          {/* {!isSignUp && (
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text size={14}>Forgot password?</Text>
            </Row>
          )} */}
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

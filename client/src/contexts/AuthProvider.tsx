import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { AuthService } from "../client";
import { loggedInOrNot } from "../utility";

const signin =
  (setUser: Dispatch<SetStateAction<string | null>>) =>
  async (username: string, password: string, callback: () => void) => {
    const { access_token } = await AuthService.authLogin({
      username,
      password,
    });
    sessionStorage.setItem("accessToken", access_token);
    setUser(loggedInOrNot(access_token));
    callback();
  };

interface AuthProviderValue {
  user: ReturnType<typeof loggedInOrNot>;
  signin: ReturnType<typeof signin> | (() => void);
}

const AuthContext = createContext<AuthProviderValue>({
  user: loggedInOrNot(),
  signin: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(loggedInOrNot);

  const value = { user, signin: signin(setUser) };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };

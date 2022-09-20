import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { AuthService } from "../client";
import { loggedInOrNot } from "./utility";

const signin =
  (setUser: Dispatch<SetStateAction<string | null>>) =>
  async (username: string, password: string, callback: () => void) => {
    const { access_token } = await AuthService.authLogin({
      formData: { username, password },
    });
    sessionStorage.setItem("accessToken", access_token);
    setUser(loggedInOrNot(access_token));
    callback();
  };

const signout = () => "Signed Out";

interface AuthProviderValue {
  user: ReturnType<typeof loggedInOrNot>;
  signin: ReturnType<typeof signin> | (() => void);
  signout: typeof signout;
}

const AuthContext = createContext<AuthProviderValue>({
  user: loggedInOrNot(),
  signin: () => {},
  signout,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(loggedInOrNot);

  const value = { user, signin: signin(setUser), signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };

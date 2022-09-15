import axios from "axios";
import { createContext, useContext, useState } from "react";
import { loggedInOrNot } from "./utility";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loggedInOrNot());

  const signin = async (username, password, callback) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const params = new URLSearchParams([
      ["username", username],
      ["password", password],
    ]);

    return axios.post("/auth/login", params, { headers }).then(({ data }) => {
      sessionStorage.setItem("accessToken", data.access_token);
      setUser(loggedInOrNot());
      callback();
    });
  };

  const signout = () => "Signed Out";

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };

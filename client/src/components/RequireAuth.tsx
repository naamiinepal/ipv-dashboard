import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [navigate, user, location]);

  return children;
};

export default RequireAuth;

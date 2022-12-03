import { Button, Card, TextField } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import type { FormEventHandler, FunctionComponent } from "react";
import { useState } from "react";
import type { To } from "react-router";
import { useLocation, useNavigate } from "react-router";
import { AuthService } from "../client";

const Login: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { access_token } = await AuthService.authLogin({
      username,
      password,
    });
    sessionStorage.setItem("accessToken", access_token);
    // Send them back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    const from: To = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  return (
    <Card className="w-1/3 mx-auto mt-10 p-4">
      <DialogTitle className="text-center">Login</DialogTitle>
      <form className=" flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="my-2">
          <TextField
            id="outlined-username"
            label="Username"
            onChange={({ target: { value } }) => setUsername(value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="mb-3">
          <TextField
            id="outlined-password"
            label="Password"
            type="password"
            onChange={({ target: { value } }) => setPassword(value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;

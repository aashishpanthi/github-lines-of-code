import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext, UserUpdateContext } from "../UserContext";
import { API } from "aws-amplify";
import { CircularProgress } from "@mui/material";

function Login() {
  const user = useContext(UserContext);
  const setUser = useContext(UserUpdateContext);

  const getUser = async () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    console.log("code", code);
    if (code) {
      await API.post("locapi", "/user/login/callback", {
        body: {
          code,
        },
      }).then((data) => {
        setUser(data.data);
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // return a loading screen material ui
  if (user === null) {
    return (
      <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  if (user) {
    return <Navigate to="/app" />;
  }

  return <div>Login</div>;
}

export default Login;

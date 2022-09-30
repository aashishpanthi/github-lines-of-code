import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext, UserUpdateContext } from "../UserContext";
import { API } from "aws-amplify";

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
        setUser(data);
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // return a loading screen material ui
  if (user === null) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/app" />;
  }

  return <div>Login</div>;
}

export default Login;

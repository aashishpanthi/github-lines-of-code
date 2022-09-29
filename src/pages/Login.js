import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext, UserUpdateContext } from "../UserContext";

function Login() {
  const user = useContext(UserContext);
  const setUser = useContext(UserUpdateContext);

  return <div>Login</div>;
}

export default Login;

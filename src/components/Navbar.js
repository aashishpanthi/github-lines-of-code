import { Link, Navigate } from "react-router-dom";
import styles from "./styles/navbar.module.css";

import * as queryString from "query-string";

const Navbar = () => {
  const Login = () => {
    const app_id = process.env.REACT_APP_APP_ID;
    console.log(app_id);

    const params = queryString.stringify({
      client_id: app_id,
      scope: ["read:user", "user:email", "repo"].join(" "), // space seperated string
      allow_signup: true,
    });

    const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

    window.location.href = githubLoginUrl;
  };

  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbar__logo} to="/">
        <img src="/logo512.png" alt="logo" />
        <span>Lines of Code</span>
      </Link>
      <div className={styles.navbar__links}>
        <Link to="/">Home</Link>
        <button className={styles.navButton} onClick={Login}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

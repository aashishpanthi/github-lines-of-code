import { Link } from "react-router-dom";
import styles from "./styles/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbar__logo} to="/">
        <img src="/logo192.png" alt="logo" />
        <span>Lines of Code</span>
      </Link>
      <div className={styles.navbar__links}>
        <Link to="/">Home</Link>
        <button className={styles.navButton}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;

import CardDemo from "../components/CardDemo";
import Hero from "../components/Hero";
import styles from "./styles/home.module.css";

import { UserContext } from "../UserContext";
import { useContext } from "react";

import { Navigate } from "react-router-dom";

const Home = () => {
  const user = useContext(UserContext);

  if (user) {
    return <Navigate to="/app" />;
  }

  return (
    <div className={styles.container}>
      <Hero />
      <CardDemo />
    </div>
  );
};

export default Home;

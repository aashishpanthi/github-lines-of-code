import Hero from "../components/Hero";
import styles from "./styles/home.module.css";

const Home = () => {
  return (
    <div class={styles.container}>
      <Hero />
    </div>
  );
};

export default Home;

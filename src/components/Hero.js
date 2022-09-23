import styles from "./styles/hero.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.hero__title}>Count Your Lines of Code</h1>
      <p className={styles.hero__subtitle}>
        Connect your GitHub account and find how many lines of code you have
        written. Also generate a card with your stats and share it.
      </p>

      <div className={styles.hero__buttons}>
        <button className={styles.loginBtn}>Get Started Now</button>
        <button className={styles.videoBtn}>
          <PlayArrowIcon /> <span>Watch Video</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;

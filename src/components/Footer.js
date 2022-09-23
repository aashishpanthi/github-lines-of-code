import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "./styles/footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.appInfo}>
        <a href="https://youtube.com/" className={styles.appLink}>
          Demo video
        </a>
        <a href="https://blog.aashish-panthi.com.np" className={styles.appLink}>
          Full guide
        </a>
        <a href="https://github.com/aashishpanthi" className={styles.appLink}>
          Source code
        </a>
      </div>

      <div className={styles.authorInfo}>
        <p>
          Developed by{" "}
          <a href="https://aashishpanthi.info.np">Aashish Panthi</a>
        </p>
        <div className={styles.authorLinks}>
          <a href="https://github.com/aashishpanthi" title="Find on GitHub">
            <GitHubIcon />
          </a>
          <a href="https://twitter.com/aashishpanthi11" title="Find on Twitter">
            <TwitterIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/aashishpanthi/"
            title="Connect on Linkedin"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://www.instagram.com/aashishpanthi11/"
            title="Follow on Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

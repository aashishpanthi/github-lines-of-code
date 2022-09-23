import styles from "./styles/hero.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import Modal from "../components/Modal";
import { Button, Box, Typography } from "@mui/material";

const Hero = () => {
  const [videoOpen, setvideoOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className={styles.hero}>
      <h1 className={styles.hero__title}>Count Your Lines of Code</h1>
      <p className={styles.hero__subtitle}>
        Connect your GitHub account and find how many lines of code you have
        written. Also generate a card with your stats and share it.
      </p>

      <div className={styles.hero__buttons}>
        <button onClick={() => setLoginOpen(true)} className={styles.loginBtn}>
          Get Started Now
        </button>
        <button onClick={() => setvideoOpen(true)} className={styles.videoBtn}>
          <PlayArrowIcon /> <span>Watch Video</span>
        </button>
      </div>
      <Modal open={loginOpen} setOpen={setLoginOpen}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Login with GitHub
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Please allow us to access your private and public repositories to
            get your stats better.
          </Typography>

          <Button
            variant="outlined"
            color="success"
            size="large"
            style={{ marginTop: "10px" }}
          >
            Continue with GitHub
          </Button>
        </Box>
      </Modal>
      <Modal open={videoOpen} setOpen={setvideoOpen}>
        <iframe
          width="650"
          height="375"
          src="https://www.youtube.com/embed/lEi_XBg2Fpk"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Modal>
    </div>
  );
};

export default Hero;

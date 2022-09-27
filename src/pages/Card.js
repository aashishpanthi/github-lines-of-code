import { Button, IconButton, Snackbar } from "@mui/material";
import { useEffect, useCallback, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CardPiece from "../components/Card";
import styles from "./styles/card.module.css";
import { toPng } from "html-to-image";
import { copyImageToClipboard } from "copy-image-clipboard";
import CloseIcon from "@mui/icons-material/Close";

const data = {
  username: "aashishpanthi",
  photo: "https://avatars.githubusercontent.com/u/60884239?v=4",
  totalLines: 102000,
  publicRepo: 42000,
  privateRepo: 60000,
  languages: [
    {
      name: "JavaScript",
      lines: 100,
    },
    {
      name: "Python",
      lines: 50,
    },
    {
      name: "C#",
      lines: 20,
    },
    {
      name: "HTML",
      lines: 75,
    },
    {
      name: "Java",
      lines: 40,
    },
  ],
};

const Card = () => {
  const navigate = useNavigate();

  //create ref for the card
  const ref = useRef(null);

  // state for the toast
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [searchParams] = useSearchParams();
  const query = searchParams.get("user");

  useEffect(() => {
    if (!query) {
      navigate("/");
    }
  }, [query, navigate]);

  const openToast = (message, severity) => {
    setToast({ message, severity, open: true });
  };

  const closeToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast({ message: "", severity: "", open: false });
  };

  const copyToClipboard = async () => {
    toPng(ref.current)
      .then(async (dataUrl) => {
        try {
          copyImageToClipboard(dataUrl)
            .then(() => {
              openToast("Image Copied", "success");
            })
            .catch((e) => {
              openToast(`Error: ${e.message}`, "error");
            });
        } catch (error) {
          console.log(error);
        }
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const downloadImage = useCallback(() => {
    if (ref.current === null) {
      console.log("ref is null");
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${data.username}-lines-of-code-card.png`;
        link.href = dataUrl;
        link.click();

        openToast("Download started", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  // action buttons for the toast
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeToast}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div className={styles.container}>
      <div className={styles.card} ref={ref}>
        <CardPiece data={data} />
      </div>

      <div className={styles.buttons}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={downloadImage}
        >
          Download Card
        </Button>
        {/* make a download Button */}
        <Button
          variant="outlined"
          color="success"
          size="large"
          onClick={copyToClipboard}
        >
          Copy to Clipboard
        </Button>
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={closeToast}
        message={toast.message}
        action={action}
        severity={toast.severity}
      />
    </div>
  );
};

export default Card;

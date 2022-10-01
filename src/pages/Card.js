import { Button, IconButton, Snackbar } from "@mui/material";
import { useEffect, useCallback, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CardPiece from "../components/Card";
import styles from "./styles/card.module.css";
import { toPng } from "html-to-image";
import { copyImageToClipboard } from "copy-image-clipboard";
import CloseIcon from "@mui/icons-material/Close";
import { API } from "aws-amplify";

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

  //state for data
  const [data, setData] = useState({
    username: "",
    photo: "",
    privateRepo: 0,
    publicRepo: 0,
    languages: [],
    totalLines: 0,
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

  const getCardDetails = async () => {
    console.log(query);
    try {
      const data = await API.get("locapi", `/user/${query}`);
      console.log("data", data);

      const resData = data[0];
      console.log("resData", resData);

      // pnly return five keys with highest values
      const languages = Object.keys(resData.languages)
        .sort((a, b) => resData.languages[b] - resData.languages[a])
        .slice(0, 5)
        .reduce((obj, key) => {
          obj[key] = resData.languages[key];
          return obj;
        }, {});

      resData.languages = languages;

      setData({
        ...resData,
        totalLines: resData.privateRepo + resData.publicRepo,
      });

      openToast("Card details fetched successfully", "success");
    } catch (error) {
      console.log("error", error);
      openToast("Error fetching card details", "error");
    }
  };

  useEffect(() => {
    if (query) {
      getCardDetails();
    }
  }, [query]);

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

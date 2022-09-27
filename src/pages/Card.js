import { Button } from "@mui/material";
import { useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CardPiece from "../components/Card";
import styles from "./styles/card.module.css";
import { toPng, toSvg } from "html-to-image";
import { copyImageToClipboard } from "copy-image-clipboard";

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
  const ref = useRef(null);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("user");

  useEffect(() => {
    if (!query) {
      navigate("/");
    }
  }, [query, navigate]);

  const copyToClipboard = async () => {
    toPng(ref.current)
      .then(async (dataUrl) => {
        try {
          copyImageToClipboard(dataUrl)
            .then(() => {
              console.log("Image Copied");
            })
            .catch((e) => {
              console.log("Error: ", e.message);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className={styles.container}>
      <div className={styles.card} ref={ref} id="card">
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
    </div>
  );
};

export default Card;

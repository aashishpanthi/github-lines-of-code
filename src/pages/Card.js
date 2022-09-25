import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CardPiece from "../components/Card";
import styles from "./styles/card.module.css";

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

  const [searchParams] = useSearchParams();
  const query = searchParams.get("user");

  useEffect(() => {
    if (!query) {
      navigate("/");
    }
  }, [query, navigate]);

  return (
    <div className={styles.container}>
      <CardPiece data={data} />
    </div>
  );
};

export default Card;

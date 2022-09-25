import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CardPiece from "../components/Card";
import styles from "./styles/card.module.css";

const data = {
  username: "aashishpanthi",
  photo: "https://avatars.githubusercontent.com/u/60884239?v=4",
  totalLines: 102000,
  publicRepo: 100,
  privateRepo: 10,
  languages: [
    {
      name: "JavaScript",
      lines: 100000,
    },
    {
      name: "Python",
      lines: 2500,
    },
    {
      name: "C#",
      lines: 200,
    },
    {
      name: "HTML",
      lines: 2000,
    },
    {
      name: "Java",
      lines: 20000,
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

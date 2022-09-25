import styles from "./styles/card.module.css";
import DoughNutChart from "./DoughNutChart";

const Card = ({ data }) => {
  const { username, photo, totalLines, publicRepo, privateRepo, languages } =
    data;

  let formatter = Intl.NumberFormat("en", {
    notation: "compact",
  });

  const formattedTotalLines = formatter.format(totalLines);
  const formattedPublicRepo = formatter.format(publicRepo);
  const formattedPrivateRepo = formatter.format(privateRepo);

  return (
    <div className={styles.card}>
      <div className={styles.card__main}>
        <div className={styles.main_chart}>
          <DoughNutChart data={[publicRepo, privateRepo]} />
          <div className={styles.totalLines}>{formattedTotalLines}</div>
        </div>
        <div className={styles.main_stats}>
          <h3 style={{ color: "#cbbaba" }}>
            Total lines of code: <span>{formattedTotalLines}</span>
          </h3>
          <h3 style={{ color: "#fe3533" }}>
            Public Repository: <span>{formattedPublicRepo}</span>
          </h3>
          <h3 style={{ color: "#bc4500" }}>
            Private Repository: <span>{formattedPrivateRepo}</span>
          </h3>
        </div>
      </div>
      <div className={styles.card__body}>
        <h2>Most Used Languages</h2>
        <div className={styles.lineGraph}></div>
        <div className={styles.languages}>
          {languages.map((language) => (
            <p className={styles.language} key={language.name}>
              <span className={styles.bubble}></span>
              <span className={styles.languageName}>{language.name}</span>
              <span className={styles.languageLines}>{language.lines}</span>
            </p>
          ))}
        </div>
      </div>

      <div className={styles.avatar}>
        <img src={photo} alt="profile" />
      </div>

      <p className={styles.username}>@{username}</p>
    </div>
  );
};

export default Card;

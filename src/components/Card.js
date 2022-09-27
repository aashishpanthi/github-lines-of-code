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

  let totalLines_forLineGraph = 0;

  languages.map((language) => {
    totalLines_forLineGraph += language.lines;
  });

  const colors = ["#FFC100", "#1E9ADF", "#96C69F", "#E6EBED", "#593C97"];

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
        <div className={styles.lineGraph}>
          {languages.map((language, i) => (
            <span
              className={styles.languagePart}
              key={language.name}
              style={{
                width: `${(language.lines / totalLines_forLineGraph) * 100}%`,
                backgroundColor: colors[i],
              }}
            ></span>
          ))}
        </div>
        <div className={styles.languages}>
          {languages.map((language, i) => (
            <p className={styles.language} key={language.name}>
              <span
                className={styles.bubble}
                style={{ backgroundColor: colors[i] }}
              ></span>
              <span className={styles.languageName}>{language.name}</span>
              <span className={styles.languageLines}>
                {((language.lines / totalLines_forLineGraph) * 100).toFixed(2)}%
              </span>
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

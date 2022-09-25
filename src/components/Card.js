import styles from "./styles/card.module.css";

const Card = ({ data }) => {
  const { username, photo, totalLines, publicRepo, privateRepo, languages } =
    data;
  return (
    <div className={styles.card}>
      <div className={styles.card__main}>
        <div className={styles.main_chart}></div>
        <div className={styles.main_stats}>
          <h3>
            Total lines of code: <span>{totalLines}</span>
          </h3>
          <h3>
            Public Repository: <span>{publicRepo}</span>
          </h3>
          <h3>
            Private Repository: <span>{privateRepo}</span>
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

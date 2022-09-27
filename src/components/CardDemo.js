import styles from "./styles/card_demo.module.css";

function CardDemo() {
  return (
    <section className={styles.cardSection}>
      <h2>Get a personalized card </h2>
      <img
        src="/static/aashishpanthi-lines-of-code-card.png"
        className={styles.image}
        alt="card"
      />
    </section>
  );
}

export default CardDemo;

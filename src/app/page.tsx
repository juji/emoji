import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Emoji — simple, focused, beautiful</h1>
          <p className={styles.lead}>
            A clean starting point designed to sit naturally on dark
            backgrounds. Minimal, centered, and ready for your content.
          </p>
        </div>
      </main>
    </div>
  );
}

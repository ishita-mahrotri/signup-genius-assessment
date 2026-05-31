import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import adr from "../../docs/ADR.mdx?raw";

import styles from "./DocumentationPage.module.css";

export function DocumentationPage() {
  return (
    <main className={styles.content}>
      <article className={styles.article}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{adr}</ReactMarkdown>
      </article>
    </main>
  );
}

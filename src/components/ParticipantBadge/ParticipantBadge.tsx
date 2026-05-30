import styles from "./ParticipantBadge.module.css";

export function ParticipantBadge({ name }: { name: string }) {
  return <span className={styles.badge}>{name.trim()}</span>;
}

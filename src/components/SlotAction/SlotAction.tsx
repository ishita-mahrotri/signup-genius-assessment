import styles from "./SlotAction.module.css";

interface SlotActionProps {
  label: string;
  isSignedUp: boolean;
  isFull: boolean;
  isLoggedIn: boolean;
  onClick: () => void;
  describedBy?: string;
}

export function SlotAction({
  label,
  isSignedUp,
  isFull,
  isLoggedIn,
  onClick,
  describedBy,
}: SlotActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSignedUp}
      className={[
        styles.button,
        isSignedUp ? styles.cancel : "",
        isFull ? styles.disabled : "",
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={isFull || !isLoggedIn}
      aria-describedby={describedBy}
      aria-label={
        isSignedUp ? `Remove your sign-up for ${label}` : `Sign up for ${label}`
      }
    >
      {isSignedUp ? "Cancel" : isFull ? `${label} is full` : "Sign up"}
    </button>
  );
}

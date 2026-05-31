import styles from "./SlotAction.module.css";

interface SlotActionProps {
  label: string;
  isSignedUp: boolean;
  isFull: boolean;
  currentUser: string;
  onClick: () => void;
  describedBy?: string;
}

export function SlotAction({
  label,
  isSignedUp,
  isFull,
  currentUser,
  onClick,
  describedBy,
}: SlotActionProps) {
  const isLoggedIn = currentUser?.trim() !== "" && currentUser != null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSignedUp}
      className={[
        styles.button,
        isSignedUp ? styles.cancel : "",
        isFull ? styles.disabled : "",
        !isLoggedIn ? styles.notLoggedIn : "",
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={isFull || !isLoggedIn}
      aria-describedby={describedBy}
      aria-label={
        isSignedUp ? `Remove your sign-up for ${label}` : `Sign up for ${label}`
      }
    >
      {isSignedUp
        ? "Cancel"
        : isFull
          ? `${label} is full`
          : !isLoggedIn
            ? "Log in to sign up"
            : "Sign up"}
    </button>
  );
}

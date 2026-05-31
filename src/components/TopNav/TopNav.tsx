import { useTheme } from "../../theme/ThemeContext";
import styles from "./TopNav.module.css";

export type Page = "components" | "demo" | "documentation";

interface TopNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: "components", label: "Components" },
  { id: "demo", label: "Demo" },
  { id: "documentation", label: "Documentation" },
];

export function TopNav({ currentPage, onNavigate }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <span className={styles.brand}>SignupGenius</span>
      <nav className={styles.nav} aria-label="Main navigation">
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`${styles.navItem} ${currentPage === id ? styles.navItemActive : ""}`}
            onClick={() => onNavigate(id)}
            aria-current={currentPage === id ? "page" : undefined}
          >
            {label}
          </button>
        ))}
      </nav>
      <button
        type="button"
        role="switch"
        aria-checked={theme === "dark"}
        className={styles.themeToggle}
        onClick={toggleTheme}
      >
        {theme === "light" ? "Dark mode" : "Light mode"}
      </button>
    </header>
  );
}

import { useState } from "react";
import styles from "./SideNav.module.css";

export interface SideNavItem {
  id: string;
  label: string;
}

interface SideNavProps {
  items: SideNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function SideNav({ items, activeId, onSelect }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeLabel = items.find(({ id }) => id === activeId)?.label ?? "Menu";

  function handleSelect(id: string) {
    onSelect(id);
    setIsOpen(false);
  }

  return (
    <nav className={styles.nav} aria-label="Section navigation">
      {/* Mobile toggle — hidden on desktop via CSS */}
      <button
        type="button"
        className={styles.mobileToggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="side-navigation"
      >
        <span>{activeLabel}</span>
        <span className={styles.chevron} aria-hidden="true">
          {isOpen ? "▴" : "▾"}
        </span>
      </button>

      <ul
        id="side-navigation"
        className={`${styles.list} ${isOpen ? styles.listOpen : ""}`}
      >
        {items.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              className={`${styles.item} ${activeId === id ? styles.itemActive : ""}`}
              onClick={() => handleSelect(id)}
              aria-current={activeId === id ? "true" : undefined}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

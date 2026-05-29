import { dataStructure, slotGroups } from "./assets/dataStructure";
import { useState } from "react";
import { SlotGroup } from "./components/SlotGroup/SlotGroup";
import type { GroupType, SlotGroupData } from "./components/types";
import { useTheme } from "./theme/ThemeContext";
import styles from "./App.module.css";

const CURRENT_USER = "Ishita M.";

const groupDataMap: Record<GroupType, SlotGroupData[]> = {
  Shift: slotGroups.slotShift,
  Category: slotGroups.slotCategory,
  "Custom Label": slotGroups.slotCustomLabel,
};

function App() {
  const [currentGroup, setCurrentGroup] = useState<GroupType>("Shift");
  const { theme, toggleTheme } = useTheme();
  const slotGroupData = groupDataMap[currentGroup];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{dataStructure.title}</h1>
        <button
          type="button"
          role="switch"
          aria-checked={theme === "dark"}
          className={styles.themeToggle}
          onClick={toggleTheme}
        >
          {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        </button>
      </div>
      <div className={styles.toolbar}>
        <div
          className={styles.tabBar}
          role="tablist"
          aria-label="Group activities by"
        >
          {(["Shift", "Category", "Custom Label"] as GroupType[]).map(
            (group) => (
              <button
                key={group}
                type="button"
                role="tab"
                aria-selected={currentGroup === group}
                // identifies the area it controls for switching views. slot-group-panel is id attr of div surrounding SlotGroup
                aria-controls="slot-group-panel"
                className={`${styles.tab} ${currentGroup === group ? styles.tabActive : ""}`}
                onClick={() => setCurrentGroup(group)}
              >
                {group}
              </button>
            ),
          )}
        </div>
      </div>
      {/* the content panel */}
      <div
        id="slot-group-panel"
        role="tabpanel"
        // announces when content changes on tab switch
        aria-live="polite"
      >
        <SlotGroup
          name={currentGroup}
          slotGroupData={slotGroupData}
          slots={dataStructure.slots}
          currentUser={CURRENT_USER}
        />
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import { SlotGroup } from "../../components/SlotGroup/SlotGroup";
import { dataStructure, slotGroups } from "../../assets/dataStructure";
import type { GroupType, SlotGroupData } from "../../components/types";
import styles from "./DemoPage.module.css";

const CURRENT_USER = "Ishita M.";

const groupDataMap: Record<GroupType, SlotGroupData[]> = {
  Shift: slotGroups.slotShift,
  Category: slotGroups.slotCategory,
  "Custom Label": slotGroups.slotCustomLabel,
};

export function DemoPage() {
  const [currentGroup, setCurrentGroup] = useState<GroupType>("Shift");
  const slotGroupData = groupDataMap[currentGroup];

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.title}>{dataStructure.title}</h1>
        <p className={styles.subtitle}>
          A live demo of all components working together.
        </p>
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
                id={`tab-${group.toLowerCase().replace(/\s+/g, "-")}`}
                type="button"
                role="tab"
                aria-selected={currentGroup === group}
                aria-controls="demo-slot-group-panel"
                className={`${styles.tab} ${currentGroup === group ? styles.tabActive : ""}`}
                onClick={() => setCurrentGroup(group)}
              >
                {group}
              </button>
            ),
          )}
        </div>
      </div>
      <div
        id="demo-slot-group-panel"
        role="tabpanel"
        aria-live="polite"
        aria-labelledby={`tab-${currentGroup.toLowerCase().replace(/\s+/g, "-")}`}
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

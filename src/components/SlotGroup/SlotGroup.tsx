import { useMemo } from "react";
import { Slot } from "../Slot/Slot";
import type { GroupType, SlotData, SlotGroupData } from "../types";
import styles from "./SlotGroup.module.css";

interface SlotGroupProps {
  name: GroupType;
  slotGroupData: SlotGroupData[];
  slots: SlotData[];
  currentUser: string;
}

export function SlotGroup({
  name,
  slotGroupData,
  slots,
  currentUser,
}: SlotGroupProps) {
  const filterCriteria: keyof SlotData =
    name === "Shift"
      ? "shiftId"
      : name === "Category"
        ? "categoryId"
        : "customLabelId";

  const slotsByGroup = useMemo(
    () =>
      slotGroupData.map(({ id: groupID, name: groupName }) => ({
        groupID,
        groupName,
        slots: slots.filter((slot) => slot[filterCriteria] === groupID),
      })),
    [slotGroupData, slots, filterCriteria],
  );

  return (
    <div className={styles.container}>
      {slotsByGroup.map(({ groupID, groupName, slots: slotsList }) => (
        <section
          key={groupID}
          className={styles.group}
          aria-labelledby={`group-${groupID}`}
        >
          <h2 id={`group-${groupID}`} className={styles.groupHeading}>
            {groupName}
          </h2>
          <div className={styles.slots}>
            {slotsList.length ? (
              slotsList.map((slot) => (
                <Slot key={slot.id} slot={slot} currentUser={currentUser} />
              ))
            ) : (
              <p>No slots available for this group</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

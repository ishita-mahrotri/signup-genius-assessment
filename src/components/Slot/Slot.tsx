import type { SlotData } from "../types";
import styles from "./Slot.module.css";
import { slotGroups } from "../../assets/dataStructure";
import { useState } from "react";
import { ParticipantBadge } from "../ParticipantBadge/ParticipantBadge";
import { SlotAction } from "../SlotAction/SlotAction";

interface SlotProps {
  slot: SlotData;
  currentUser: string;
}

const customLabelMap = Object.fromEntries(
  slotGroups.slotCustomLabel.map(({ id, name }) => [id, name]),
);
const categoryMap = Object.fromEntries(
  slotGroups.slotCategory.map(({ id, name }) => [id, name]),
);
const shiftMap = Object.fromEntries(
  slotGroups.slotShift.map(({ id, name }) => [id, name]),
);

export function Slot({ slot, currentUser }: SlotProps) {
  const { capacity, participants, customLabelId, categoryId, shiftId } = slot;

  // keeping local state here, since participant state is not lifted.
  // the trade-off is that prop updates won't sync - for this demo, it's fine as it's not used anywhere else
  // for production, state would live higher up OR managed globally based on requirements and where all participants data would be needed after updates
  const [slotParticipants, setSlotParticipants] = useState(participants);

  const label = customLabelMap[customLabelId];
  const category = categoryMap[categoryId];
  const shift = shiftMap[shiftId];

  const isSignedUp = slotParticipants.includes(currentUser);
  const isLoggedIn = currentUser.trim() !== "";
  const spotsLeft = capacity - slotParticipants.length;

  // If there are no spots left and the current user is not one of the signed up participants
  const isFull = spotsLeft <= 0 && !isSignedUp;

  const capacityText = isFull ? "Full" : `${spotsLeft} spot(s) left`;

  function handleAction() {
    if (isSignedUp) {
      // removing current user from the participants array
      setSlotParticipants((prev) =>
        prev.filter((participant) => participant !== currentUser),
      );
    } else if (!isFull) {
      setSlotParticipants((prev) => [...prev, currentUser]);
    }
  }

  return (
    // semantically correct for a self-contained card and aria-label is valid on it.
    // aria-label is mostly skipped on plain <div> since they aren't technically interactive elements.
    <article
      aria-label={`${label} - ${capacityText}`}
      className={[
        styles.slot,
        isSignedUp ? styles.slotSigned : "",
        isFull ? styles.slotFull : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {/* aria-live=polite: will not interrupt the flow of the screen reader. */}
        {/* aria-atomic="true": reads the full text, not just the changed number. */}
        <span className={styles.capacity} aria-live="polite" aria-atomic="true">
          {capacityText}
        </span>
      </div>
      <div className={styles.meta}>
        {shift && (
          <span className={styles.metaTag} aria-label={`Shift: ${shift}`}>
            {shift}
          </span>
        )}
        {category && (
          <span className={styles.metaTag} aria-label={`Category: ${category}`}>
            {category}
          </span>
        )}
      </div>
      <div className={styles.footer}>
        {slotParticipants.length ? (
          <div
            className={styles.participantList}
            role="group"
            aria-label={`Participants signed up for ${label}`}
          >
            {slotParticipants.map((name) => (
              <ParticipantBadge key={name.trim()} name={name} />
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>No signups yet - be the first!</p>
        )}
        <SlotAction
          label={label}
          isSignedUp={isSignedUp}
          isFull={isFull}
          currentUser={currentUser}
          onClick={handleAction}
          describedBy={!isLoggedIn ? "login-help" : undefined}
        />
      </div>
      {!isLoggedIn ? (
        <p id="login-help" className={styles.helpText}>
          Please log in to signup for an activity
        </p>
      ) : null}
    </article>
  );
}

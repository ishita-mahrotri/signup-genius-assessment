import { useState } from "react";
import { SideNav } from "../../components/SideNav/SideNav";
import { ParticipantBadge } from "../../components/ParticipantBadge/ParticipantBadge";
import { SlotAction } from "../../components/SlotAction/SlotAction";
import { Slot } from "../../components/Slot/Slot";
import { SlotGroup } from "../../components/SlotGroup/SlotGroup";
import { dataStructure, slotGroups } from "../../assets/dataStructure";
import styles from "./ComponentsPage.module.css";

type ComponentId = "ParticipantBadge" | "SlotAction" | "Slot" | "SlotGroup";

const SIDE_NAV_ITEMS = [
  { id: "ParticipantBadge" as ComponentId, label: "ParticipantBadge" },
  { id: "SlotAction" as ComponentId, label: "SlotAction" },
  { id: "Slot" as ComponentId, label: "Slot" },
  { id: "SlotGroup" as ComponentId, label: "SlotGroup" },
];

// ─── Shared helpers ───────────────────────────────────────────────────────────

interface PropRow {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

function PropsTable({ props }: { props: PropRow[] }) {
  return (
    <table className={styles.propsTable}>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((row) => (
          <tr key={row.name}>
            <td>
              <code className={styles.inlineCode}>{row.name}</code>
            </td>
            <td>
              <code className={styles.inlineCode}>{row.type}</code>
            </td>
            <td>{row.required ? "Yes" : "No"}</td>
            <td>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className={styles.codeBlock}>
      <code>{children}</code>
    </pre>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function ParticipantBadgeDoc() {
  return (
    <div className={styles.doc}>
      <h1 className={styles.docTitle}>ParticipantBadge</h1>
      <p className={styles.docDescription}>
        Displays a participant's name as a pill badge. Whitespace is trimmed
        before rendering. Renders as a{" "}
        <code className={styles.inlineCode}>span</code> so it can be composed
        inside any container.
      </p>

      <Section title="Props">
        <PropsTable
          props={[
            {
              name: "name",
              type: "string",
              required: true,
              description:
                "The participant's display name. Leading/trailing whitespace is trimmed.",
            },
          ]}
        />
      </Section>

      <Section title="Preview">
        <div className={styles.preview}>
          <ParticipantBadge name="Alice Johnson" />
          <ParticipantBadge name="Bob Smith" />
          <ParticipantBadge name="Carol White" />
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock>{`<ParticipantBadge name="Alice Johnson" />`}</CodeBlock>
      </Section>
    </div>
  );
}

function SlotActionDoc() {
  return (
    <div className={styles.doc}>
      <h1 className={styles.docTitle}>SlotAction</h1>
      <p className={styles.docDescription}>
        Sign-up/cancel button for a slot. Accepts any function via{" "}
        <code className={styles.inlineCode}>onClick</code>, making it reusable
        outside of the slot context.
      </p>

      <Section title="Props">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              required: true,
              description: "Slot label used in aria-label.",
            },
            {
              name: "isSignedUp",
              type: "boolean",
              required: true,
              description:
                "Whether the current user is already signed up. Shows Cancel state when true.",
            },
            {
              name: "isFull",
              type: "boolean",
              required: true,
              description:
                "Whether the slot is at capacity. Disables the button when true.",
            },
            {
              name: "currentUser",
              type: "string",
              required: true,
              description:
                "Current user's display name. An empty string/null/undefined value disables the button.",
            },
            {
              name: "onClick",
              type: "() => void",
              required: true,
              description: "Function to execute on click.",
            },
            {
              name: "describedBy",
              type: "string",
              required: false,
              description:
                "ID of an element describing the button (aria-describedby).",
            },
          ]}
        />
      </Section>

      <Section title="States">
        <div className={styles.states}>
          <div className={styles.stateItem}>
            <p className={styles.stateLabel}>Sign up</p>
            <SlotAction
              label="Morning"
              isSignedUp={false}
              isFull={false}
              currentUser="Demo User"
              onClick={() => {}}
            />
          </div>
          <div className={styles.stateItem}>
            <p className={styles.stateLabel}>Signed up (cancel)</p>
            <SlotAction
              label="Morning"
              isSignedUp={true}
              isFull={false}
              currentUser="Demo User"
              onClick={() => {}}
            />
          </div>
          <div className={styles.stateItem}>
            <p className={styles.stateLabel}>Full</p>
            <SlotAction
              label="Morning"
              isSignedUp={false}
              isFull={true}
              currentUser="Demo User"
              onClick={() => {}}
            />
          </div>
          <div className={styles.stateItem}>
            <p className={styles.stateLabel}>Not logged in</p>
            <SlotAction
              label="Morning"
              isSignedUp={false}
              isFull={false}
              currentUser=""
              onClick={() => {}}
            />
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock>{`<SlotAction
  label="Morning Setup"
  isSignedUp={false}
  isFull={false}
  currentUser="Alice"
  onClick={() => handleSignUp()}
/>`}</CodeBlock>
      </Section>
    </div>
  );
}

function SlotDoc() {
  const sampleSlot = dataStructure.slots[0];

  return (
    <div className={styles.doc}>
      <h1 className={styles.docTitle}>Slot</h1>
      <p className={styles.docDescription}>
        Self-contained sign-up card for a single activity slot. Manages its own
        participant state locally. Renders as an{" "}
        <code className={styles.inlineCode}>article</code> element for correct
        semantics. This is commonly used for product cards on e-commerce grid
        layouts or similar use cases.
      </p>

      <Section title="Props">
        <PropsTable
          props={[
            {
              name: "slot",
              type: "SlotData",
              required: true,
              description:
                "Slot data object with id, capacity, participants, shiftId, categoryId, and customLabelId.",
            },
            {
              name: "currentUser",
              type: "string",
              required: true,
              description:
                "Display name of the current user. An empty string disables sign-up.",
            },
          ]}
        />
      </Section>

      <Section title="Preview">
        <div className={styles.previewConstrained}>
          <Slot slot={sampleSlot} currentUser="Demo User" />
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock>{`<Slot
  slot={{
    id: "slot-1",
    capacity: 3,
    participants: ["Alice"],
    shiftId: "morning",
    categoryId: "food",
    customLabelId: "setup",
  }}
  currentUser="Bob"
/>`}</CodeBlock>
      </Section>
    </div>
  );
}

function SlotGroupDoc() {
  return (
    <div className={styles.doc}>
      <h1 className={styles.docTitle}>SlotGroup</h1>
      <p className={styles.docDescription}>
        Partitions slots by a given grouping option, rendering a labeled{" "}
        <code className={styles.inlineCode}>section</code> per group. Uses{" "}
        <code className={styles.inlineCode}>useMemo</code> to avoid re-filtering
        on unrelated renders.
      </p>

      <Section title="Props">
        <PropsTable
          props={[
            {
              name: "name",
              type: '"Shift" | "Category" | "Custom Label"',
              required: true,
              description: "Name of the active group.",
            },
            {
              name: "slotGroupData",
              type: "SlotGroupData[]",
              required: true,
              description:
                "Array of { id, name } group metadata for the selected group.",
            },
            {
              name: "slots",
              type: "SlotData[]",
              required: true,
              description:
                "Full slots array — filtered internally by group ID.",
            },
            {
              name: "currentUser",
              type: "string",
              required: true,
              description: "Passed through to each Slot.",
            },
          ]}
        />
      </Section>

      <Section title="Preview">
        <SlotGroup
          name="Shift"
          slotGroupData={slotGroups.slotShift}
          slots={dataStructure.slots}
          currentUser="Demo User"
        />
      </Section>

      <Section title="Usage">
        <CodeBlock>{`<SlotGroup
  name="Shift"
  slotGroupData={slotGroups.slotShift}
  slots={dataStructure.slots}
  currentUser="Alice"
/>`}</CodeBlock>
      </Section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const COMPONENT_MAP: Record<ComponentId, React.ComponentType> = {
  ParticipantBadge: ParticipantBadgeDoc,
  SlotAction: SlotActionDoc,
  Slot: SlotDoc,
  SlotGroup: SlotGroupDoc,
};

export function ComponentsPage() {
  const [activeComponent, setActiveComponent] =
    useState<ComponentId>("ParticipantBadge");

  const ActiveDoc = COMPONENT_MAP[activeComponent];

  return (
    <div className={styles.page}>
      <SideNav
        items={SIDE_NAV_ITEMS}
        activeId={activeComponent}
        onSelect={(id) => setActiveComponent(id as ComponentId)}
      />
      <main className={styles.content}>
        <ActiveDoc />
      </main>
    </div>
  );
}

export const slotGroupIDs = {
  Cleanup: "cleanup",
  Beautification: "beautification",
  TrailClearing: "trail-clearing",
  TrashPickupEast: "trash-pickup-east",
  TrashPickupWest: "trash-pickup-west",
  RecyclingSorting: "recycling-sorting",
  PaintBenches: "paint-benches",
  Morning: "morning",
  Afternoon: "afternoon",
} as const;

export const slotGroups = {
  slotCategory: [
    { id: slotGroupIDs.Cleanup, name: "Community Cleanup" },
    { id: slotGroupIDs.Beautification, name: "Urban Beautification" },
  ],
  slotCustomLabel: [
    {
      id: slotGroupIDs.TrailClearing,
      name: "Trail Clearing",
    },
    {
      id: slotGroupIDs.TrashPickupEast,
      name: "Trash Pickup East",
    },
    {
      id: slotGroupIDs.TrashPickupWest,
      name: "Trash Pickup West",
    },
    {
      id: slotGroupIDs.RecyclingSorting,
      name: "Recycling Sorting",
    },
    {
      id: slotGroupIDs.PaintBenches,
      name: "Paint Benches",
    },
  ],
  slotShift: [
    { id: slotGroupIDs.Morning, name: "Morning Shift - 8:00 AM to 12:00 PM" },
    {
      id: slotGroupIDs.Afternoon,
      name: "Afternoon Shift - 1:00 PM to 5:00 PM",
    },
  ],
};

export const dataStructure = {
  title: "Spring Community Cleanup",
  description: "Help us clean up Riverside Park! Sign up for a shift below.",
  slotGroups,
  slots: [
    {
      id: "slot-1",
      capacity: 3,
      participants: ["Alice M.", "BobK."],
      customLabelId: slotGroupIDs.TrailClearing,
      categoryId: slotGroupIDs.Cleanup,
      shiftId: slotGroupIDs.Morning,
    },
    {
      id: "slot-2",
      capacity: 6,
      participants: ["Carol R."],
      customLabelId: slotGroupIDs.TrashPickupEast,
      categoryId: slotGroupIDs.Cleanup,
      shiftId: slotGroupIDs.Morning,
    },
    {
      id: "slot-3",
      capacity: 3,
      participants: [],
      customLabelId: slotGroupIDs.RecyclingSorting,
      categoryId: slotGroupIDs.Cleanup,
      shiftId: slotGroupIDs.Morning,
    },
    {
      id: "slot-4",
      capacity: 4,
      participants: [],
      customLabelId: slotGroupIDs.TrailClearing,
      categoryId: slotGroupIDs.Cleanup,
      shiftId: slotGroupIDs.Afternoon,
    },
    {
      id: "slot-5",
      capacity: 6,
      participants: ["Dave L.", "Eve S.", "Frank T."],
      customLabelId: slotGroupIDs.TrashPickupWest,
      categoryId: slotGroupIDs.Cleanup,
      shiftId: slotGroupIDs.Afternoon,
    },
    {
      id: "slot-6",
      capacity: 2,
      participants: ["Grace H.", "Hank W."],
      customLabelId: slotGroupIDs.PaintBenches,
      categoryId: slotGroupIDs.Beautification,
      shiftId: slotGroupIDs.Afternoon,
    },
  ],
};

// Derive the type from the values if you need it
// export type SlotCustomGroup =
//   (typeof SlotCustomGroup)[keyof typeof SlotCustomGroup];
// export type SlotCategory = typeof SlotCategory[keyof typeof SlotCategory];
// export type SlotShift = typeof SlotShift[keyof typeof SlotShift];

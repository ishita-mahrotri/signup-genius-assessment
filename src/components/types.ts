export type SlotGroupData = {
  id: string;
  name: string;
};

export type SlotData = {
  id: string;
  capacity: number;
  participants: string[];
  customLabelId: string;
  categoryId: string;
  shiftId: string;
};

export type GroupType = "Shift" | "Category" | "Custom Label";

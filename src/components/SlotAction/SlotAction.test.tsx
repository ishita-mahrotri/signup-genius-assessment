import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SlotAction } from "./SlotAction";

const defaultProps = {
  label: "Morning Setup",
  isSignedUp: false,
  isFull: false,
  currentUser: "Alice",
  onClick: vi.fn(),
};

describe("SlotAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("is enabled when spots are available and user is logged in", () => {
    render(<SlotAction {...defaultProps} />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("is disabled when the slot is full", () => {
    render(<SlotAction {...defaultProps} isFull={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when currentUser is empty", () => {
    render(<SlotAction {...defaultProps} currentUser="" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when currentUser is only whitespace", () => {
    render(<SlotAction {...defaultProps} currentUser="   " />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked in the default state", async () => {
    const user = userEvent.setup();
    render(<SlotAction {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});

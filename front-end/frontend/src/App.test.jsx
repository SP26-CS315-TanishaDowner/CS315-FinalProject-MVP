import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Mock fetch globally
global.fetch = vi.fn();

describe("App - Ticket Management", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should add a new ticket when form is submitted", async () => {
    const mockTickets = [];
    
    // Mock initial fetch for getting tickets
    fetch.mockResolvedValueOnce({
      json: async () => mockTickets
    });

    // Mock fetch for creating a new ticket
    fetch.mockResolvedValueOnce({
      json: async () => ({ id: 1, title: "New Test Ticket" })
    });

    render(<App />);

    // Wait for initial load
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:5002/api/tickets");
    });

    // Find input and button
    const input = screen.getByLabelText("New ticket title");
    const button = screen.getByRole("button", { name: /Add Ticket/i });

    // Type in the input and click add
    fireEvent.change(input, { target: { value: "New Test Ticket" } });
    fireEvent.click(button);

    // Wait for the new ticket to appear
    await waitFor(() => {
      expect(screen.getByText("New Test Ticket")).toBeInTheDocument();
    });

    // Verify POST was called with correct data
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5002/api/tickets",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Test Ticket" })
      })
    );
  });

  it("should edit a ticket when Edit button is clicked", async () => {
    const mockTickets = [{ id: 1, title: "Original Ticket" }];

    // Mock initial fetch
    fetch.mockResolvedValueOnce({
      json: async () => mockTickets
    });

    // Mock fetch for updating ticket
    fetch.mockResolvedValueOnce({
      json: async () => ({ id: 1, title: "Updated Ticket" })
    });

    render(<App />);

    // Wait for tickets to load
    await waitFor(() => {
      expect(screen.getByText("Original Ticket")).toBeInTheDocument();
    });

    // Find and click Edit button
    const editButton = screen.getByRole("button", { name: /Edit/i });
    fireEvent.click(editButton);

    // Find the edit input and change the value
    const editInput = screen.getByDisplayValue("Original Ticket");
    fireEvent.change(editInput, { target: { value: "Updated Ticket" } });

    // Find and click Save button
    const saveButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveButton);

    // Wait for the updated ticket to appear
    await waitFor(() => {
      expect(screen.getByText("Updated Ticket")).toBeInTheDocument();
    });

    // Verify PUT was called with correct data
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5002/api/tickets/1",
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Updated Ticket" })
      })
    );
  });

  it("should delete a ticket when Delete button is clicked", async () => {
    const mockTickets = [{ id: 1, title: "Ticket to Delete" }];

    // Mock initial fetch
    fetch.mockResolvedValueOnce({
      json: async () => mockTickets
    });

    // Mock fetch for deleting ticket (returns 204)
    fetch.mockResolvedValueOnce({ status: 204 });

    render(<App />);

    // Wait for ticket to load
    await waitFor(() => {
      expect(screen.getByText("Ticket to Delete")).toBeInTheDocument();
    });

    // Find and click Delete button
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);

    // Wait for the ticket to be removed
    await waitFor(() => {
      expect(screen.queryByText("Ticket to Delete")).not.toBeInTheDocument();
    });

    // Verify DELETE was called with correct URL
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5002/api/tickets/1",
      expect.objectContaining({
        method: "DELETE"
      })
    );
  });
});

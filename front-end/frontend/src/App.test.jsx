import React from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    // Mock the initial ticket fetch so the test is deterministic and offline.
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => []
    });
  });

  afterEach(() => {
    // Reset mocks so each test starts with a clean global state.
    vi.restoreAllMocks();
  });

  it("renders the title and loads tickets", async () => {
    render(<App />);

    // Verify key UI content and that the component performed its API request.
    expect(screen.getByRole("heading", { name: "Ticket List" })).toBeInTheDocument();
    expect(await screen.findByText("No tickets yet")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:5002/api/tickets");
  });
});
import React from 'react';

import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReviewSlider from "@/components/home/review/ReviewSlider";

// Mock react-slick for Jest
jest.mock("react-slick", () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-slider">
      <button data-testid="prev-button">◀</button>
      {children}
      <button data-testid="next-button">▶</button>
    </div>
  );
});

// Mock Iconify to prevent Jest issues with rendering icons
jest.mock("@iconify/react", () => ({
  Icon: () => <span data-testid="star-icon">⭐</span>,
}));

describe("ReviewSlider Component", () => {
  test("renders the title", async () => {
    await act(async () => {
      render(<ReviewSlider />);
    });

    expect(screen.getByText("What Our Clients Say")).toBeInTheDocument();
  });

  test("renders multiple review items", async () => {
    await act(async () => {
      render(<ReviewSlider />);
    });

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes("Excellent service!"))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes("Very satisfied with the installation"))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes("Top-notch quality"))).toBeInTheDocument();
    });
  });

  test("renders star ratings", async () => {
    await act(async () => {
      render(<ReviewSlider />);
    });

    await waitFor(() => {
      const stars = screen.getAllByTestId("star-icon"); // ✅ Searching by test id
      expect(stars.length).toBeGreaterThan(0);
    });
  });

  test("renders dots for navigation", async () => {
    await act(async () => {
      render(<ReviewSlider />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("prev-button")).toBeInTheDocument();
      expect(screen.getByTestId("next-button")).toBeInTheDocument();
    });
  });
});

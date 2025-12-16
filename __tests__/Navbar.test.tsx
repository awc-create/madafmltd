import React from 'react';

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "@/components/navbar/Navbar";

describe("Navbar Component", () => {
  test("renders the Navbar correctly", () => {
    render(<Navbar />);

    // Check if the logo is rendered
    const logoElement = screen.getByAltText("Madaaircon Logo");
    expect(logoElement).toBeInTheDocument();

    // Check if navigation links exist
    expect(screen.getByRole("link", { name: /services/i })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");

    // Check if "Book Now" button exists
    const bookNowButton = screen.getByRole("link", { name: /book now/i });
    expect(bookNowButton).toBeInTheDocument();
    expect(bookNowButton).toHaveAttribute("href", "/book");
  });

  test("renders the correct class names", () => {
    render(<Navbar />);
    const navbarElement = screen.getByRole("navigation");
    expect(navbarElement).toHaveClass("navbar");
  });
});

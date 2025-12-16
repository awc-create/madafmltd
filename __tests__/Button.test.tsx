import React from 'react';

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/button/Button";

describe("Button Component", () => {
  test("renders the button with correct text", () => {
    render(<Button text="Book Now" href="/book" variant="primary" />);

    const buttonElement = screen.getByRole("link", { name: /book now/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("applies the correct class names", () => {
    render(<Button text="Click Me" href="/test" variant="primary" className="custom-class" />);

    const buttonElement = screen.getByRole("link", { name: /click me/i });
    expect(buttonElement).toHaveClass("button primary custom-class");
  });

  test("has the correct href attribute", () => {
    render(<Button text="Go to Contact" href="/contact" variant="primary" />);

    const buttonElement = screen.getByRole("link", { name: /go to contact/i });
    expect(buttonElement).toHaveAttribute("href", "/contact");
  });

  test("renders correctly inside Next.js Link", () => {
    render(<Button text="Go to About" href="/about" variant="primary" />);

    const buttonElement = screen.getByRole("link", { name: /go to about/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("href", "/about");
  });
});

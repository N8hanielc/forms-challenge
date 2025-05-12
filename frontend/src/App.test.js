
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(<App />);
  const title = screen.getByText(/form validation/i);
  expect(title).toBeInTheDocument();
});

test("shows error on empty submit", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/add person/i));
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
});

test("shows error for invalid email", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  fireEvent.change(emailInput, { target: { value: "bademail" } });
  fireEvent.click(screen.getByText(/add person/i));
  expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
});

test("shows error for short phone number", () => {
  render(<App />);
  const phoneInput = screen.getByPlaceholderText(/phone number/i);
  fireEvent.change(phoneInput, { target: { value: "123" } });
  fireEvent.click(screen.getByText(/add person/i));
  expect(screen.getByText(/phone number must be at least 10 digits/i)).toBeInTheDocument();
});

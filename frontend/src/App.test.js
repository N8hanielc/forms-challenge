
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders form and adds a person with valid input", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/Name/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const phoneInput = screen.getByLabelText(/Phone/i);
  const button = screen.getByText(/Add/i);

  fireEvent.change(nameInput, { target: { value: "Nathaniel" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(phoneInput, { target: { value: "1234567890" } });
  fireEvent.click(button);

  expect(screen.getByText(/Nathaniel/)).toBeInTheDocument();
  expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
  expect(screen.getByText(/1234567890/)).toBeInTheDocument();
});

test("shows error for invalid email", () => {
  render(<App />);
  const emailInput = screen.getByLabelText(/Email/i);
  fireEvent.change(emailInput, { target: { value: "invalidemail" } });
  expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
});

test("shows error for invalid phone", () => {
  render(<App />);
  const phoneInput = screen.getByLabelText(/Phone/i);
  fireEvent.change(phoneInput, { target: { value: "123" } });
  expect(screen.getByText(/Phone must be 10 digits/)).toBeInTheDocument();
});

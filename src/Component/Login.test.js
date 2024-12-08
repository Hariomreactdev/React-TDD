import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('renders the login form', () => {
  render(<Login />);
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('calls onLogin with email and password when submitted', () => {
  const onLoginMock = jest.fn();
  render(<Login onLogin={onLoginMock} />);

  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(submitButton);

  // Expect onLogin to be called with email and password
  expect(onLoginMock).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password123"
  });
});

test('does not call onLogin when fields are empty', () => {
  const onLoginMock = jest.fn();
  render(<Login onLogin={onLoginMock} />);

  const submitButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(submitButton);

  // Ensure onLogin is not called when inputs are empty
  expect(onLoginMock).not.toHaveBeenCalled();
});

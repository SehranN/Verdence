import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './signUp';
import * as ReactRouterDom from 'react-router-dom';
import '@testing-library/jest-dom'


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));


const mockNavigate = jest.fn();

beforeEach(() => {
  ReactRouterDom.useNavigate.mockReturnValue(mockNavigate);
});

describe('SignupPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders all input fields and the Sign Up button', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('prevents submission if required fields are empty', () => {
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(window.alert).toHaveBeenCalledWith('Please fill all required fields.');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to the next page with name in state when form is filled correctly', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: 'Alice Test' },
    });

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'alice@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: 'strongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/signup-questions', {
      state: { name: 'Alice Test' },
    });
  });

  it('shows validation if email is invalid (optional)', () => {
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(window.alert).toHaveBeenCalledWith('Please fill all required fields.');
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

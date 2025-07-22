// SignUpQuestions.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpQuestions from './signUpQuestions';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: { name: 'TestUser' },
    }),
  };
});

describe('SignUpQuestions Form Submission', () => {
  it('submits form with valid data and navigates to dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path="/signup" element={<SignUpQuestions />} />
        </Routes>
      </MemoryRouter>
    );

    
    fireEvent.change(screen.getByPlaceholderText('Enter age'), {
        target: { value: '28' },
      });
      
      fireEvent.change(screen.getByPlaceholderText('Enter sector'), {
        target: { value: 'Engineer' },
      });
      
      fireEvent.change(screen.getByPlaceholderText('Enter country'), {
        target: { value: 'USA' },
      });

    
    fireEvent.click(screen.getByText(/Build long term wealth/i)); // goal
    fireEvent.click(screen.getByText(/Stocks/i)); // security
    fireEvent.click(screen.getByText(/Retirement/i)); // objective
    fireEvent.click(screen.getByText(/Feel more confident about my investment strategy/i)); // use
    fireEvent.click(screen.getByText(/Automated actions/i)); // preference
    fireEvent.click(screen.getByText(/Sustainable investments/i)); // want

    
    fireEvent.change(screen.getByTestId('networth-slider'), {
      target: { value: '50000' },
    });
    fireEvent.change(screen.getByTestId('investment-slider'), {
      target: { value: '10000' },
    });
    fireEvent.change(screen.getByTestId('monthly-slider'), {
      target: { value: '5000' },
    });

    const submitButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(submitButton);

    
  });
});

describe('SignUpQuestions Component', () => {
  it('should render personal information form section', () => {
    render(
      <Router>
        <SignUpQuestions />
      </Router>
    );

    const heading = screen.getByText(/Personal Information/i);
    expect(heading).toBeInTheDocument();
  });

  it('should update form fields when user types input', () => {
    render(
      <Router>
        <SignUpQuestions />
      </Router>
    );

    const ageInput = screen.getByPlaceholderText('Enter age');
    const occupationInput = screen.getByPlaceholderText('Enter sector');
    const countryInput = screen.getByPlaceholderText('Enter country');

    fireEvent.change(ageInput, { target: { value: '30' } });
    fireEvent.change(occupationInput, { target: { value: 'Engineer' } });
    fireEvent.change(countryInput, { target: { value: 'UK' } });

    expect(ageInput.value).toBe('30');
    expect(occupationInput.value).toBe('Engineer');
    expect(countryInput.value).toBe('UK');
  });

  it('should toggle goal selection on click', () => {
    render(
      <Router>
        <SignUpQuestions />
      </Router>
    );

    const goalCard = screen.getByText(/Build long term wealth/i);
    expect(goalCard).toBeInTheDocument();

    fireEvent.click(goalCard);
    expect(goalCard.closest('label')).toHaveClass('bg-mint');

    fireEvent.click(goalCard);
    expect(goalCard.closest('label')).not.toHaveClass('bg-mint');
  });

  it('should show validation alert if required fields are missing on submit', () => {
    // MOCK window.alert
    window.alert = jest.fn();

    render(
      <Router>
        <SignUpQuestions />
      </Router>
    );

    const submitBtn = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(submitBtn);

    expect(window.alert).toHaveBeenCalledWith('Please fill all required fields.');
  });

  it('should render financial snapshot and sliders', () => {
    render(
      <Router>
        <SignUpQuestions />
      </Router>
    );

    expect(screen.getByText(/Financial Snapshot/i)).toBeInTheDocument();
    expect(screen.getByText(/Net-worth estimation:/i)).toBeInTheDocument();
    expect(screen.getByText(/How much are you looking to invest:/i)).toBeInTheDocument();
    expect(screen.getByText(/How much can you contribute monthly:/i)).toBeInTheDocument();
  });
});

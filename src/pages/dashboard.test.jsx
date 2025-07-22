import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './dashboard';
import axios from 'axios';
import React from 'react';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { profile: { name: 'Test User', age: 30 } },
  }),
}));

describe('Dashboard Data Fetching', () => {
  it('fetches data and sets it correctly', async () => {
    axios.get.mockImplementation((url) => {
      const mockData = { data: `mocked ${url}` };
      return Promise.resolve(mockData);
    });

    render(<Dashboard />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(8);
    });

    // Check some rendered output based on the mocked data
    // (Replace this with actual text that renders from data)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/portfolioHeader');
    
  });
});

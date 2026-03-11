import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock fetch to prevent the ECONNREFUSED error
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Welcome to Home Page" }),
  })
);

describe('App Component', () => {
  it('renders the Header and the Home page content', async () => {
    render(<App />);
    
    // 1. Target the Header specifically using its role "banner"
    const header = screen.getByRole('banner');
    
    // 2. Use 'within' to only look for "My Office" inside that header
    const headerLogo = within(header).getByText(/My Office/i);
    expect(headerLogo).toBeInTheDocument();

    // 3. Target the Home page content
    // This looks for your <h1> or similar heading in the Home component
    const homeTitle = screen.getByText(/Home Page/i);
    expect(homeTitle).toBeInTheDocument();
  });
});
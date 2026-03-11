import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders the Header and the Home page content', async () => {
    render(<App />);
    
    // Check if "My Office" (from your Header) is visible
    const headerElement = screen.getByText(/My Office/i);
    expect(headerElement).toBeInTheDocument();

    // Check if the Home page content is visible
    // (Assuming your Home.jsx has the text "Welcome to Home Page")
    const homeElement = screen.getByText(/Welcome to Home Page/i);
    expect(homeElement).toBeInTheDocument();
  });
});
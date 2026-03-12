import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// 1. Mock Browser APIs that don't exist in the test terminal
beforeEach(() => {
  // Mock IntersectionObserver (Standard function to allow 'new' constructor)
  vi.stubGlobal('IntersectionObserver', vi.fn(function() {
    return {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
  }));

  // Mock fetch to prevent network errors
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ status: "success" }),
    })
  );
});

describe('App Component', () => {
  it('renders the Header and the Home page content', async () => {
    render(<App />);
    
    // Check for the Header Logo
    const header = screen.getByRole('banner');
    const headerLogo = within(header).getByText(/My Office/i);
    expect(headerLogo).toBeInTheDocument();

    // 2. Check for the actual Hero Title in Home.jsx
    // We use findByText (async) because your stats might cause a re-render
    const homeTitle = await screen.findByText(/Your data/i);
    expect(homeTitle).toBeInTheDocument();

    const subTitle = screen.getByText(/brilliantly/i);
    expect(subTitle).toBeInTheDocument();
  });

  it('navigates to the Job Application page', async () => {
    render(<App />);
    
    // 3. Find and click the 'Apply for Job' link in the header
    const applyLink = screen.getByRole('link', { name: /Apply for Job/i });
    applyLink.click();

    // Verify the Apply page content appears
    const applyHeading = await screen.findByText(/Join Our Team/i);
    expect(applyHeading).toBeInTheDocument();
  });
});
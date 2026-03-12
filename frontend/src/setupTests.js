import "@testing-library/jest-dom";
import { vi } from "vitest";

// Use a regular function so it can be called with 'new'
const IntersectionObserverMock = vi.fn(function () {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

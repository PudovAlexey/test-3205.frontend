import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Ant Design's responsive Grid relies on window.matchMedia, which jsdom does
// not implement. Provide a no-op stub so components render under vitest.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

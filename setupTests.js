import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock console.error to keep test logs clean
vi.spyOn(console, "error").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});

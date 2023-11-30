import { describe, it, expect, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Routes, Route, Outlet } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"

import FeatureNav from './FeatureNav.jsx';
import '@testing-library/jest-dom';

describe('FeatureNav', () => {

  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <FeatureNav />
      </BrowserRouter>
    )
  });
  
  it("renders header", () => {
    render(
      <BrowserRouter>
        <FeatureNav />
      </BrowserRouter>
    )
    expect(screen.getByRole("menu")).toBeInTheDocument()
  });

})
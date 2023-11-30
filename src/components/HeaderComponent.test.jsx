import { describe, it, expect, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Routes, Route, Outlet } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"

import HeaderComponent from './HeaderComponent.jsx';
import '@testing-library/jest-dom';

describe('HeaderComponent', () => {

  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <HeaderComponent />
      </BrowserRouter>
    )
  });
  
  it("renders header", () => {
    render(
      <BrowserRouter>
        <HeaderComponent />
      </BrowserRouter>
    )
    expect(screen.getByText("Un Moquer Hotelier")).toBeInTheDocument()
  });

})
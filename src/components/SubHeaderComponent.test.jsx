import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubHeaderComponent from './SubHeaderComponent.jsx';
import '@testing-library/jest-dom';

describe('SubHeaderComponent', () => {

  it('should set heading', () => {
    render(<SubHeaderComponent feature="tests" recordCount="11" formStatus="empty">Test</SubHeaderComponent>);
    const heading = screen.getByRole('heading')
    expect(heading.innerHTML).toContain("tests")
  });

  it('should set record count', () => {
    render(<SubHeaderComponent feature="tests" recordCount="11" formStatus="empty">Test</SubHeaderComponent>);
    const recordCount = screen.getByTestId('record-count');
    expect(recordCount.innerHTML).toBe("(11)")
  });

  it('should set button label', () => {
    render(<SubHeaderComponent feature="tests" recordCount="11" formStatus="empty">Test</SubHeaderComponent>);
    const buttonLabel = screen.getByText('New test')
    expect(buttonLabel).toBeInTheDocument()
  });
  
})
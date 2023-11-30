import { describe, it, expect, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import SubHeaderComponent from './SubHeaderComponent.jsx';
import '@testing-library/jest-dom';

describe('SubHeaderComponent', () => {

  it('should set heading', () => {
    render(
      <SubHeaderComponent 
      featureName="tests" 
      recordCount="11" 
      newRecordBtn={false}
      newRecordStatus="empty"
      search={() => {}}>
        Test
      </SubHeaderComponent>
    );
    const heading = screen.getByRole('heading')
    expect(heading.innerHTML).toContain("tests")
  });

  it('should set record count', () => {
    render(
      <SubHeaderComponent 
        featureName="tests" 
        recordCount="11" 
        newRecordBtn={false}
        newRecordStatus="empty"
        search={() => {}}>
        Test
      </SubHeaderComponent>
    );
    const recordCount = screen.getByTestId('record-count');
    expect(recordCount.innerHTML).toBe("(11)")
  });

  it('should set button label', () => {
    render(
      <SubHeaderComponent 
        featureName="tests" 
        recordCount="11" 
        newRecordBtn={true}
        newRecordStatus="empty"
        search={() => {}}>
        Test
      </SubHeaderComponent>
    );
    const buttonLabel = screen.getByText('New test')
    expect(buttonLabel).toBeInTheDocument()
  });

  it('should not have a new button', () => {
    render(
      <SubHeaderComponent 
        featureName="tests" 
        recordCount="11" 
        newRecordBtn={false}
        newRecordStatus="empty"
        search={() => {}}>
        Test
      </SubHeaderComponent>
    );
    expect(screen.queryByText('New test')).not.toBeInTheDocument()
  });
  

  it('should show modal', () => {
    render(
      <SubHeaderComponent 
        featureName="tests" 
        recordCount="11" 
        newRecordBtn={true}
        newRecordStatus="empty"
        search={() => {}}>
        Test
      </SubHeaderComponent>
    );
    //await act( async () => render(<TestApp/>));
    const btn = screen.getByText("New test");
    fireEvent.click(btn);
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  });

  it('should hide modal', () => {
    render(
      <SubHeaderComponent 
        featureName="tests" 
        recordCount="11" 
        newRecordBtn={true}
        newRecordStatus="empty"
        search={() => {}}>
        Test
      </SubHeaderComponent>
    );
    const btn = screen.getByText("New test");
    fireEvent.click(btn);
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const closeBtn = screen.getByLabelText("Close");
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  });
  
})
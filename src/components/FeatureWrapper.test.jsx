import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"

import {FeatureWrapper} from './FeatureWrapper.jsx';
import '@testing-library/jest-dom';

describe('FeatureWrapper', () => {

  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <FeatureWrapper subHeaderProps={{
          featureName: "Bookings", 
          recordCount: 0,
          newRecordBtn: true,
          newRecordStatus: {},
          search: () => {}
        }}/>
      </BrowserRouter>
    )
  });

})
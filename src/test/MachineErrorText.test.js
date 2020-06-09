import React from 'react';
import { render, cleanup } from '@testing-library/react';

import MachineErrorText from '../Components/MachineErrorText'

afterEach(cleanup);

const defaultProps = {
    machineError: true,
    errorMessageDescription: 'Code 3 Machine is kapot.'
  }

it("Render MachineErrorText with message", ()=> {
    const {findByText } = render(
    <MachineErrorText 
    machineError={defaultProps.machineError}  
    errorMessageDescription= {defaultProps.errorMessageDescription}
    /> 
    );
    expect(findByText("Code 3 Machine is kapot.")).toBeTruthy();
})

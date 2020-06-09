import React from 'react';
import { render, cleanup } from '@testing-library/react';

import MachineStatusText from '../Components/MachineStatusText'

const defaultProps = {
    coffeeName: "Americano",
  };

const context = { 
    updateMachineTekst: ""
  };

afterEach(cleanup)

 it("Render MachineStatusText with Americano", ()=> {
     const {getByText} = render(
         
    <MachineStatusText 
    coffeeName = {defaultProps.coffeeName}
     />
     );
     expect(getByText("Machine maakt Americano")).toBeInTheDocument()
 })

  it("Render MachineStatusText Klaar maak keuze", ()=> {
    const {getByText} = render(
   <MachineStatusText 
   updateMachineTekst = {context.updateMachineTekst}
    />
    );
    expect(getByText("Klaar maak Keuze")).toBeInTheDocument()
})

 
import React from 'react';
import { render, cleanup} from '@testing-library/react';

import CoffeeButtons from '../Components/CoffeeButtons'
import CoffeeData from '../Data/CoffeeData';

afterEach(cleanup);
const defaultProps = {
    coffeeItems: CoffeeData,
    renderSwitch: 'Americano'
  }

it("Gets Coffee Button by Name", ()=> {
    const {findByText } = render(
        <CoffeeButtons  
        renderSwitch={defaultProps.renderSwitch}
        coffeeItems = {defaultProps.coffeeItems}
        /> 
    );
    expect(findByText('Americano')).toBeTruthy();
})
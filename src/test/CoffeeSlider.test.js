import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CoffeeSlider from '../Components/CoffeeSlider'


const defaultProps = {
    sliderName: "Sugar", 
    capacity: {
      totalSliderValue: 80,
    }
  };
  
afterEach(cleanup)

test("Render Slider with text Sugar", ()=> {
    const {getByText} = render(
    
    <CoffeeSlider 
    sliderName={defaultProps.sliderName}
    totalSliderValue = { defaultProps.capacity.totalSliderValue}
    />
    );
    expect(getByText("Sugar")).toBeTruthy();
})

test("Render Slider max value of 80", ()=> {
    const {getByText } = render(
    <CoffeeSlider 
    totalSliderValue = { defaultProps.capacity.totalSliderValue}
    />
    );
    expect(getByText('80')).toBeTruthy();
})
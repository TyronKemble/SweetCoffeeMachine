import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    display: "inline",
    width: 150,
    float: "right",
    marginRight: 100,
    paddingTop: 10,
  },
});

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

function valuetext(value) {

  return `${value}`;
}



function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue ] = React.useState([props.totalSliderValue]);
  
  const handleChange = (event, newValue) => {
      if (props.sliderValueSugar >= props.totalSliderValue ) {
          setValue(newValue);
          props.handleDataCallBackSugarSlider(newValue)
      }
      if (props.sliderValueMilk >= props.totalSliderValue) {
        setValue(newValue);
        props.handleDataCallBackMilkSlider(newValue)
      }
  };
  

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {props.sliderName}
      </Typography>
      
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        marks={marks}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext }
        disabled = {props.sliderDisabled}
      />
    </div>
    
  );
}

export default RangeSlider


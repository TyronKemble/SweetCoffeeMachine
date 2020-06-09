import React, { Component } from 'react';
import {Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


class CoffeeButton extends Component {
	render(){
        const coffeeitems = this.props.coffeeItems.map( item =>{
            return (
                <Grid container  key={item.id} id={item.id}  item xs={4} >
                    <Button 
                      variant="outlined"
                      size="large"
                      id={item.id}
                      fullWidth
                      style={{fontSize: '18px' , backgroundColor:  "#607d8b", fontWeight: "Bold" }} 
                      item={item}
                      disabled ={item.buttonDisabled }
                      onBlur={() => this.onBlur}
                      onClick= {() => this.props.renderSwitch(item.name)}
                      key={item.id}
                      >{item.name} 
                    </Button>
                </Grid>
            )


        })
		return(

            <div className="Buttons" > 
            <Grid >
                <Grid container  item spacing={3}>
                    {coffeeitems}
                </Grid>
            </Grid>
                
            </div>
        
		)
	}

}

export  default  CoffeeButton
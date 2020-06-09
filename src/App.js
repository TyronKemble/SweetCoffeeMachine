import React, { Component } from 'react';
import SweetCoffeeMachine from './Api/SweetCoffeeMock'
import './App.css';
import CoffeeButtons from './Components/CoffeeButtons'
import CoffeeData from './Data/CoffeeData'
import MachineStatusText from './Components/MachineStatusText'
import CoffeeSlider from './Components/CoffeeSlider'
import MachineErrorText from './Components/MachineErrorText'
import MachineErrorMessages from './Data/MachineErrorData'

class App extends Component {
  constructor(){
    super()
    this.state = {
      // Load SweetCoffeeMachine Api - Check if Api is ready - Get last tekst for machine
      coffeeMachine : new SweetCoffeeMachine(),
      apiReady: "",
      updateMachineTekst: "",

      // Get CoffeeData from Json file
      coffeeItems: CoffeeData,
      coffeeName: "",
       // Get MachineErrorMessages from Json file
      errorData: MachineErrorMessages,


      // Check API values
      checkSugarAndMilkValue: true,
      checkChocolateValue: true,



      // Slider Values - Disabled 
      totalSliderValue: 0,
			sliderValueSugar: 0,
			sliderValueMilk:0, 
			sliderMilkDisabled: false,
      sliderSugarDisabled: false,
      
      // Machine in Error
      machineError: false,
      errorMessageDescription: ""
    }
  }

  componentDidMount(){
    this.checkApiConnection()
   }

   // Checks if SweetCoffeeMock Api is ready 
  async checkApiConnection() {
    try {
      this.MachineInProgressDisableAllButtons()
      this.DisableCappucinoAndSlider()
       this.setState({
        updateMachineTekst: "Machine Booting"
       })

       await this.state.coffeeMachine.checkMachineReady()
       .then( ready => {
         this.setState({
           apiReady: ready,
           sliderMilkDisabled : false,
           sliderSugarDisabled: false
         })
       })
    } catch (error) {
      console.log("Unable to make Api Connection")
    }

    if (this.state.apiReady) {
      this.MachineErrorResolved()
    }
  }

  // Select the coffee that needs to be created
  renderSwitch =(coffeename) => {
		this.setState({
      coffeeName: coffeename,
    })
		switch(coffeename) {
			case 'Americano':
        if (this.state.coffeeMachine.makeAmericano());
          return this.MachineMakesCoffee();
			case 'Cappucino':
        if (this.state.coffeeMachine.makeCapoccino());
			  return this.MachineMakesCoffee();
			case 'Wiener Melange':
        if (this.state.coffeeMachine.makeWienerMelange());
			  return this.MachineMakesCoffee();
			case 'Chocolade':
        if (this.state.coffeeMachine.makeChoco());
			  return this.MachineMakesCoffee();
			case 'Zwarte Thee':
        if (this.state.coffeeMachine.makeBlackTea());
			  return this.MachineMakesCoffee();
			case 'Earl Gray':
        if (this.state.coffeeMachine.makeEarlGray());
			  return this.MachineMakesCoffee();
			default:
			  return 'foo';
		  }
	}

  // Methods for creating the coffee - InProgress- Ready 
	MachineMakesCoffee(){
      this.MachineInProgressDisableAllButtons()
			setTimeout(() => {
				this.MachineReadyEnableAllButtons()
			}, 3000);
		return true;
  }
  MachineInProgressDisableAllButtons = () => {
    this.setState( () => {
        const updateCoffee = this.state.coffeeItems.map( coffee =>
          {
              if (coffee) {
                coffee.buttonDisabled = true
              }

            return coffee
          }
        )

        return {
            coffeeItems: updateCoffee,
            updateMachineTekst: "",
        }
    })

  }

  // Finishing the coffee creation and Checks the Api values of Sugar, Milk, Choco,Waterpressure and Temperature
  MachineReadyEnableAllButtons = () => {
            this.setState( () => {
              let updateCoffee = this.state.coffeeItems.map( coffee =>
                {
                    if (coffee) {
                      coffee.buttonDisabled = false
                    }
                    if (!this.state.checkChocolateValue) {
                      if (coffee.name === 'Wiener Melange' || coffee.name=== 'Chocolade') {
                        coffee.buttonDisabled =true
                      }
                    }
                    if (!this.state.checkSugarAndMilkValue) {
                      if (coffee.name === 'Cappucino') {
                        coffee.buttonDisabled =true
                      }
                    }
                  return coffee
                }
              )
              return {
                  coffeeItems: updateCoffee,
                  updateMachineTekst: "Klaar maak Keuze"
              }
    
          })
          // Every Api value will be checked      
          this.checkSugarAndMilkValueAPI()
          if (this.state.coffeeName === 'Wiener Melange' || this.state.coffeeName === 'Chocolade') {
            this.checkChocoValueAPI()
          }
          this.checkWaterPressureAPI()
          this.checkTemperatureAPI()

  }


  // Check Values from API
  async checkSugarAndMilkValueAPI (){
    try {
      await this.state.coffeeMachine.calculateValueSugarAndMilk(this.state.sliderValueSugar,this.state.sliderValueMilk)
    } catch (error) {
      console.log("Sugar And Milk Value is to low ")
      this.DisableCappucinoAndSlider()
    }

  }

  async checkChocoValueAPI (){
    try {
      await this.state.coffeeMachine.calculateChocolateValue()
    } catch (error) {
      console.log("Chocolate value is to low")
      this.DisableChocoladeAndWiener()
    }

  }

  async checkWaterPressureAPI (){
    try {
      await this.state.coffeeMachine.checkWaterPressur()
    } catch (error) {
      this.ErrorMessageMachine("Geen water")
      setTimeout(() => {
        this.state.coffeeMachine.errorResolved("Geen water").then(this.ErrorResolved())
       }, 3000);
    }

  }

  async checkTemperatureAPI (){
    try {
      await this.state.coffeeMachine.checkTemperatureValue()
    } catch (error) {
      this.ErrorMessageMachine("Temperatuur te laag")
      setTimeout(() => {
         this.state.coffeeMachine.errorResolved("Temperatuur te laag").then(this.ErrorResolved())
       }, 3000);
    }
  }


  // Disables Cappucino Button - Sugar and Milk slider
  DisableCappucinoAndSlider= () => {
    this.setState( () => {
        const updatedCoffee =this.state.coffeeItems.map(coffee => {
            if (coffee.name === 'Cappucino') {
                coffee.buttonDisabled = true
            }
            return coffee
        })
        return {
            coffeeItems: updatedCoffee,
            sliderSugarDisabled: true,
            sliderMilkDisabled: true,
            checkSugarAndMilkValue:  false,
        }
    })
  }

  // Disables Chocolade Button and Wiener Melange Button
  DisableChocoladeAndWiener = () => {
    this.setState( () => {
        const updatedCoffee = this.state.coffeeItems.map(coffee => {
            if (coffee.name === 'Chocolade' || coffee.name === 'Wiener Melange') {
                coffee.buttonDisabled = true
            }
            return coffee
        })
        return {
        coffeeItems: updatedCoffee,
        checkChocolateValue: false
        }
    })
    return true
  }


  // Machine in Error 
  ErrorMessageMachine  = (event) => {
    let num = 0;
    this.MachineInError()
    this.setState(() => {
      const updatedError = this.state.errorData.map(melding => {
          if (melding.description ===  event ) {
            console.log(melding.description);
            num = melding.code
            return melding.userNotification
          }
          if (melding.description === event) {
            console.log(melding.description)
            num = melding.code
            return melding.userNotification
          }
        return false
      })
      return {
        errorMessageDescription: "Code "+num+" "+updatedError[num]+ ". ",
        machineError: true,
        sliderMilkDisabled: true,
        sliderSugarDisabled: true,
      }
    
    })
  }
  MachineInError = () => {
    this.setState( prevState => {
        const updateCoffee = prevState.coffeeItems.map( coffee =>
          {
            coffee.buttonDisabled = !prevState.buttonDisabled
            return coffee
          }
        )
        return {
            coffeeItems: updateCoffee,
            updateMachineTekst: "Error",
        }

    })
  }
  ErrorResolved  = () => {
    let num = 0;
    this.MachineErrorResolved()
    this.setState(()  => {
      this.state.errorData.map(melding => {
          if (melding.description ===  "Geen storing" ) {
            console.log(melding.description +" " + num)
            num = melding.code
            return melding.userNotification
          }
        return false
      })
      return {
        sliderMilkDisabled: false,
        sliderSugarDisabled: false,
        machineError: false,
        checkChocolateValue: true,
        checkSugarAndMilkValue: true,
      }
    })
  }

  // Machine ErrorResolved
  MachineErrorResolved = (event) => {
    this.setState( prevState => {
        const updateCoffee = prevState.coffeeItems.map( coffee =>
          {
            coffee.buttonDisabled = false
            return coffee
          }
        )
        return {
            coffeeItems: updateCoffee,
            updateMachineTekst: "Klaar maak Keuze ",

        }

    })
  }

  // Sugar and Milk SlidercallBacks
	handleDataCallBackSugarSlider = (event) =>{
		this.setState({
			sliderValueSugar: event[0]
    })
	return true

	}
	handleDataCallBackMilkSlider = (event) => {
		this.setState({
			sliderValueMilk: event[0]
    })
		return true
	}

  render(){
    return(
      <div className="Container">
               <CoffeeButtons  
               renderSwitch={this.renderSwitch}
               coffeeItems = {this.state.coffeeItems}
               /> 

              <CoffeeSlider sliderName="Milk" 
              totalSliderValue = { this.state.totalSliderValue}
              sliderValueMilk = {this.state.sliderValueMilk}
              sliderDisabled = {this.state.sliderMilkDisabled}
              handleDataCallBackMilkSlider = {this.handleDataCallBackMilkSlider}
              handleDisableSlider={this.handleDisableSlider} 
              />

              <CoffeeSlider sliderName="Sugar" 
              totalSliderValue = { this.state.totalSliderValue}
              sliderValueSugar= {this.state.sliderValueSugar}
              sliderDisabled = {this.state.sliderSugarDisabled}
              handleDataCallBackSugarSlider = {this.handleDataCallBackSugarSlider}
              handleDisableSlider={this.handleDisableSlider} 
              />

              <div className="MachineStatusTekst" >
              <MachineStatusText 
              coffeeName={this.state.coffeeName} 
              updateMachineTekst={this.state.updateMachineTekst}
              />
              </div>
              <MachineErrorText 
              machineError={this.state.machineError}  
              errorMessageDescription= {this.state.errorMessageDescription}
              /> 

      </div>
    )
  }
}
export default App;

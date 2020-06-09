/**
 * Doel van dit object is het bieden van een interface naar de koffiezetmachine, er is gedrag geimplementeerd
 * echter voel je vrij om dit naar behoefte aan te passen. Zolang de interface van het mock object identiek blijft.
 * 
 * 
 */

 export default class SweetCoffeeMachine {
	constructor()  {
		this.apiReady = true;
		this.errorState = 0;
		this.TotalValueSugarValue = 100;
		this.TotalValueMilk = 100;

		this.TotalchocoladeValue = 10;
		this.chocoladeValue = 5;

		this.waterPressur = 10;
		this.waterPressurValue = 2
		this.Temperature = 14;
		this.TemperatureValue = 2
	}
	// Check if Machine is ready
	checkMachineReady(){
		var machineReady = new Promise((resolve, reject) => {
		  setTimeout(() => {
			  if (this.apiReady) {
				resolve(true);
			  }else if (!this.apiReady) {
				  reject(false)
			  }
		  }, 3000);
		}); 
		
		return Promise.resolve(machineReady);
	}
	/*
	 * Sends a command to the coffee machine to start making a drink.
	 * sugar and milk are values between [0,1] 
	 */
	makeAmericano( sugar, milk ) {
		return true
	}
	
	/*
	 * Sends a command to the coffee machine to start making a drink.
	 * sugar and milk are values between [0,1] 
	 */
	makeCapoccino( sugar, milk ) {
		return true
	}
	
	/*
	 * Sends a command to the coffee machine to start making a drink.
	 * sugar and milk are values between [0,1] 
	 */
	makeWienerMelange( sugar, milk ) {
		return true
	}
	
	/*
	 * Sends a command to the coffee machine to start making a drink.
	 * sugar and milk are values between [0,1] 
	 */
	makeChoco( sugar, milk ) {
		return true
	}
	
	/*
	 * Sends a command to the coffee machine to start making a drink.
	 * sugar and milk are values between [0,1] 
	 */
	makeBlackTea( sugar, milk ) {
		return true

	}
	
	/*
	 * Sends a command to the coffee machine to start making a drink.
	 * sugar and milk are values between [0,1] 
	 */
	makeEarlGray(sugar, milk) {
		return true
	}
	

	calculateValueSugarAndMilk = (sugar,milk ) => {
		this.TotalValueSugarValue -= sugar
		this.TotalValueMilk -= milk
		var p1 = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.TotalValueSugarValue <= 0 || this.TotalValueMilk  <= 0  ) {
					reject(false)
				} else if (this.TotalValueSugarValue >= 0 || this.TotalValueMilk  >= 0 ) {
					resolve(true)
				} 
			}, 50);
			}); 
			
			return Promise.resolve(p1);
	}

	calculateChocolateValue(){
		this.TotalchocoladeValue -= this.chocoladeValue

		var p1 = new Promise((resolve, reject) => {
			setTimeout(() => {
				if(  this.TotalchocoladeValue <= 0 ){
					reject(false)
				} else if ( this.TotalchocoladeValue >= 0) {
					resolve(true)
				} 
			}, 50);
			}); 
			
			return Promise.resolve(p1);
	}

	checkWaterPressur(){
		this.waterPressur -= this.waterPressurValue
		var p1 = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.waterPressur <= 0) {
					reject ("error")
				} else if (this.waterPressur >= 0) {
					resolve ("")
				} 
			}, 50);
			}); 
			
		return Promise.resolve(p1);

	}

	checkTemperatureValue(){
		this.Temperature -= this.TemperatureValue;
		var p1 = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.Temperature <= 0) {
					reject("error")
				} else if (this.Temperature >= 0) {
					resolve("")
				} 
			}, 50);
			}); 
			
		return Promise.resolve(p1);

	}

	// reset all values to default
	errorResolved(message){
		if(message === "Geen water"){
			this.TotalValueSugarValue = 100;
			this.TotalValueMilk = 100;
			this.TotalchocoladeValue = 10;
			this.waterPressur = 10;
		}
		if(message === "Temperatuur te laag"){
			this.TotalValueSugarValue = 100;
			this.TotalValueMilk = 100;
			this.TotalchocoladeValue = 10;
			this.Temperature = 14;
		}
		var p1 = new Promise((resolve) => {
			setTimeout(() => {
				resolve("resolved")
			}, 50);
			}); 
			
		return Promise.resolve(p1);
	}


	/**
	 * Callback for retrieving error messages, takes callback function as parameter. Setting the callback 
	 * tiggers a response in a minute
	 */
	errorCallback(callback) {
		this._cbError = callback;
		
		setTimeout(function() {
			this._cbError(Math.round(Math.random() * 4));
		}, Math.random() * 60000);
	}
	
	/**
	 * Callback for retrieving ready messages, takes callback function as parameter.  Setting the callback 
	 * tiggers a response in a minute
	 */
	readyCallback =(callback) => {
		this._cbReady = callback;
		
		setTimeout(()=> {
		},  3000);
	}
	
}

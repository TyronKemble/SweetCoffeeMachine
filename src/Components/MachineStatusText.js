import React  from 'react';

const MachineStatusText = (props) => {

    return (
        (props.updateMachineTekst ?  props.updateMachineTekst  : props.coffeeName ?  
        <p>Machine maakt {props.coffeeName}  </p> :  <p>Klaar maak Keuze</p>)
    )
}


export default MachineStatusText;
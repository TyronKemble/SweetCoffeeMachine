import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.machineError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Helaas is er een technische storing: {props.errorMessageDescription}
            Het maken van dranken is helaas niet mogelijk 
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AlertDialog
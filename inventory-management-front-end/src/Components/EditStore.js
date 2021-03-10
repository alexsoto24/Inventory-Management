import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const EditStore = ({open, handleClose, onEdit, store}) => {
    const [id] = useState(store.id);
    const [name, setName] = useState(store.name);
    const [email, setEmail] = useState(store.email);
    const [phone, setPhone] = useState(store.phone);
    const [address, setAddress] = useState(store.address);

    const[phoneErrorText, setPhoneErrorText] = React.useState("");
    const[addressErrorText, setAddressErrorText] = React.useState("");

    const classes = useStyles();

    const validate = e => {

        var errors = 0;

        if(!phone){
            errors += 1;
            setPhoneErrorText("Please Enter a Valid Phone Number")
        }else{
            setPhoneErrorText("")
        }
        if(!address){
            errors += 1;
            setAddressErrorText("Please Enter a Valid Address")
        }else{
            setAddressErrorText("")
        }
        if(errors === 0){
            handleClose()
            onEdit({id, name, email, phone, address })
            resetFields()
        }
    }

    const resetFields = () => {
        setName("")
        setEmail("")
        setPhone("")
        setAddress("")
    }

    return (
        <>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
              <Fade in={open}>
                <div className={classes.paper}>
                  <center>
                      <h1>Edit Store Info</h1>
                  </center>
                  <form>
                      <div>
                        <TextField 
                            defaultValue={name}
                            className={classes.textField} 
                            disabled
                            id="name" 
                            label="Name" 
                            variant="outlined"
                        />
                        <TextField 
                            defaultValue={email}
                            className={classes.textField} 
                            disabled
                            id="email" 
                            label="Email" 
                            variant="outlined"
                        />
                        <TextField 
                            error={!!phoneErrorText}
                            helperText={phoneErrorText}
                            onChange={e => setPhone(e.target.value)}
                            defaultValue={phone}
                            className={classes.textField} 
                            required 
                            id="phone" 
                            label="Phone" 
                            variant="outlined"
                        />
                      </div>
                      <div>
                        <TextField 
                            error={!!addressErrorText}
                            helperText={addressErrorText}
                            onChange={e => setAddress(e.target.value)}
                            defaultValue={address}
                            className={classes.textField} 
                            required 
                            id="address" 
                            label="Address" 
                            variant="outlined" 
                            fullWidth
                        />
                      </div>
                      <center>
                          <Button className={classes.button} color="primary" variant="contained" onClick={validate}>Submit</Button>
                      </center>
                      
                  </form>
                </div>
              </Fade>
          </Modal>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    textField:{
        margin: theme.spacing(1)
    },
    button:{
        margin: theme.spacing(1)
    }
  }));

export default EditStore

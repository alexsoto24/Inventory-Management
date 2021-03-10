import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

const AddInventory = ({storeId, open, handleClose, onAdd}) => {
    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");

    const [nameErrorText, setNameErrorText] = useState("");
    const [skuErrorText, setSkuErrorText] = useState("");
    const [priceErrorText, setPriceErrorText] = useState("");
    const [stockErrorText, setStockErrorText] = useState("");

    const classes = useStyles();

    const validate = () => {

        var errors = 0;

        if(!name){
            setNameErrorText("Please Enter a Valid Name")
            errors += 1;
        }else{
            setNameErrorText("")
        }
        if(!sku){
            errors += 1;
            setSkuErrorText("Please Enter a Valid Sku")
        }else{
            setSkuErrorText("")
        }
        if(!price){
            errors += 1;
            setPriceErrorText("Please Enter a Valid Price")
        }else{
            setPriceErrorText("")
        }
        if(!stock){
            errors += 1;
            setStockErrorText("Please Enter a Valid Stock Amount")
        }else{
            setStockErrorText("")
        }
        if(errors === 0){
            handleClose()
            console.log({storeId, name, sku, price, stock, description})
            onAdd({storeId, sku, name, description, price, stock})
            resetFields()
        }
    }

    const resetFields = () => {
        setName("")
        setSku("")
        setPrice(0)
        setStock(0)
        setDescription("")
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
                      <h1>Add Inventory Entry</h1>
                  </center>
                  <form>
                      <div>
                        <TextField 
                            error={!!nameErrorText}
                            helperText={nameErrorText}
                            onChange={e => setName(e.target.value)}
                            className={classes.textField} 
                            required 
                            id="name" 
                            label="Name" 
                            variant="outlined"
                        />
                        <TextField 
                            error={!!skuErrorText}
                            helperText={skuErrorText}
                            onChange={e => setSku(e.target.value)}
                            className={classes.textField} 
                            required 
                            id="sku" 
                            label="Sku" 
                            variant="outlined"
                        />
                      </div>
                      <div>
                        <TextField 
                            error={!!priceErrorText}
                            helperText={priceErrorText}
                            onChange={e => setPrice(e.target.value)}
                            className={classes.textField} 
                            required 
                            id="price" 
                            label="Price" 
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            type="number"
                            m
                        />
                        <TextField 
                            error={!!stockErrorText}
                            helperText={stockErrorText}
                            onChange={e => setStock(e.target.value)}
                            className={classes.textField} 
                            required 
                            id="stock" 
                            label="Stock" 
                            variant="outlined"
                            type="number"
                        />
                      </div>
                      <div>
                        <TextField 
                            onChange={e => setDescription(e.target.value)}
                            defaultValue={description}
                            className={classes.textField} 
                            id="description" 
                            label="Description" 
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

export default AddInventory

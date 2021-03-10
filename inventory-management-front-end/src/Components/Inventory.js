import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import { MenuItem } from '@material-ui/core';
import AddInventory from './AddInventory';




const Inventory = ({stores, onDelete, Inventory, onAdd}) => {
    const classes = useStyles();
    const [store, setStore] = useState(stores[0])
    const [inventory, setInventory] = useState([])
    const [addInventoryOpen, setAddInventoryOpen] = React.useState(false);

    const handleAddInventoryOpen = () => {
        setAddInventoryOpen(true);
    };
    
    const handleAddInventoryClose = () => {
        setAddInventoryOpen(false);
    };


    useEffect(() => {
        const getInventory = async () =>{
          const inventoryFromServer = await Inventory(store.id)
          setInventory(inventoryFromServer)
        }
    
        getInventory()
      },[store, Inventory])

      const handleChange = (event) => {
        setStore(event.target.value);
      };

    return (
        <Container>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel>Store</InputLabel>
                    <Select
                        className={classes.selectEmpty}
                        onChange={handleChange}
                        defaultValue={store}
                    >
                        {stores.map((store) =>(
                            <MenuItem key={store.id} value={store}>{store.name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <center>
                    <h1>{store.name}</h1>
                </center>
             </div>
         <TableContainer className={classes.container}>
            {inventory.length !== 0 ? 
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Name</b>
                            </TableCell>
                            <TableCell>
                                <b>Sku</b>
                            </TableCell>
                            <TableCell>
                                <b>Price</b>
                            </TableCell>
                            <TableCell>
                                <b>Stock</b>
                            </TableCell>
                            <TableCell>
                                <b>Description</b>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {entry.name}
                                </TableCell>
                                <TableCell>
                                    {entry.sku}
                                </TableCell>
                                <TableCell>
                                    ${entry.price}
                                </TableCell>
                                <TableCell>
                                    {entry.stock}
                                </TableCell>
                                <TableCell>
                                    {entry.description}
                                </TableCell>
                                <TableCell>
                                    <Button className={classes.button} variant="contained" color="primary">Edit</Button>
                                    <Button className={classes.button} variant="contained" color="secondary" onClick={() => onDelete(store.id, entry.sku)}>Delete</Button>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> : <center>This Store has No Inventory</center>}
            </TableContainer>
            <center>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleAddInventoryOpen}>Add</Button>
            </center>
            <AddInventory storeId={store.id} open={addInventoryOpen} handleClose={handleAddInventoryClose} onAdd={onAdd}></AddInventory>
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: '150ch',
        height: 600,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    button: {
        margin: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));

export default Inventory

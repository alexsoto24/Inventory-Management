import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Container, List, ListItemSecondaryAction } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddStore from './AddStore';
import EditStore from './EditStore';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const Stores = ({stores, onDelete, onAdd, onEdit}) => {

    const classes = useStyles();

    const [addStoreOpen, setAddStoreOpen] = React.useState(false);
    const [editStoreOpen, setEditStoreOpen] = React.useState(false);
    const [store, setStore] = React.useState();



    const handleAddStoreOpen = () => {
      setAddStoreOpen(true);
    };
  
    const handleAddStoreClose = () => {
      setAddStoreOpen(false);
    };

    const handleEditStoreOpen = (store) => {
      setStore(store);
      setEditStoreOpen(true);
    };
  
    const handleEditStoreClose = () => {
      setEditStoreOpen(false);
    };

    return (
        <Paper className={classes.paper}>
          <Container>
            <div>
              <center>
                <h1 className={classes.title}>Stores</h1>
              </center>
              <FormControl className={classes.formControl}>
                <TextField
                  id="store" 
                  label="Search" 
                ></TextField>
              </FormControl>
            </div>
          <List className={classes.list}>
            {stores.map((store) => (
              <ListItem  dense key = {store.id}>
                <ListItemText  primary = {store.name} secondary={
                  <div>
                    <p>{store.email}</p>
                    <p>{store.phone}</p>
                    <p>{store.address}</p>
                  </div>
                  }/>
                
                <ListItemSecondaryAction>
                  <Fab className={classes.button} color="primary" onClick={() => handleEditStoreOpen(store)}>
                    <EditIcon />
                  </Fab>
                  <Fab className={classes.button} color="secondary" onClick={() => onDelete(store.id)}>
                    <DeleteIcon />
                  </Fab>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          </Container>
            <center>
              <Button className={classes.button} variant="contained" color="primary" onClick={handleAddStoreOpen}>Add</Button>
            </center>
          <AddStore open={addStoreOpen} handleClose={handleAddStoreClose} onAdd={onAdd}></AddStore>
          {editStoreOpen ? <EditStore open={editStoreOpen} handleClose={handleEditStoreClose} onEdit={onEdit} store={store}></EditStore> : <></>}
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
      width: '150ch',
      marginBottom: theme.spacing(2),
      marginLeft: 'auto',
      marginRight: 'auto',
    },  
    list: {
      width: '140ch',
      height: 620,
      overflow: 'auto',
    },
    button: {
        margin: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    title: {
      margin: theme.spacing(1),
    }
  }));

export default Stores

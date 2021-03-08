import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemSecondaryAction} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddEditStore from './AddEditStore';

const Stores = ({stores, onDelete, onAdd}) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <>
          {stores.map((store) => (
            <List className={classes.root}>
              <ListItem key = {store.id}>
                <ListItemText  primary = {store.name} secondary={
                  <div>
                    <p>{store.email}</p>
                    <p>{store.phone}</p>
                    <p>{store.address}</p>
                  </div>
                  }/>
                
                <ListItemSecondaryAction>
                    <Button className={classes.button} variant="contained" color="primary">Edit</Button>
                    <Button className={classes.button}variant="contained" color="secondary" onClick={() => onDelete(store.id)}>Delete</Button>
                </ListItemSecondaryAction>
            </ListItem>
          </List>
          ))}
          <div>
            <Button className={classes.center} variant="contained" color="primary" onClick={handleOpen}>Add</Button>
          </div>
          <AddEditStore open={open} handleClose={handleClose} onAdd={onAdd}></AddEditStore>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '100ch',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    inline: {
      display: 'inline',
    },
    button: {
        margin: theme.spacing(1)
    },
    center: {
      left: '50%'
    },
  }));

export default Stores

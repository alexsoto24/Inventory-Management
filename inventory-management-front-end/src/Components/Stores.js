import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemSecondaryAction} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const Stores = ({stores}) => {

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
          {stores.map((store, index) => (
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
                    <Button className={classes.button}variant="contained" color="secondary">Delete</Button>
                </ListItemSecondaryAction>
            </ListItem>
          </List>
          ))}
          <div>
            <Button className={classes.center} variant="contained" color="secondary" onClick={handleOpen}>Add</Button>
          </div>

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
                  <h1>Add New Store</h1>  
                </div>
              </Fade>
          </Modal>
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
  }));

export default Stores

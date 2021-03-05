import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemSecondaryAction } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const Stores = ({stores}) => {

    const classes = useStyles();


    return (
        <>
            {stores.map((store, index) => (
            <List className={classes.root}>
            <ListItem key = {store.id}>
                <ListItemText  primary = {store.name} secondary = {store.email}/>
                <ListItemSecondaryAction>
                    <Button className={classes.button} variant="contained" color="primary">Edit</Button>
                    <Button className={classes.button}variant="contained" color="secondary">Delete</Button>
                </ListItemSecondaryAction>
            </ListItem>
           </List>
          ))}
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
    }
  }));

export default Stores

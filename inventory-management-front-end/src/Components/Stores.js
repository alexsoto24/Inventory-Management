import {useState, useEffect} from 'react'
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
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';

const Stores = ({stores, onDelete, onAdd, onEdit}) => {

    const classes = useStyles();

    const [addStoreOpen, setAddStoreOpen] = useState(false);
    const [editStoreOpen, setEditStoreOpen] = useState(false);
    const [store, setStore] = useState();
    const [storeList, setStoreList] = useState(stores);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
      setStoreList(stores)
    },[stores])

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
    
    const handleStoreSearch = (event) => {
      if(event.target.value === ""){
        setStoreList(stores)
      }else{
        setStoreList(stores.filter((store) => store.name.includes(event.target.value)))
      }
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
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
                  onChange={handleStoreSearch}
                ></TextField>
              </FormControl>
            </div>
          <TableContainer className={classes.container}>
          {storeList.length !== 0 ? 
            <List className={classes.list}>
            {storeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((store) => (
              <ListItem key = {store.id}>
                <ListItemText  primary = {store.name} secondary={
                  <div>
                    <p>
                      {store.email}<br/>
                      {store.phone}<br/>
                      {store.address}<br/>
                    </p>
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
            </List>: <center>No Stores</center>}
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={storeList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
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
      minWidth: 750
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
    },
    container: {
      height: 565,
    },
  }));

export default Stores

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
import { Container, MenuItem } from '@material-ui/core';
import AddInventory from './AddInventory';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'sku', numeric: false, disablePadding: false, label: 'Sku' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'stock', numeric: true, disablePadding: false, label: 'Stock' },
    
  ];
  

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

const Inventory = ({stores, onDelete, Inventory, onAdd}) => {
    const classes = useStyles();
    const [store, setStore] = useState(stores[0])
    const [inventory, setInventory] = useState([])
    const [addInventoryOpen, setAddInventoryOpen] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
        <Paper >
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
                <Table 
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={inventory.length}
                    />
                    <TableBody>
                        {stableSort(inventory, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={row.name}
                            >
                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.sku}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="right">${row.price}</TableCell>
                                <TableCell align="right">{row.stock}</TableCell>
                                <TableCell>
                                    <Fab className={classes.button} color="primary">
                                        <EditIcon/>
                                    </Fab>
                                    <Fab className={classes.button} color="secondary" onClick={() => onDelete(store.id, row.sku)}>
                                        <DeleteIcon/>
                                    </Fab>
                                </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table> : <center>This Store has No Inventory</center>}
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8, 16]}
                component="div"
                count={inventory.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            </Container>
            <center>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleAddInventoryOpen}>Add</Button>
            </center>
            <AddInventory storeId={store.id} open={addInventoryOpen} handleClose={handleAddInventoryClose} onAdd={onAdd}></AddInventory>
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    container: {
        width: '150ch',
        height: 550,
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

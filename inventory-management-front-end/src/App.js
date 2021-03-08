import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Stores from './Components/Stores'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'


function App() {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState("Stores");
  const [stores, setStores] = useState([])
  const [change, setChange] = useState(false);

  useEffect(() => {
    const getStores = async () =>{
      const storesFromServer = await fetchStores()
      setStores(storesFromServer)
      setChange(false)
    }

    getStores()
  },[change])

  const fetchStores = async () => {
    const res = await fetch('https://localhost:44372/api/Store')
    const data = await res.json()
    return data;
  }

  const addStore = async (store) => {
    const res = await fetch('https://localhost:44372/api/Store', {
      method: 'Post',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(store),
    })

    //const data = await res.json()

    if(!res.ok){
      alert("Store Already Exists")
    }else{
      //setStores([...stores, data])
      setChange(true)
    }
  }

  const deleteStore = async (id) => {
    const res = await fetch(`https://localhost:44372/api/Store/${id}`,{
      method: 'Delete'
    })

    if(!res.status === 200){
      alert("Error Deleting Store")
    }else{
      //setStores(stores.filter((store) => store.id !== id))
      setChange(true)
    }
  }

  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleSelection = (text) => {
    setSelection(text)
  }

  return (
    <div className={classes.root} >
      <CssBaseline />
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen}></Navbar>
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} toggleSelection={toggleSelection}></Sidebar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {selection ===  "Stores" ? (
          <Stores onAdd={addStore} onDelete={deleteStore} stores={stores}></Stores>
        ) : ('Inventory')}
      </main>
    </div>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


export default App;

import IconButton from '@material-ui/core/IconButton';
import { Drawer } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StoreIcon from '@material-ui/icons/Store';
import WorkIcon from '@material-ui/icons/Work';

const Sidebar = ({open, handleDrawerClose, toggleSelection}) => {

    const classes = useStyles();

    const theme = useTheme();

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                    <List>
                        <ListItem button onClick={ () => toggleSelection("Stores")}>
                            <ListItemIcon>
                                <StoreIcon></StoreIcon>
                            </ListItemIcon>
                            <ListItemText primary="Manage Stores" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={ () => toggleSelection("Inventory")}>
                            <ListItemIcon>
                                <WorkIcon></WorkIcon>
                            </ListItemIcon>
                            <ListItemText primary="Manage Inventory" />
                        </ListItem>
                    </List>
                <Divider />
            </Drawer>
        </>
    )
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
}));

export default Sidebar

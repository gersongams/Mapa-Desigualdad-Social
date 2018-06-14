import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {DataUsage, Equalizer} from "@material-ui/icons/index";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#112151",
    },
    appBar: {
        backgroundColor: "#112151",
    },
    toolBar: {
        height: "100%",
        display: "flex",
        flexDirection: "row"
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        [theme.breakpoints.down('sm')]: {
            display: "initial"
        },
        [theme.breakpoints.up('md')]: {
            display: "none"
        },
    },
    buttons: {
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
        [theme.breakpoints.up('md')]: {
            display: "initial"
        },
    }
});


class Navbar extends Component {

    state = {
        drawerOpened: false,
    };

    toggleDrawer = (value) => () => {
        this.setState({
            drawerOpened: value,
        });
    };


    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static"
                        className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <IconButton className={classes.menuButton}
                                    color="inherit"
                                    aria-label="Menu"
                                    onClick={this.toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title"
                                    color="inherit"
                                    className={classes.flex}>
                            <Link to='/'
                                  className="appTitle">
                                Mapa de Vulnerabilidad Social
                            </Link>
                        </Typography>
                        <div className={classes.buttons}>
                            <Button color="inherit">
                                <Link to='/estadisticas'
                                      className="appTitle">
                                    Estadisticas
                                </Link>
                            </Button>
                            <Button color="inherit">
                                <Link to='/data'
                                      className="appTitle">
                                    Data
                                </Link>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.renderDrawer()}
            </div>
        );
    }

    renderDrawer() {
        return (
            <Drawer open={this.state.drawerOpened}
                    onClose={this.toggleDrawer(false)}>
                <div tabIndex={0}
                     role="button"
                     onClick={this.toggleDrawer(false)}
                     onKeyDown={this.toggleDrawer(false)}
                >
                    <div className="lateralDrawer">
                        <List component="nav">
                            <ListItem button
                                      onClick={() => {
                                          this.props.history.push("/estadisticas");
                                          this.toggleDrawer(false);
                                      }}
                            >
                                <ListItemIcon>
                                    <DataUsage/>
                                </ListItemIcon>
                                <ListItemText primary="Estadisticas"/>
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => {
                                    this.props.history.push("/data");
                                    this.toggleDrawer(false);
                                }}
                            >
                                <ListItemIcon>
                                    <Equalizer/>
                                </ListItemIcon>
                                <ListItemText primary="Data"/>
                            </ListItem>
                        </List>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default withStyles(styles)(Navbar);

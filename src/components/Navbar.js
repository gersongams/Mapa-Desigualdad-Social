import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        backgroundColor: theme.palette.background.paper,
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
    },
});


class Navbar extends Component {

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Mapa de Vulnerabilidad Social
                        </Typography>
                        <div>
                            <Button color="inherit">
                                <Link to='/' className="appTitle">
                                    Mapa
                                </Link>
                            </Button>
                            <Button color="inherit">
                                <Link to='/estadisticas' className="appTitle">
                                    Estadisticas
                                </Link>
                            </Button>
                            <Button color="inherit">
                                <Link to='/data' className="appTitle">
                                    Data
                                </Link>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Navbar);

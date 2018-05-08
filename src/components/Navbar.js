import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import { styles } from './styles/NavbarStyles'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {Link} from "react-router-dom";

class Navbar extends Component {

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Mapa de Vulnerabilidad Social
                        </Typography>
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
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Navbar);

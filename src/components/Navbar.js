import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import { styles } from './styles/NavbarStyles'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class Navbar extends Component {

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Title
                        </Typography>
                        <Button color="inherit">Mapa</Button>
                        <Button color="inherit">Estadisticas</Button>
                        <Button color="inherit">Data</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Navbar);

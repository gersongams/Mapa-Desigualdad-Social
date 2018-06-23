import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    text: {
        height: "calc(100vh - 64px)",
        width: "100%",
        textAlign: "center",
        color: "white",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    title: {
        margin: 0
    }
});

class Creditos extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.text}>
                <h2 className={classes.title}>
                    Datos usados
                </h2>
                <p>
                    En este proyecto se usarón los datos provistos por <a href="http://www.pe.undp.org/">ONU</a>.
                    Para descargar los datos puede hacer click en el siguiente enlace:
                </p>
                <a href="http://www.pe.undp.org/content/dam/peru/docs/Publicaciones%20pobreza/INDH2013/pe.Indice%20de%20Desarrollo%20Humano%20Per%C3%BA.xlsx">
                    <Button variant="raised"
                            color="primary"
                            className={classes.openData}>
                        Descargar data
                    </Button>
                </a>
            </div>

        );
    }
}

export default withStyles(styles)(Creditos);

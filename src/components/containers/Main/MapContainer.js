import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import Grid from '@material-ui/core/Grid';
import * as layers from '../../../assets/layers';
import * as sources from '../../../assets/sources';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import BarChart from "./BarChart";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Drawer from "@material-ui/core/Drawer";

const classes = theme => ({
    fullGrid: {
        width: "100%",
        height: "100%",
        padding: "0 !important",
        margin: "0 !important",
        position: "relative",
        backgroundColor: "black",
        color: "white"
    },
    statsGrid: {
        width: "100%",
        height: "100%",
        padding: "0 !important",
        margin: "0 !important",
        position: "relative",
        backgroundColor: "black",
        color: "white",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
        [theme.breakpoints.up('md')]: {
            display: "initial"
        },
    },
    rootList: {
        width: '100%',
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        visibility: "hidden"
    },
    selectButton: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100
    },
    openStats: {
        position: "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        zIndex: 100,
        [theme.breakpoints.down('sm')]: {
            display: "initial"
        },
        [theme.breakpoints.up('md')]: {
            display: "none"
        },
    },
    root: {
        width: '100%',
        marginTop: 0,
        overflow: 'hidden',
        height: "100%",
        padding: "1rem",
        boxSizing: "border-box"
    },
    table: {
        width: '100%',
        height: "100%",
        backgroundColor: "#333",
        borderRadius: "10px"
    },
    attribute: {
        maxWidth: 100,
        padding: "1rem"
    },
    qty: {
        maxWidth: 50,
        padding: "1rem"
    },
    bar: {
        maxWidth: 150,
        padding: "1rem"
    },
    text: {
        padding: "0 1rem"
    },
    drawer: {
        width: "100%"
    },
    message: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        padding: "0 2rem",
        width: "100%"
    },
    statsContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }
});

mapboxgl.accessToken = "pk.eyJ1IjoiZ2Vyc29uMjMxMjk0IiwiYSI6ImNqYXNycjEzYzFrc3czM3FrbnZobTNsYXIifQ.Z9xZ5zDVRYervZFNTPuiUw";

class MapContainer extends Component {

    map;

    state = {
        toggleableLayers: [
            {
                id: ["idh-peru"],
                name: ["Indice de Desarrollo Humano"]
            },
            {
                id: ["poblacion"],
                name: ["Población"]
            },
            {
                id: ["evn"],
                name: ["Esperanza de Vida al Nacer"]
            },
            {
                id: ["pob_esc"],
                name: ["Población Escolarizada"]
            },
            {
                id: ["poredad_25"],
                name: ["Población Mayor a 25"]
            },
            {
                id: ["ing_promed"],
                name: ["Ingreso promedio"]
            }
        ],
        place: null,
        layer: {
            id: ["idh-peru"],
            name: ["Indice de Desarrollo Humano"]
        },
        open: false,
        drawerOpened: false,
    };

    hideAllLayers = () => {
        this.state.toggleableLayers.forEach((layer) => {
            layer.id.forEach((layerId) => {
                this.map.setLayoutProperty(layerId, "visibility", "none");
            });
        });
    };

    changeLayer = (layer) => {
        this.hideAllLayers();
        layer.id.forEach((layerId) => {
            this.map.setLayoutProperty(layerId, "visibility", "visible");
        });
    };

    addCustomLayers = (map) => {
        sources.mapSources.forEach((source) => {
            let id = source[0];
            let obj = source[1];
            map.addSource(id, obj);
        });

        layers.mapLayers.forEach((layer) => {
            let obj = layer[0];
            let label = layer[1];
            map.addLayer(obj, label);
        });
    };

    updatePlace = (place) => {
        this.setState({place: place})
    };

    handleChange = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            layer: event.target.value
        }, () => {
            this.changeLayer(this.state.layer);
        });
    };

    capitalize = (str) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/gerson231294/cjbdu3v1v8hgn2sntf58bdzwm",
            center: [-74.039, -9.489],
            zoom: 4.5,
            maxZoom: 8,
            preserveDrawingBuffer: true,
            attributionControl: false
        });

        this.map.on('load', () => {

            this.addCustomLayers(this.map);
            let ID_PROV = 0;
            let click = false;
            this.map.on("click", (e) => {
                click = click !== true;
            });

            this.map.on("mousemove", (e) => {
                if (click === false) {
                    let indicadores = this.map.queryRenderedFeatures(e.point, {
                        layers: [
                            "idh-peru",
                            "poblacion",
                            "evn",
                            "pob_esc",
                            "poredad_25",
                            "ing_promed"
                        ]
                    });
                    if (indicadores.length > 0) {
                        indicadores.map((e2) => e2);
                    }
                    if (indicadores.length > 0 && this.map.getZoom() < 8.0) {
                        this.map.getSource("highlight").setData({
                            type: "FeatureCollection",
                            features: indicadores
                        });
                        if (indicadores[0].properties.ID_PROV !== ID_PROV) {
                            this.updatePlace(indicadores[0].properties);
                            ID_PROV = indicadores[0].properties.ID_PROV;
                        }
                    } else if (indicadores.length > 0 && this.map.getZoom() >= 8.0) {
                        this.map.getSource("highlight").setData({
                            type: "FeatureCollection",
                            features: indicadores
                        });
                        if (indicadores[0].properties.ID_PROV !== ID_PROV) {
                            this.updatePlace(indicadores[0].properties);
                            ID_PROV = indicadores[0].properties.ID_PROV;
                        }
                    } else {
                        this.map.getCanvas().style.cursor = "default";
                    }
                }
            });


        });
    }

    componentWillUnmount() {
        this.map.remove();
    }

    toggleDrawer = (value) => () => {
        this.setState({
            drawerOpened: value,
        });
    };

    render() {

        const {classes} = this.props;

        return (
            <Grid container
                  spacing={24}
                  className={classes.fullGrid}>
                <Grid item
                      sm={12}
                      md={8}
                      className={classes.fullGrid}>
                    <form autoComplete="off"
                          className={classes.selectButton}>
                        <Button onClick={this.handleOpen}
                                variant="raised"
                                color="primary"
                                className={classes.button}
                        >
                            {this.state.layer.name}
                        </Button>
                        <FormControl className={classes.formControl}>
                            <Select
                                open={this.state.open}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                value={this.state.layerId}
                                onChange={this.handleChange}
                            >
                                {
                                    this.state.toggleableLayers.map((layer) => {
                                        return (
                                            <MenuItem key={layer.name}
                                                      value={layer}>
                                                {layer.name}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </form>
                    <div className="mapContainer">
                        <div className="map"
                             ref={el => this.mapContainer = el}/>
                    </div>
                    <Button onClick={this.toggleDrawer(true)}
                            variant="raised"
                            color="primary"
                            className={classes.openStats}>
                        Ver Estadísticas
                    </Button>
                </Grid>
                <Grid item
                      sm={12}
                      md={4}
                      className={classes.statsGrid}>
                    <div className="indicadores">
                        {
                            !this.state.place ?
                                <div className={classes.message}>
                                    <p>Pasa el mouse por una de las regiones para visualizar sus estadisticas</p>
                                </div> :
                                <div className={classes.statsContainer}>
                                    <div className={classes.text}>
                                        <h2>MAPA DE DESIGUALDAD SOCIAL</h2>
                                        <div style={{
                                            backgroundColor: "#333",
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "100%",
                                            padding: "1rem",
                                            borderRadius: "10px",
                                            boxSizing: "border-box",

                                        }}>
                                            <h3 style={{margin: "0.5rem 0"}}>Lugar</h3>
                                            <div style={{margin: "0.5rem 0"}}>
                                                <h4 style={{display: "inline"}}>Provincia:</h4>
                                                <p style={{display: "inline"}}> {this.capitalize(this.state.place.P_NOMB)}</p>
                                            </div>
                                            <div style={{margin: "0.5rem 0"}}>
                                                <h4 style={{display: "inline"}}>Departamento: </h4>
                                                <p style={{display: "inline"}}>{this.capitalize(this.state.place.ID_DEPNOM)}</p>
                                            </div>
                                        </div>

                                        <h3 style={{marginBottom: 0}}>Estadisticas del PNUD</h3>
                                    </div>
                                    <div className={classes.root}>
                                        <Table className={classes.table}>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th"
                                                               scope="row"
                                                               className={classes.attribute}>
                                                        IDH
                                                    </TableCell>
                                                    <TableCell numeric
                                                               className={classes.qty}>
                                                        {this.state.place.IDH.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className={classes.bar}>
                                                        <BarChart data={[this.state.place.IDH, 1]}/>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th"
                                                               scope="row"
                                                               className={classes.attribute}>
                                                        Poblacion
                                                    </TableCell>
                                                    <TableCell numeric
                                                               className={classes.qty}>
                                                        {this.state.place.Poblacion}
                                                    </TableCell>
                                                    <TableCell className={classes.bar}>
                                                        <BarChart data={[this.state.place.Poblacion, 1500000]}/>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th"
                                                               scope="row"
                                                               className={classes.attribute}>
                                                        Esperanza de vida al nacer
                                                    </TableCell>
                                                    <TableCell numeric
                                                               className={classes.qty}>
                                                        {this.state.place.EVN.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className={classes.bar}>
                                                        <BarChart data={[this.state.place.EVN, 100]}/>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th"
                                                               scope="row"
                                                               className={classes.attribute}>
                                                        Pob. Escolar
                                                    </TableCell>
                                                    <TableCell numeric
                                                               className={classes.qty}>
                                                        {this.state.place.POB_ESC.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className={classes.bar}>
                                                        <BarChart data={[this.state.place.POB_ESC, 100]}/>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th"
                                                               scope="row"
                                                               className={classes.attribute}>
                                                        Pob. mayor 25
                                                    </TableCell>
                                                    <TableCell numeric
                                                               className={classes.qty}>
                                                        {this.state.place.POREDAD_25.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className={classes.bar}>
                                                        <BarChart data={[this.state.place.POREDAD_25, 100]}/>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th"
                                                               scope="row"
                                                               className={classes.attribute}>
                                                        Ingreso promedio
                                                    </TableCell>
                                                    <TableCell numeric
                                                               className={classes.qty}>
                                                        {this.state.place.ING_PROMED.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className={classes.bar}>
                                                        <BarChart data={[this.state.place.ING_PROMED, 1500]}/>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                        }
                    </div>
                </Grid>
                {this.renderDrawer(classes)}
            </Grid>

        );
    }

    renderDrawer(classes) {
        return (
            <Drawer open={this.state.drawerOpened}
                    anchor="right"
                    onClose={this.toggleDrawer(false)}
                    className={classes.drawer}
            >
                <div tabIndex={0}
                     role="button"
                     onClick={this.toggleDrawer(false)}
                     onKeyDown={this.toggleDrawer(false)}
                >
                    <div className="lateralDrawer">
                        <div className="drawerIndicators">
                            {
                                !this.state.place ?
                                    <div className={classes.message}>
                                        <p>Pasa el mouse por una de las regiones para visualizar sus estadisticas</p>
                                    </div> :
                                    <div className="drawerstats">
                                        <div className={classes.text}>
                                            <h2>Mapa de Desigualdad Social</h2>
                                            <h3>Lugar</h3>
                                            <div>
                                                <p>Distrito: {this.capitalize(this.state.place.P_NOMB)}</p>
                                                <p>Departamento: {this.capitalize(this.state.place.ID_DEPNOM)}</p>
                                            </div>
                                            <h3>Estadisticas del PNUD</h3>
                                        </div>
                                        <div className={classes.root}>
                                            <Table className={classes.table}>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell component="th"
                                                                   scope="row"
                                                                   className={classes.attribute}>
                                                            IDH
                                                        </TableCell>
                                                        <TableCell numeric
                                                                   className={classes.qty}>
                                                            {this.state.place.IDH.toFixed(2)}
                                                        </TableCell>
                                                        <TableCell className={classes.bar}>
                                                            <BarChart data={[this.state.place.IDH, 1]}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th"
                                                                   scope="row"
                                                                   className={classes.attribute}>
                                                            Poblacion
                                                        </TableCell>
                                                        <TableCell numeric
                                                                   className={classes.qty}>
                                                            {this.state.place.Poblacion}
                                                        </TableCell>
                                                        <TableCell className={classes.bar}>
                                                            <BarChart data={[this.state.place.Poblacion, 10000000]}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th"
                                                                   scope="row"
                                                                   className={classes.attribute}>
                                                            Esperanza de vida al nacer
                                                        </TableCell>
                                                        <TableCell numeric
                                                                   className={classes.qty}>
                                                            {this.state.place.EVN.toFixed(2)}
                                                        </TableCell>
                                                        <TableCell className={classes.bar}>
                                                            <BarChart data={[this.state.place.EVN, 100]}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th"
                                                                   scope="row"
                                                                   className={classes.attribute}>
                                                            Pob. Escolar
                                                        </TableCell>
                                                        <TableCell numeric
                                                                   className={classes.qty}>
                                                            {this.state.place.POB_ESC.toFixed(2)}
                                                        </TableCell>
                                                        <TableCell className={classes.bar}>
                                                            <BarChart data={[this.state.place.POB_ESC, 100]}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th"
                                                                   scope="row"
                                                                   className={classes.attribute}>
                                                            Pob. mayor 25
                                                        </TableCell>
                                                        <TableCell numeric
                                                                   className={classes.qty}>
                                                            {this.state.place.POREDAD_25.toFixed(2)}
                                                        </TableCell>
                                                        <TableCell className={classes.bar}>
                                                            <BarChart data={[this.state.place.POREDAD_25, 100]}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell component="th"
                                                                   scope="row"
                                                                   className={classes.attribute}>
                                                            Ingreso promedio
                                                        </TableCell>
                                                        <TableCell numeric
                                                                   className={classes.qty}>
                                                            {this.state.place.ING_PROMED.toFixed(2)}
                                                        </TableCell>
                                                        <TableCell className={classes.bar}>
                                                            <BarChart data={[this.state.place.ING_PROMED, 1500]}/>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>

                                        </div>
                                    </div>


                            }

                        </div>
                        <Button onClick={this.toggleDrawer(false)}
                                variant="raised"
                                color="secondary">
                            Cerrar
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default withStyles(classes)(MapContainer);
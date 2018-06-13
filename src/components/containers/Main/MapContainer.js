import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import Grid from '@material-ui/core/Grid';
import * as layers from '../../assets/layers';
import * as sources from '../../assets/sources';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const classes = theme => ({
    fullGrid: {
        width: "100%",
        height: "100%",
        padding: "0 !important",
        margin: "0 !important",
        position: "relative"
    },
    rootList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
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
        lugar: null,
        layer: {
            id: ["idh-peru"],
            name: ["Indice de Desarrollo Humano"]
        },
        open: false,
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
            console.log(layerId);
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
        this.setState({lugar: place})
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
                            ID_PROV = indicadores[0].properties.FIPS;
                        }
                    } else if (indicadores.length > 0 && this.map.getZoom() >= 8.0) {
                        this.map.getSource("highlight").setData({
                            type: "FeatureCollection",
                            features: indicadores
                        });
                        if (indicadores[0].properties.ID_PROV !== ID_PROV) {
                            this.updatePlace(indicadores[0].properties);
                            ID_PROV = indicadores[0].properties.FIPS;
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

    render() {

        const {classes} = this.props;

        return (
            <Grid container
                  spacing={24}
                  className={classes.fullGrid}>
                <Grid item
                      xs={9}
                      className={classes.fullGrid}>
                    <form autoComplete="off"
                          className={classes.selectButton}>
                        <Button onClick={this.handleOpen}
                                variant="contained"
                                color="secondary"
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
                </Grid>
                <Grid item
                      xs={3}
                      className={classes.fullGrid}>
                    <h4>Mapa de Vulnerabilidad social
                    </h4>
                    <div className="d-flex flex-column indicadores">
                        {
                            this.state.lugar !== null &&
                            <div>
                                <h3>Indicadores del PNUD</h3>
                                <div>
                                    <div> Distrito: {this.state.lugar.P_NOMB}</div>
                                    <div>Departamento: {this.state.lugar.ID_DEPNOM}</div>
                                    <div>Poblacion: {this.state.lugar.Poblacion}</div>
                                </div>
                                <h3>Estadisticas</h3>
                                <div>
                                    <div>Indice de desarrollo humano: {this.state.lugar.IDH.toFixed(2)}</div>
                                    <div>Esperanza de vida al nacer: {this.state.lugar.EVN.toFixed(2)}</div>
                                    <div>Población Escolar: {this.state.lugar.POB_ESC.toFixed(2)}</div>
                                    <div>Población mayor a 25 años: {this.state.lugar.POREDAD_25.toFixed(2)}</div>
                                    <div>Ingreso Promedio: {this.state.lugar.ING_PROMED.toFixed(2)}</div>
                                </div>
                            </div>
                        }
                    </div>
                </Grid>
            </Grid>

        );
    }
}

export default withStyles(classes)(MapContainer);
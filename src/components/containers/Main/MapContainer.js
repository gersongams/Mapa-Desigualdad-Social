import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import data from './data.json'
import layers from '../../assets/layers'
import sources from '../../assets/sources'

mapboxgl.accessToken = "pk.eyJ1IjoiZ2Vyc29uMjMxMjk0IiwiYSI6ImNqYXNycjEzYzFrc3czM3FrbnZobTNsYXIifQ.Z9xZ5zDVRYervZFNTPuiUw";

const toggleableLayers = [
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
];

export default class MapContainer extends Component {

    map;

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/gerson231294/cjbdu3v1v8hgn2sntf58bdzwm",
            center: [-74.039, -9.489],
            zoom: 5,
            maxZoom: 8,
            preserveDrawingBuffer: true,
            attributionControl: false
        });

        this.map.on('load', () => {

        });
    }

    componentWillUnmount() {
        this.map.remove();
    }



    render() {
        const style = {
            position: 'absolute',
                top: "64px",
                bottom: 0,
                width: '100%'
        };

        return (
            <div className="mapContainer">
                <div className="map" style={style} ref={el => this.mapContainer = el} className="absolute top right left bottom" />
            </div>
        );
    }
}
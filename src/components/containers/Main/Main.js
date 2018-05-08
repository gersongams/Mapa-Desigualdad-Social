import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import MapContainer from "./MapContainer";

export default class Main extends Component {

    render() {
        return (
            <div className="mainContainer">
                <Grid container spacing={24}>
                    <Grid item xs={9}>
                        <MapContainer />
                    </Grid>
                    <Grid item xs={3}>
                        <Paper >xs=3</Paper>
                    </Grid>
                </Grid>
            </div>

        );
    }
}
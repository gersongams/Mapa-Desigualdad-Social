import React, { Component } from 'react';
import Root from './components/Root';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Router} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <Root history={history}/>
            </Router>
        </MuiThemeProvider>
    );
  }
}

export default App;

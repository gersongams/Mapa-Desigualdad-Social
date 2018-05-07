import React, { Component } from 'react';
import Root from './components/Root';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Root />
      </MuiThemeProvider>
    );
  }
}

export default App;

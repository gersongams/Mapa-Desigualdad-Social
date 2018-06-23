import React, {Component} from 'react';
import Navbar from './Navbar';
import {Route} from "react-router-dom";
import Estadisticas from "./containers/Stats/Estadisticas";
import Main from "./containers/Main/Main";
import Data from "./containers/Data/Data";
import Creditos from "./containers/Creditos/Creditos";

class Root extends Component {


    render() {
        return (
            <div>
                <Navbar history={this.props.history}/>
                {this.renderRoute()}
            </div>

        );
    }

    renderRoute() {
        return (
            <div>
                <Route exact path="/" render={(route) =>
                    <Main
                        route={route}
                    />
                }
                />
                <Route exact path="/estadisticas" render={(route) =>
                    <Estadisticas
                        route={route}
                    />
                }
                />
                <Route exact path="/data" render={(route) =>
                    <Data
                        route={route}
                    />
                }
                />
                <Route exact path="/creditos" render={(route) =>
                    <Creditos
                        route={route}
                    />
                }
                />
            </div>
        )
    }
}

export default Root;

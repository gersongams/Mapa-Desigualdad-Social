import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

import * as DATA from '../../../assets/departamentos';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",

    },
    gridContainer: {
        height: "100%"
    },
    citySelectorWrapper: {},
    statsWrapper: {
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box"
    },
    buttons: {
        display: "flex",
        padding: "0 2rem",
        flexDirection: "row",
        marginBottom: "1rem",
        justifyContent: "space-between"
    },
    titleZone: {
        display: "flex",
        padding: "0 2rem",
    },
    graphWrapper: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
    },
    graphContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
    },
    cityListContainer: {
        height: '100%',
        overflow: "hidden",
        maxWidth: "100%",
        backgroundColor: "black",
    },
    cityList: {
        overflow: "hidden",
        overflowY: "scroll",
        height: "100%"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        visibility: "hidden"
    },
    statsContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }
});

class Estadisticas extends Component {

    state = {
        departamentos: [],
        selected_dep: "AMAZONAS",
        compare_with: "ANCASH",
        selected_prop: "habitantes",
        data: [],
        filteredData: [],
        dataRadar: [],
        openAttributeList: false,
        openDepartmentList: false
    };

    componentDidMount() {
        this.getDepartamentos();
    }

    getDepartamentos = () => {
        let list = [];
        this.setState({data: DATA.departamentos});
        DATA.departamentos.map(department => list.push(department.departamento));
        let departamentos = list.filter((item, pos) => {
            return list.indexOf(item) === pos;
        });
        this.setState({departamentos})
    };

    changeDepartment = (departamento) => {
        this.setState({selected_dep: departamento}, () => this.changeData());
    };

    changeProp = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({selected_prop: event.target.value}, () => this.changeData());
    };

    changeComparation = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({compare_with: event.target.value}, () => this.changeData());
    };

    changeData = () => {
        let department1 = this.state.data.filter((item) => item.departamento === this.state.selected_dep);
        let department2 = this.state.data.filter((item) => item.departamento === this.state.compare_with);

        this.setState({filteredData: this.getDataOfYear(department1, department2, this.state.selected_prop)})
    };

    normalize = (val, max, min) => {
        return ((val - min) / (max - min) * 100);
    };

getDataOfYear = (arr1, arr2, selected_prop) => {
    let res = [];
    let dataRadar = [];
    const years = [2003, 2007, 2010, 2011, 2012];

    years.map((anio) => {
        let department1 = arr1.find(item => item.anio === anio);
        let department2 = arr2.find(item => item.anio === anio);

        if (anio === 2012) {
            dataRadar = [
                {
                    attr: "POB",
                    [this.state.selected_dep]: this.normalize(department1.habitantes, 9395149, 102174),
                    [this.state.compare_with]: this.normalize(department2.habitantes, 9395149, 102174),
                    fullMark: 100
                },
                {
                    attr: "IDH",
                    [this.state.selected_dep]: this.normalize(department1.idh, 0.634, 0.1725),
                    [this.state.compare_with]: this.normalize(department2.idh, 0.634, 0.1725),
                    fullMark: 100
                },
                {
                    attr: "EVN",
                    [this.state.selected_dep]: this.normalize(department1.evn, 79.22, 64.09),
                    [this.state.compare_with]: this.normalize(department2.evn, 79.22, 64.09),
                    fullMark: 100
                },
                {
                    attr: "POB_ESC",
                    [this.state.selected_dep]: this.normalize(department1.pob_esc, 88.27, 29.75),
                    [this.state.compare_with]: this.normalize(department2.pob_esc, 88.27, 29.75),
                    fullMark: 100
                },
                {
                    attr: "ANIOS_EDU",
                    [this.state.selected_dep]: this.normalize(department1.anios_educ, 11.31, 4.88),
                    [this.state.compare_with]: this.normalize(department2.anios_educ, 11.31, 4.88),
                    fullMark: 100
                },
                {
                    attr: "ING_PROM",
                    [this.state.selected_dep]: this.normalize(department1.ing_prom, 1042.5, 131.9),
                    [this.state.compare_with]: this.normalize(department2.ing_prom, 1042.5, 131.9),
                    fullMark: 100
                }
            ];
            this.setState({dataRadar: dataRadar});
        }

        res.push({
            year: anio,
            selected_prop: selected_prop,
            [this.state.selected_dep]: department1[selected_prop],
            [this.state.compare_with]: department2[selected_prop]
        });
    });
    return res;
};

    closeAttributeList = () => {
        this.setState({openAttributeList: false});
    };

    openAttributeList = () => {
        this.setState({openAttributeList: true});
    };

    closeDepartmentList = () => {
        this.setState({openDepartmentList: false});
    };

    openDepartmentList = () => {
        this.setState({openDepartmentList: true});
    };


    render() {
        const {classes} = this.props;
        const {departamentos} = this.state;

        const ATRIBUTOS = [
            {
                code: "habitantes",
                name: "Nro. de habitantes"
            },
            {
                code: "idh",
                name: "Indice de desarrollo humano"
            },
            {
                code: "evn",
                name: "Esperanza de vida al nacer"
            },
            {
                code: "pob_esc",
                name: "% de poblacion escolarizada"
            },
            {
                code: "anios_educ",
                name: "Años de educacion"
            },
            {
                code: "ing_prom",
                name: "Ingreso promedio"
            },
        ];

        return (
            <div className={classes.root}>
                <Grid container
                      className={classes.gridContainer}
                      spacing={0}>
                    <Grid item
                          className={classes.citySelectorWrapper}
                          md={3}>
                        <div className={classes.cityListContainer}>
                            <List
                                component="ul"
                                className={classes.cityList}>
                                {
                                    departamentos.map(departamento => (
                                        <ListItem
                                            button
                                            className={classes.departamento}
                                            onClick={event => this.changeDepartment(departamento)}
                                            key={departamento}>
                                            <ListItemText primary={departamento}/>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                    </Grid>
                    <Grid item
                          className={classes.statsWrapper}
                          md={9}>
                        <div className={classes.statsContainer}>
                            <div className={classes.titleZone}>
                                <h3>Estadisticas de {this.state.selected_dep}</h3>
                            </div>
                            <div className={classes.buttons}>
                                <form autoComplete="off"
                                      className={classes.selectButton}>
                                    <Button onClick={this.openAttributeList}
                                            variant="raised"
                                            color="primary">
                                        Atributo: {this.state.selected_prop}
                                    </Button>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            open={this.state.openAttributeList}
                                            onClose={this.closeAttributeList}
                                            onOpen={this.openAttributeList}
                                            value={this.state.selected_prop}
                                            onChange={this.changeProp}>
                                            {
                                                ATRIBUTOS.map((atributo) => {
                                                    return (
                                                        <MenuItem key={atributo.code}
                                                                  value={atributo.code}>
                                                            {atributo.name}
                                                        </MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </form>
                                <form autoComplete="off"
                                      className={classes.selectButton}>
                                    <Button onClick={this.openDepartmentList}
                                            variant="raised"
                                            color="primary">
                                        Comparar con: {this.state.compare_with}
                                    </Button>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            open={this.state.openDepartmentList}
                                            onClose={this.closeDepartmentList}
                                            onOpen={this.openDepartmentList}
                                            value={this.state.compare_with}
                                            onChange={this.changeComparation}
                                        >
                                            {
                                                this.state.departamentos.map((departamento) => {
                                                    return (
                                                        <MenuItem key={departamento}
                                                                  value={departamento}>
                                                            {departamento}
                                                        </MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </form>
                            </div>
                            <div className={classes.graphWrapper}>
                                <Grid container
                                      className={classes.graphContainer}
                                      spacing={0}>
                                    <Grid item
                                          md={6}
                                          xs={12}>
                                        <ResponsiveContainer>
                                            <LineChart width={600}
                                                       height={300}
                                                       data={this.state.filteredData}
                                                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                                <XAxis dataKey="year"/>
                                                <YAxis unit={(this.state.selected_prop === "idh" || this.state.selected_prop === "pob_esc") ? "%" : ""}/>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <Tooltip/>
                                                <Legend/>
                                                <Line type="monotone"
                                                      dataKey={this.state.selected_dep}
                                                      stroke="#0B1D51"
                                                      activeDot={{r: 8}}/>
                                                <Line type="monotone"
                                                      dataKey={this.state.compare_with}
                                                      stroke="#fe9922"/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Grid>
                                    <Grid item
                                          md={6}
                                          xs={12}>
                                        <ResponsiveContainer>
<BarChart width={600}
          height={300}
          data={this.state.filteredData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis dataKey="year"/>
    <YAxis unit={(this.state.selected_prop === "idh" || this.state.selected_prop === "pob_esc") ? "%" : ""}/>
    <Tooltip/>
    <Legend/>
    <Bar dataKey={this.state.selected_dep}
         fill="#0B1D51"/>
    <Bar dataKey={this.state.compare_with}
         fill="#fe9922"/>
</BarChart>
                                        </ResponsiveContainer>
                                    </Grid>
                                    <Grid item
                                          md={6}
                                          xs={12}>
                                        <ResponsiveContainer>
<AreaChart width={600}
           height={400}
           data={this.state.filteredData}
           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis dataKey="year"/>
    <YAxis/>
    <Tooltip/>
    <Area type='monotone'
          dataKey={this.state.selected_dep}
          stackId="1"
          stroke='#8884d8'
          fill='#0B1D51'/>
    <Area type='monotone'
          dataKey={this.state.compare_with}
          stackId="1"
          stroke='#82ca9d'
          fill='#fe9922'/>
</AreaChart>
                                        </ResponsiveContainer>
                                    </Grid>
                                    <Grid item
                                          md={6}
                                          xs={12}>
                                        <ResponsiveContainer>
<RadarChart outerRadius={90}
            width={600}
            height={300}
            data={this.state.dataRadar}>
    <PolarGrid/>
    <PolarAngleAxis dataKey="attr"/>
    <PolarRadiusAxis angle={90}
                     domain={[0, 100]}/>
    <Radar name={this.state.selected_dep}
           dataKey={this.state.selected_dep}
           stroke="#0B1D51"
           fill="#0B1D51"
           fillOpacity={0.6}/>
    <Radar name={this.state.compare_with}
           dataKey={this.state.compare_with}
           stroke="#fe9922"
           fill="#fe9922"
           fillOpacity={0.6}/>
    <Legend/>
</RadarChart>
                                        </ResponsiveContainer>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

export default withStyles(styles)(Estadisticas);

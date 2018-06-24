import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHeader from "./TableHeader";
import * as ListaDepartamentos from '../../../assets/departamentos';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
        justifyContent: "space-between"
    },
    graphWrapper: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%"
    },
    graphContainer: {
        height: "100%",
        width: "100%"
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
    tableRoot: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1024,
    },
    tableWrapper: {
        overflowX: 'auto',
        padding: '0 1rem'
    },
    tableContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "2rem"
    }
});

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

class Data extends Component {

    state = {
        departamentos: [],
        selectedYear: '2012',
        order: 'asc',
        selected_dep: "AMAZONAS",
        orderBy: 'distrito',
        selected: [],
        filteredData: [],
        data: [],
        page: 0,
        rowsPerPage: 7,
        openYea: false,
        distritosData: []
    };

    componentDidMount() {

        this.getDepartamentos();

        const API = 'https://api-distritos-peru.herokuapp.com/';
        fetch(API, {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'json'},
        })
            .then(response => response.json())
            .then(data => this.setState({distritosData: data}, () => this.getData()));
    }

    getDepartamentos = () => {
        let list = [];
        ListaDepartamentos.departamentos.map(department => list.push(department.departamento));
        let departamentos = list.filter((item, pos) => {
            return list.indexOf(item) === pos;
        });
        this.setState({departamentos})
    };

    getData = () => {
        let filteredData;
        this.setState({page: 0});

        filteredData = this.state.distritosData.filter(item => {
            return item.DEPARTAMENTO === this.state.selected_dep;
        });

        filteredData = filteredData.map((data) => {
            return {
                DEPARTAMENTO: data.DEPARTAMENTO,
                year: this.state.selectedYear,
                distrito: data.distrito,
                habitantes: data['habitantes' + "_" + this.state.selectedYear],
                idh: data['idh' + "_" + this.state.selectedYear],
                evn: data['evn' + "_" + this.state.selectedYear],
                pob_esc: data['pob_esc' + "_" + this.state.selectedYear],
                anios_educ: data['anios_educ' + "_" + this.state.selectedYear],
                ing_prom: data['ing_prom' + "_" + this.state.selectedYear]
            }
        });
        this.setState({data: filteredData});
    };

    changeDepartment = (departamento) => {
        this.setState({selected_dep: departamento}, () => this.getData());
    };

    changeYear = (event) => {
        this.setState({selectedYear: event.target.value}, () => this.getData());
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    closeYearList = () => {
        this.setState({openYea: false});
    };

    openYearList = () => {
        this.setState({openYea: true});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes} = this.props;
        const {departamentos} = this.state;
        const years = ['2012', '2011', '2010', '2007', '2003'];
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
                        <div className={classes.tableContainer}>
                            <div className={classes.titleZone}>
                                <h3>Datos por distrito del departamento de: {this.state.selected_dep}</h3>
                                <form autoComplete="off"
                                      className={classes.selectButton}>
                                    <Button onClick={this.openYearList}
                                            variant="raised"
                                            color="primary">
                                        AÑO: {this.state.selectedYear}
                                    </Button>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            open={this.state.openYea}
                                            onClose={this.closeYearList}
                                            onOpen={this.openYearList}
                                            value={this.state.selectedYear}
                                            onChange={this.changeYear}>
                                            {
                                                years.map((anio) => {
                                                    return (
                                                        <MenuItem key={anio}
                                                                  value={anio}>
                                                            {anio}
                                                        </MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </form>
                            </div>
                            <Paper className={classes.tableRoot}>
                                <div className={classes.tableWrapper}>
                                    <Table className={classes.table}
                                           aria-labelledby="tableTitle">
                                        <TableHeader
                                            order={order}
                                            orderBy={orderBy}
                                            onRequestSort={this.handleRequestSort}
                                        />
                                        <TableBody>
                                            {data
                                                .sort(getSorting(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(distrito => {
                                                    const isSelected = this.isSelected(distrito.id);
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            aria-checked={isSelected}
                                                            tabIndex={-1}
                                                            key={distrito.distrito}
                                                            selected={isSelected}
                                                        >
                                                            <TableCell component="th"
                                                                       scope="row"
                                                                       padding="none">
                                                                {distrito.distrito}
                                                            </TableCell>
                                                            <TableCell numeric>{distrito.habitantes}</TableCell>
                                                            <TableCell numeric>{distrito.idh}</TableCell>
                                                            <TableCell numeric>{distrito.evn}</TableCell>
                                                            <TableCell numeric>{distrito.pob_esc}</TableCell>
                                                            <TableCell numeric>{distrito.anios_educ}</TableCell>
                                                            <TableCell numeric>{distrito.ing_prom}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{height: 49 * emptyRows}}>
                                                    <TableCell colSpan={7}/>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                <TablePagination
                                    component="div"
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                    }}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    onChangePage={this.handleChangePage}
                                />
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default withStyles(styles)(Data);

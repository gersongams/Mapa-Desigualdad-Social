import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

const columnData = [
    {id: 'distrito', numeric: false, disablePadding: true, label: 'Distrito'},
    {id: 'habitantes', numeric: true, disablePadding: false, label: 'Habitantes'},
    {id: 'idh', numeric: true, disablePadding: false, label: 'Indice de desarrollo humano'},
    {id: 'evn', numeric: true, disablePadding: false, label: 'Esperanza de vida al nacer'},
    {id: 'pob_esc', numeric: true, disablePadding: false, label: '% Pob. Escolarizada'},
    {id: 'anios_educ', numeric: true, disablePadding: false, label: 'Años de educacion'},
    {id: 'ing_prom', numeric: true, disablePadding: false, label: 'Ingreso promedio per capita'},
];

class TableHeader extends Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles)(TableHeader);

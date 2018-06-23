import React, {Component} from 'react';
import {scaleLinear} from 'd3-scale';
import {max} from 'd3-array';
import {select} from 'd3-selection';
import {transition} from 'd3-transition';


class BarChart extends Component {
    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount() {
        this.createBarChart();
    }

    componentDidUpdate() {
        this.createBarChart();
    }

    createBarChart() {

        const barwidth = 120;
        const barheight = 15;
        const color_range = [
            '#ffffd9',
            '#edf8b1',
            '#c7e9b4',
            '#7fcdbb',
            '#41b6c4',
            '#1d91c0',
            '#225ea8',
            '#253494',
            '#081d58'
        ];

        const node = this.node;
        const dataMax = max(this.props.data);
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, barwidth]);

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect');


        select(node)
            .selectAll('rect')
            .attr('width',0)
            .transition()
            .duration(300)
            .style('fill', '#fe9922')
            .attr('rx', 6)
            .attr('ry', 6)
            .attr('y', 0)
            .attr('height', barheight)
            .attr('width', yScale(this.props.data[0]));
    }

    render() {
        return (
            <svg ref={node => this.node = node}
                 width={120}
                 height={15}/>
        )
    }
}

export default BarChart
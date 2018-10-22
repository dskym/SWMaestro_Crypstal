import React, {Component} from 'react';
import PropTypes from "prop-types";

import {format} from "d3-format";

import {ChartCanvas, Chart} from "react-stockcharts";
import {
    BarSeries,
    CandlestickSeries,
} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";
import {discontinuousTimeScaleProvider} from "react-stockcharts/lib/scale";
import {fitWidth} from "react-stockcharts/lib/helper";
import {last} from "react-stockcharts/lib/utils";

import {tsvParse} from "d3-dsv";
import {timeParse} from "d3-time-format";

function parseData(parse) {
    return function (d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;

        return d;
    };
}

const parseDate = timeParse("%Y-%m-%d");

function getData() {
    const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
        .then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)));

    return promiseMSFT;
}

class LiveChart extends Component {
    componentDidMount() {
        getData().then(data => {
            this.setState({data});
        });
    }

    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }

        const {data: initialData} = this.state;
        const {width, ratio} = this.props;

        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = xScaleProvider(initialData);

        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 100)]);
        const xExtents = [start, end];

        return (
            <ChartCanvas height={600}
                         ratio={ratio}
                         width={width}
                         margin={{left: 50, right: 50, top: 10, bottom: 30}}
                         type='svg'
                         seriesName="MSFT"
                         data={data}
                         xScale={xScale}
                         xAccessor={xAccessor}
                         displayXAccessor={displayXAccessor}
                         xExtents={xExtents}
            >

                <Chart id={1} height={400} yExtents={d => [d.high, d.low]}>
                    <YAxis axisAt="right" orient="right" ticks={5}/>
                    <XAxis axisAt="bottom" orient="bottom" showTicks={false}/>
                    <CandlestickSeries/>
                </Chart>
                <Chart id={2} origin={(w, h) => [0, h - 150]} height={150} yExtents={d => d.volume}>
                    <XAxis axisAt="bottom" orient="bottom"/>
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>
                    <BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"}/>
                </Chart>
            </ChartCanvas>
        );
    }
}

LiveChart.propTypes = {
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
};

LiveChart = fitWidth(LiveChart);

export default LiveChart;
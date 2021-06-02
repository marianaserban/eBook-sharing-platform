import React, { Component } from 'react'
import Chart from "react-apexcharts";

export default class LineChart extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: ['Dec','Jan', 'Feb', "Mar", 'April', 'June']
            },
            colors:['#38D39F']

          },
          series: [
            {
              name: "Evolution of uploads",
              data: [30, 40, 45, 50, 49, 60,50]
            }
          ]
        };
      }
    render() {
        return (
            <div>
                 <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="500"
            />
            </div>
        )
    }
}

import React, { Component } from 'react'
import Chart from "react-apexcharts";
import Axios from 'axios'
const API_URL = "http://localhost:8080/";

export default class PieChart extends Component {
    constructor(props){
        super(props)
        this.state={
            series:this.props.series,

            // series: [3,
            //   2,
            //   4,
            //   1,
            //   1,
            //   2,
            //   3,
            //   2,
            //   3,
            //   2,
            //   1,
            //   1],
            options: {
              chart: {
                width: 680,
                type: 'pie',
             
            },
              labels: ['Arts and Photography', 'Biographies and Memoirs', 'Business and Money', 'Computers and Technology', 'Education and Teaching','Cookbooks, Food and Wine','History','Literature and Fiction','Mystery, Thriller and Suspense','Religion and Spirituality','Romance','Science and Math'],
              colors:['#5f0f40', '#9a031e', '#fb8b24','#0f4c5c','#e36414','#011627','#2ec4b6','#e71d36','#fbff12','#8ac926','#a26769','#10451d'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 400
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
        }
    }
    

    render() {
        return (
            <div>
              <Chart options={this.state.options} series={this.state.series} type="pie" width={680}/>
            </div>
        )
    }
}

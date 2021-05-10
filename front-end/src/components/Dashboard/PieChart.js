import React, { Component } from 'react'
import Chart from "react-apexcharts";
import Axios from 'axios'
const API_URL = "http://localhost:8080/";

export default class PieChart extends Component {
    constructor(props){
        super(props)
        this.state={
            series: [3,
              2,
              4,
              1,
              1,
              2,
              3,
              2,
              3,
              2,
              1,
              1],
            options: {
              chart: {
                width: 680,
                type: 'pie',
             
            },
              labels: ['Arts and Photography', 'Biographies and Memoirs', 'Business and Money', 'Computers and Technology', 'Education and Teaching','Cookbooks, Food and Wine','History','Literature and Fiction','Mystery, Thriller and Suspense','Religion and Spirituality','Romance','Science and Math'],
              colors:['#264653', '#2a9d8f', '#e9c46a','#f4a261','#e76f51','#3d5a80','#98c1d9','#ffc300','#4f000b','#86bbd8','#0ead69','#0f80aa'],
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

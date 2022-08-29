import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "../style/chart.css";
import Chart from "react-apexcharts";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
// import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip, Legend, Line, CartesianGrid } from "recharts"
import TempatureGraph from './TempatureGraph'
function Graph(tepmrature) {
  let Temp=tepmrature.tepmrature;
//   let data=manual.manual;
// let daily=null;
// // console.log(data)
//  const [tepmrature, setTemprature] = useState([])
const day = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
//   useEffect(() => {
//     let arr = []
//     if (daily == null) {
//       data.map((ele, i) => {
//         ele.temp.name = day[i]
//         ele.temp.index = i
//         arr.push(ele.temp)
//       })
//       setTemprature([...arr])
//     }
    // else {
    //   daily.map((ele, i) => {
    //     ele.temp.name = day[i]
    //     ele.temp.index = i
    //     arr.push(ele.temp)
    //   })
    //   setTemprature([...arr])
    // }
    
    
  // }, [data])
  
  const obj = {
    options: {
        chart: {
            type: "area",
            zoom: {
                enabled: false,
            }
        },
        dataLabels: {
            enabled: false,
        },
        
        xaxis: {
          type: 'datetime',
        },
        stroke: {
            curve: "smooth",
            width: 6
        },
        xaxis: {
            lines: { show: true},
            categories: day,
        },
        yaxis: {
            show: true
        },
        grid: {
            show: true
        },
        colors: ['rgb(21, 149, 247)'],
        legend: {
          horizontalAlign: 'left'
        },
    },
    
    series: [
        {
            name: "Temprature",
            data: [Temp.min, Temp.max, Temp.eve, Temp.night]
        },
    ]
}

  return (
    <div className="flowchart">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={obj.options}
                        series={obj.series}
                        type="area"
                        height="200px"
                        margin="auto"
                    />
                </div>
            </div>
        </div>
  )
}
export default Graph


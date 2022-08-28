import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "../style/chart.css"
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
const Graphs = (daily) => {
    console.log(daily)
let manual=daily
  const [tepmrature, setTemprature] = useState([])
  const day = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
  useEffect(() => {
   
  }, [daily, manual])
  // console.log('tepmrature', tepmrature);
  return (
    <div className="Flowchart">
      {
        tepmrature.length != 0 && <TempatureGraph tepmrature={tepmrature}></TempatureGraph>
      }
    </div>
  )
}
export default Graphs


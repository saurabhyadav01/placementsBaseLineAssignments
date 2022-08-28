import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import React, { useEffect } from "react";
import axios from "axios";
import TempatureGraph from "./components/TempatureGraph";
function App() {
useEffect(()=>
{
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    let lat=position.coords.latitude;
    let lon=position.coords.latitude;
    //https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minute,hourly&appid=6ff1648d640ad3c6260db1ab0fecd897&units=metric
  });
},[])


  return (
    <React.Fragment>
      <Home />
      
    </React.Fragment>
  );
}

export default App;

import { hover } from "@testing-library/user-event/dist/hover";
import React, { useEffect, useState } from "react";
import TempatureGraph from "./TempatureGraph";
import Graph from "./AreaGraph"
import Loader from "./Loder";
import axios from "axios";
import ReactDOM from 'react-dom'


const Home = () => {
  const [weekData, setWeekdata] = useState([]);
  const [cityData, setcityData] = useState({});
  const [searchData,setSearchData]=useState({});
  const [icon, setIcon] = useState();
  const [cityName, setCityName] = useState("");
  const [displays,setDisplay]=useState("");
 console.log(searchData)
  let dailyData;
  let data;
  function handleChange(city) {
    let currentCity=city.target.value
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      // let lat=position.coords.latitude;
      // let lon=position.coords.latitude;
    });
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=6ff1648d640ad3c6260db1ab0fecd897&units=metric`)
     .then(function (res) {
    //console.log(res.data);
    setSearchData({...res.data})
   // setCityName(e.target.value);
   setDisplay("")
   });
  }
  async function getWheteher(cityName) {
    
     
    try {

      let city = cityName ||"delhi" ;
       setCityName(city)
  
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ff1648d640ad3c6260db1ab0fecd897&units=metric`
      );
      data = await res.json();
    

      let lon = data.coord.lon;
      let lat = data.coord.lat;
       // make another request for week data
      var res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minute,hourly&appid=6ff1648d640ad3c6260db1ab0fecd897&units=metric`
      );
      var data2 = await res2.json();
      dailyData = data2.daily;
      //  console.log(dailyData)
      setWeekdata([...dailyData]);
      //console.log(data.main)
      setcityData({ ...dailyData[0] });
    } catch (e) {
      console.log("Error" + e);
    }
  }

  let day = weekData.map(function (elem, index) {

    let img = elem.weather[0].icon;
  //set seven day data
    // let day=["sunday","Mpnday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    if (index <= 7) {
      let date = new Date(elem.dt * 1000);
      let day;
      // console.log(date.getDay());
      if (date.getDay() === 0) {
        return "Sun";
      } else if (date.getDay() === 1) {
        return "Mon";
      } else if (date.getDay() == 2) {
        return "Tue";
      } else if (date.getDay() == 3) {
        return "Wed";
      } else if (date.getDay() == 4) {
        return "Thr";
      } else if (date.getDay() === 5) {
        return "Fri";
      } else if (date.getDay() === 6) {
        return "Sat";
      }
     
    }
  });
  //click handel on seven day data
  const handleClick = (data) => {
   
    setcityData({ ...data });
    setDisplay(true)
  };

  const handleSearchData=(state)=>
  {
    getWheteher(state);
    setDisplay("none")
  }

  let temp = cityData.temp?.day;
  let allTemp=cityData.temp || "";
  let humidity = cityData.humidity;
  let pressure = cityData.pressure;
  var date = new Date(cityData.sunrise * 1000);
  var hourse = date.getHours();
  var minute = date.getMinutes();
  var time = hourse + ":" + minute;

  var date = new Date(cityData.sunset * 1000);
  var hourse = date.getHours();
  var minute = date.getMinutes();
  var time2 = hourse + ":" + minute;

  let img = cityData.weather?.icon || "10d";
  let icons = `http://openweathermap.org/img/wn/${img}@2x.png`;

 //current location
 
 //current locarion
 let state=searchData?.name ||"";
 let countryName=searchData.sys?.country ||"";
let display=true
  useEffect(() => {
    getWheteher(cityName);
    setCityName("")
   
  }, [cityName]);
  return (
    <React.Fragment>
      <div className="container">
        <div className="container-fluid">
          <div className="main-container">
            <div className="search-box">
              <img className="location" style={{width:"25px",position:"absolute",background:"transpart",top: "8%", left: "25%"}} src="https://cdn-icons-png.flaticon.com/128/3179/3179068.png" alt="a" />
              <input 
                style={{paddingLeft:"30px"}}
                type="text"
               placeholder="Search City"
                className="search-botton"
                onChange={handleChange}
                
              />
               <img src="https://cdn-icons-png.flaticon.com/128/3482/3482644.png" className="search-icon" 
               style={{ position: "absolute", top: "8%", left: "72%" ,width:"30px"}}
              ></img>{" "}
              <div className="search-display" style={{display:`${displays}`,position:"absolute",width:"51%",border:"1px solid gray",margin:"auto",marginLeft:"1.5%"}} onClick={()=>
              {
                
                handleSearchData(state)
               
              }}>
               <h3 style={{fontSize:"20px",display:`${displays}`}}>{state}{"  "}{countryName}</h3>
              </div>
            </div>
            <div className="week-Box">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  margin: "auto",
                }}
              >
                {weekData.map((elem, i) => (
                  <div
                    className="week-Box-list-item"
                    style={{ textAlign: "center", margin: "auto" }}
                    onClick={() => {
                      handleClick(elem);
                    }}
                    key={i}
                  >
                    <h5>{day[i]}</h5>
                    <h5>{Math.floor(elem.temp.min)} °{Math.floor(elem.temp.max)}°</h5>

                    <img
                      src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}
                      alt=""
                    />
                    <h5>{elem.weather[0].main}</h5>
                  </div>
                ))}
              </div>
            </div>
            <div className="wheater-details-box">
              <div style={{ display: "flex", margin: "3%", fontSize: "25px" }}>
                <h1 style={{}}>{temp} °C</h1>
                <img src={icons} alt="" />
              </div>
              <div
                className="wheater-details-box-graph"
                style={{ height: "20%", border: "red" }}
              >
                <Graph tepmrature={allTemp} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "2%",
                  margin: "1%",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(230,251,255)",
                    width: "46%",
                    padding: "2%",
                    borderRadius: "1%",
                  }}
                >
                  <h4>Pressure</h4>
                  <p>{pressure}hpa</p>
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(230,251,255)",
                    width: "45%",
                    padding: "2%",
                    borderRadius: "1%",
                  }}
                >
                  <h4>Humidity</h4>
                  <p>{humidity}%</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2%",
                  margin: "1%",
                }}
              >
                <div style={{ padding: "2%", borderRadius: "1%" }}>
                  <h4>Sunrise</h4>
                  <p>{time}:Am</p>
                </div>
                <div style={{ padding: "2%", borderRadius: "1%" }}>
                  <h4>SunSet</h4>
                  <p>{time}:Pm</p>
                </div>
              </div>
              <div>
         
                <TempatureGraph tepmrature={allTemp} />
              </div>
            </div>
          </div>
        </div>
        <i class="fa-solid fa-location-dot">sddd</i>
      </div>
    </React.Fragment>
  );
};

export default Home;

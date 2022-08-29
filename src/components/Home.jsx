import { hover } from "@testing-library/user-event/dist/hover";
import React, { useEffect, useState } from "react";
import TempatureGraph from "./TempatureGraph";
import Graph from "./AreaGraph"
import Loader from "./Loder"
import ReactDOM from 'react-dom'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />


const Home = () => {
  const [weekData, setWeekdata] = useState([]);
  const [cityData, setcityData] = useState({});
  const [icon, setIcon] = useState();
  const [cityName, setCityName] = useState("");
  let dailyData;
  let data;
  function handleChange(e) {
    setCityName(e.target.value);
  }
  async function getWheteher(cityName) {
    try {
      let city = cityName || "delhi";
       setCityName(city)
      console.log(city);
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ff1648d640ad3c6260db1ab0fecd897&units=metric`
      );
      data = await res.json();
    

      let lon = data.coord.lon;
      let lat = data.coord.lat;

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
  // console.log(cityData)

  //let link = `http://openweathermap.org/img/wn/${img}@2x.png`;
  let day = weekData.map(function (elem, index) {
    //console.log(elem.weather.icon)
    //console.log(elem.weather[0].icon);
    let img = elem.weather[0].icon;

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
      let link = `http://openweathermap.org/img/wn/${img}@2x.png`;
    }
  });
  const handleClick = (data) => {
    // console.log(data.humidity)
    setcityData({ ...data });
  };
  // console.log(cityData)
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
  // console.log(img)

  useEffect(() => {
    getWheteher(cityName);
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
                    <h5>{elem.temp.min} °</h5>

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

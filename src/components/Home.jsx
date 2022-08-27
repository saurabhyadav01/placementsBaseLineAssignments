import React, { useEffect, useState } from "react";

const Home = () => {
  const [weekData, setWeekdata] = useState([]);
  var dailyData;
  async function getWheteher() {
    try {
      var city = "delhi";
      var res =
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
        &appid=e26bd68cd33e49a7fb77b5b1d1be03ad&units=metric`);
      var data = await res.json();

      var lon = data.coord.lon;
      var lat = data.coord.lat;
      // console.log(x,y)
      var res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=e26bd68cd33e49a7fb77b5b1d1be03ad&units=metric`
      );
      var data2 = await res2.json();
      dailyData = data2.daily;
      //  weekDataDisplay(dailyData)
      setWeekdata([...dailyData]);
    } catch (e) {
      console.log("Error" + e);
    }
  }
  console.log(weekData);

    var day= weekData.map(function (elem, index) {
    //console.log(elem.weather.icon)
    console.log(elem.weather[0].icon);
    var img = elem.weather[0].icon;

    // var day=["sunday","Mpnday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    if (index <= 6) {
      var date = new Date(elem.dt * 1000);
      var day;
      console.log(date.getDay());
      if (date.getDay() === 0) {
        return "Sun";
      } else if (date.getDay() === 1) {
        return "Mon";
      } else if (date.getDay() == 2) {
        return "Tue";
      } else if (date.getDay() == 3) {
        return "Wed";
      } else if (date.getDay() == 4) {
        return "Thrusday";
      } else if (date.getDay() === 5) {
        return "Friday";
      } else if (date.getDay() === 6) {
        return "Saturday";
      }
      var link = `http://openweathermap.org/img/wn/${img}@2x.png`;
      console.log(link)
    }
  });
console.log(day)
  useEffect(() => {
    getWheteher();
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <div className="container-fluid">
          <div className="main-container">
            <div className="search-box">
              <input type="text" className="search-botton" />
            </div>
            <div className="week-Box">
            
                <div style={{display:"flex"}}>
                
                    {
                        weekData.map((elem,i)=>(
                            
                          <div>
                            <h5>{day[i]}</h5>
                              <h5>{elem.temp.min} °</h5>
                           
                             <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png` }alt="" />
                              <h5>{elem.weather[0].main}</h5>
                          </div>
                        ))
                    }
                </div>
            </div>
            <div className="wheater-details-box"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

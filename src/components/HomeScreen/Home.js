import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Home.scoped.css";
import Banner from "../banner/Banner";
import CurrentWeather from "./CurrentWeather";
import SixteenDays from "../SixteenDays/sixteenDays";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>;

export const MyContext = React.createContext();
function Home() {
  function convertTime(time) {
    let hours = time.slice(0, 2); //24hr fromat
    var AmOrPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; //if first logic is true second will printed
    let minutes = time.slice(3, 5); //returns the minuts
    var finaltime = hours + (minutes != "00" && ": " + minutes) + " " + AmOrPm;
    return finaltime;
  }
  const [result, setResult] = useState({});
  const [input, setInput] = useState();
  const [flag, setFlag] = useState("home");
  const [data, setData] = useState({});
  const pageOne = useRef(null);
  const pageTwo = useRef(null);
  const URL = "abed8df2d8070f78c69910037f3a0675";
  console.log("current flag is", flag);
  useEffect(() => {
    if (input != null) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&limit=1&appid=${URL}`)
        .then((response) => {
          const res = response.data.list[0];
          setData({
            icon_code: res.weather[0].icon,
            temp: parseInt(res.main.temp),
            app_temp: parseInt(res.main.feels_like),
            wind_spd: res.wind.speed,
            description: res.weather[0].description,
            humidity: res.main.humidity,
            sealevel: res.main.sea_level,
            visibility:res.visibility,
           
            isDay: res.sys.pod,
          });
          // console.log("iconcode is", data.icon_code);
        });
    }
  }, [input]);

  let temp = [];
  let localTime = [];
  let windSpeed = [];
  let count = 0;
  useEffect(() => {
    if (input != null) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${input}&limit=5&appid=${URL}`
        )
        .then((response) => {
          for (const data of response.data.list) {
            count++;
            if(count==12) {break}
           
            temp.push(parseInt(data.main.temp-273));
            localTime.push(convertTime(data.dt_txt.slice(11, 18)));
            windSpeed.push(data.wind.speed);
          }
          // console.log("inside Effect");
          

          setResult({
            isReady: true,
            temperature: temp,
            time: localTime,
            windSpeed: windSpeed,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [input]);
  function handleSearch(e) {
    e.preventDefault();
    console.log("e is", e);
    return setInput(e.target.elements[0].value);
  }
  // button

  function showPageOne() {
    pageOne.current.style.left = "0";
    pageTwo.current.style.left = "100%";
    pageTwo.current.style.display = "none";
    pageOne.current.style.transition = "all .3s";

    setFlag("home");
  }
  function showPageTwo() {
    pageTwo.current.style.left = "0";
    pageTwo.current.style.left = "0";
    pageOne.current.style.left = "-100%";
    pageOne.current.style.transition = "none";
    pageTwo.current.style.display = "block";

    setFlag("current");
  }
  return (
    <React.Fragment>
      <meta
        name="viewport"
        content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
      />
      <div
        className={
          data.isDay == "n" ? "nav-container night" : "nav-container day"
        }
      >
        <div className="searchBar-container">
          <form onSubmit={handleSearch}>
            <input className="search" type="text" placeholder="Cty Name" />
            <input type="submit" className="icons8-search" />
          </form>
        </div>
        <div className="btn-container">
          <button
            className={`btn ${flag == "home" ? "home" : ""}`}
            onClick={showPageOne}
            type="button"
          >
            Today
          </button>
          <button
            className={`btn ${flag == "current" ? "current" : ""}`}
            onClick={showPageTwo}
            type="button"
          >
            8 Days Forecast
          </button>
        </div>
      </div>

      <div className="swiper-container">
        <MyContext.Provider value={[result, data]}>
          <div ref={pageOne} className="page-one">
            <Banner />
            <CurrentWeather />
          </div>

          <div ref={pageTwo} className="page-two">
            <SixteenDays input={input} />
          </div>
        </MyContext.Provider>
      </div>
    </React.Fragment>
  );
}

export default Home;

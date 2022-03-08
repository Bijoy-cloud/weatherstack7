import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sixteenDays.scoped.css";

function SixteenDays(props) {
  const input = props.input;
  const [data, setData] = useState({});
  const [lat, setlat] = useState();
  const [lon, setlon] = useState();
  const URL = "abed8df2d8070f78c69910037f3a0675";
  useEffect(() => {
    if (input != null) {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${URL}`
        )
        .then((res) => {
          setlat(res.data[0].lat);
          setlon(res.data[0].lon);
        });
    }
  }, [input]);
  useEffect(() => {
    if (lon != null) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&appid=abed8df2d8070f78c69910037f3a0675`
        )
        .then((response) => {
          let temp = [];
          let icon = [];
          // let datetime = [];
          let des = [];

          for (const res of response.data.daily) {
            icon.push(res.weather[0].icon);
            temp.push(parseInt(res.temp.eve - 273));
            // datetime.push(res.datetime);
            des.push(res.weather[0].description);
          }
          setData({
            icon_code: icon,
            temp: temp,
            // datetime: datetime,
            isReady: true,
            description: des,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [lat, lon]);

  // Function gets date and count days to add to passed date
  function addDays(dateTime, count_days = 0) {
    let date = new Date(
      new Date(dateTime).setDate(dateTime.getDate() + count_days)
    );
    return date.toUTCString().slice(0, 16);
  }
  const today = new Date();

  return (
    <React.Fragment>
      {data.isReady &&
        data.icon_code.map((x, index) => (
          <div className="container-wrapper" key={index}>
            <div className="container flex">
              <div className="container-one ">
                <h3>{addDays(today, index)}</h3>
                <p>
                  {data.description[index]}, {data.temp[index]}°C
                </p>
              </div>
              <div className="container-two ">
                <img
                  src={`http://openweathermap.org/img/wn/${
                    data.icon_code[index]
                  }@2x.png`}
                />
              </div>
            </div>
            <hr />
          </div>
        ))}
    </React.Fragment>
  );
}

export default SixteenDays;

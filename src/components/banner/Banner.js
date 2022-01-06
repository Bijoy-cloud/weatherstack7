import React, { useContext, useEffect, useState } from "react";
import Styles from "./Banner.scoped.css";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { MyContext } from "../HomeScreen/Home";

function Banner() {
  const [context, data] = useContext(MyContext);
  const [chartData, setChartData] = useState({});
  const date = true;

  //  console.log('currently',context.time

  useEffect(() => {
    if (context.isReady) {
      console.log("time is", context.time);
      console.log("temperature is", context.temperature);
      setChartData({
        labels: context.time,
        maintainAspectRatio: false,
        datasets: [
          {
            label: "Hourly Temperature",
            data: context.temperature,
            backgroundColor: "#1e81b0",
            barThickness: 40,
            maxBarThickness: 50,
            barPercentage: 0.1,
            borderWidth: 2,
            datalabels: {
              color: "white",
              anchor: "end",
              align: "top",
              formatter: Math.round,
              font: {
                weight: "bold",
              },
            },
          },
        ],
      });
    }
  }, [context]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: { text: "Hourly Forcast", display: false },
    scales: {
      yAxes: {
        beginAtZero: true,
        display: false,
        grid: { display: false },
        ticks: {
          display: false,
        },
      },
      xAxes: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
    },
  };
  return (
    <div
      className={
        data.isDay == "n" ? "banner-container night" : "banner-container day"
      }
    >
      {data.temp && (
        <div className="current-weather-container">
          <div className="container one">
            <p
              style={{
                color: "#ff3d5f",
              }}
            >
              {date}
            </p>
            <h3>Air index is {data.air_index}</h3>
            <h1>{data.temp}°</h1>
            <p>feels like {data.app_temp}</p>
          </div>
          <div className="container two">
            <img
              src={`https://www.weatherbit.io/static/img/icons/${
                data.icon_code
              }.png`}
            />
            <h1>{data.description}</h1>
          </div>
        </div>
      )}
      <div className="chartWrapper">
        <div className="chartAreaWrapper">
          {context.isReady && (
            <Line
              data={chartData}
              plugins={[ChartDataLabels]}
              options={options}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;

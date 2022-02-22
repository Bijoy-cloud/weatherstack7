import React, { useState } from "react";
import { useContext, useEffect } from "react";

import styles from "./CurrentWeather.scoped.css";
// import { Bar } from 'react-chartjs-2'
import ChartDataLabels from "chartjs-plugin-datalabels";
import { MyContext } from "./Home";
import { Bar, Line } from "react-chartjs-2";

function CurrentWeather() {
  const [context, data] = useContext(MyContext);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    if (context.isReady) {
      // console.log("time is", context.time);
      // console.log("temperature is", context.windSpeed);
      setChartData({
        labels: context.time,
        maintainAspectRatio: false,
        datasets: [
          {
            label: "Hourly Wind Speed",
            data: context.windSpeed,
            backgroundColor: "#1e81b0",
            barThickness: 40,
            maxBarThickness: 50,
            barPercentage: 0.1,
            borderWidth: 2,
            datalabels: {
              color: "blue",
              anchor: "end",
              align: "top",
              formatter: function(value) {
                return parseFloat(value).toFixed(2); //funtion to take two decimal vaalue
              },
              font: {
                weight: "bold",
              },
            },
          },
        ],
      });
    }
  }, [context]);

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    title: { text: "Hourly Forcast", display: false },
    scales: {
      yAxes: {
        beginAtZero: true,

        display: false,
      },
      x: {
        display: true,
        grid: { display: false },
        ticks: {
          display: true,
        },
      },
    },
  };
  return (
    <React.Fragment>
      {context.isReady && (
        <div className="container">
          <h2>Current details</h2>
          <table>
            <tbody>
              <tr>
                <td>Humidity</td>
                <td className="right">{data.humidity}%</td>
              </tr>
              <tr>
                <td>sealevel</td>
                <td>{data.sealevel}m</td>
              </tr>
              <tr>
                <td>visibility</td>
                <td>{data.visibility}m</td>
              </tr>
              <tr>
                <td>Weather Description</td>
                <td>{data.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <hr />
      {context.isReady && (
        <div className="chartWrapper">
          <h2 className="wind-heading">Hourly Wind Data</h2>
          <div className="chartAreaWrapper">
            <Bar
              data={chartData}
              plugins={[ChartDataLabels]}
              options={option}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default CurrentWeather;

import React from "react";
import { Radar } from "react-chartjs-2";

const getData = statisticsAverage => {
  return {
    labels: ["Drive", "Backhand", "Serve", "Volley", "Resistance"],
    datasets: [
      {
        label: "Personal Statistics",
        data: [
          statisticsAverage.drive.length === 0
            ? 5
            : statisticsAverage.drive.reduce((a, b) => a + b) /
              statisticsAverage.drive.length,
          statisticsAverage.backhand.length === 0
            ? 5
            : statisticsAverage.backhand.reduce((a, b) => a + b) /
              statisticsAverage.backhand.length,
          statisticsAverage.serve.length === 0
            ? 5
            : statisticsAverage.serve.reduce((a, b) => a + b) /
              statisticsAverage.serve.length,
          statisticsAverage.volley.length === 0
            ? 5
            : statisticsAverage.volley.reduce((a, b) => a + b) /
              statisticsAverage.volley.length,
          statisticsAverage.resistance.length === 0
            ? 5
            : statisticsAverage.resistance.reduce((a, b) => a + b) /
              statisticsAverage.resistance.length
        ],
        borderColor: "rgba(20, 29, 222, 1)",
        backgroundColor: "rgba(20, 29, 222, 0.2)"
      },
      {
        label: ["  Media"],
        data: [1, 2, 5, 8, 4],
        borderColor: "rgba(255, 99, 132, 0.2)",
        backgroundColor: "rgba(255, 99, 132, 0.2)"
      }
    ],
    options: {
      position: "left",
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: "bottom",
      },
      scale: {
        ticks: {
          display: false,
          max: 10,
          min: 0
        }
      }
    }
  };
};

const options = {
  position: "bottom",
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: "bottom",
    labels: {}
  },
  scale: {
    ticks: {
      display: true,
      max: 10,
      min: 0
    }
  }
};
export default function RadarChart({ statisticsAverage }) {
  return (
    <div className="chart-container">
      <Radar data={getData(statisticsAverage)} legend={options} />
    </div>
  );
}

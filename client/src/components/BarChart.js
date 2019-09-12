import React from "react";
import { Bar } from "react-chartjs-2";

const getData = (matches, user) => {
  return {
    data: {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      datasets: [
        {
          data: [
            showPlayedGames(matches, user, 0),
            showPlayedGames(matches, user, 1),
            showPlayedGames(matches, user, 2),
            showPlayedGames(matches, user, 3),
            showPlayedGames(matches, user, 4),
            showPlayedGames(matches, user, 5),
            showPlayedGames(matches, user, 6),
            showPlayedGames(matches, user, 7),
            showPlayedGames(matches, user, 8),
            showPlayedGames(matches, user, 9),
            showPlayedGames(matches, user, 10),
            showPlayedGames(matches, user, 11)
          ],
          label: "Partidos Jugados",
          borderColor: "#3e95cd",
          backgroundColor: "#3e95cd"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: false,
            ticks: {
              suggestedMin: 0
            }
          }
        ]
      },
      title: {
        display: true
      }
    }
  };
};

const showPlayedGames = (matches, user, x) => {
  return matches.filter(match => {
    let date = new Date(match.date);
    if (match._author.id == user.id && date.getMonth() == x) {
      return match;
    }
  }).length;
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        display: false,
        ticks: {
          suggestedMin: 0
        }
      }
    ]
  },
  title: {
    display: true
  }
};
export default function BarChart({ matches, user }) {
  return (
    <div className="chart-container">
      <Radar data={getData(matches, user)} legend={options} />
    </div>
  );
}

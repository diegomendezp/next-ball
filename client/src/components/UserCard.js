import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Radar } from "react-chartjs-2";
import RadarChart from "./RadarChart";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "0 auto 5% auto"
    },
    [theme.breakpoints.up("sm")]: {
      width: "45%",
      margin: "0 0 5% 0"
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
      margin: "0 0 2% 0"
    }
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  avatar: {
    width: 150,
    height: 150,
    [theme.breakpoints.down("sm")]: {
      width: 80,
      height: 80
    },
    [theme.breakpoints.up("sm")]: {
      width: 100,
      height: 100
    },
    [theme.breakpoints.up("md")]: {
      width: 120,
      height: 120
    },
    margin: "0 auto",
    marginBottom: "5%"
  }
}));

export default function UserCard({ image, username, statisticsAverage, wonMatches, lostMatches }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Avatar alt="username-icon" src={image} className={classes.avatar} />
          <Typography component="h5" variant="h5">
            {username}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Games Played: {wonMatches + lostMatches }
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Won: {wonMatches}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Win rate: {parseFloat((wonMatches / (wonMatches + lostMatches)).toFixed(2)) * 100? parseFloat((wonMatches / (wonMatches + lostMatches)).toFixed(2)) * 100:0}
          </Typography>
          <RadarChart statisticsAverage={statisticsAverage}></RadarChart>
        </CardContent>
      </div>
    </Card>
  );
}

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ReactMapGL, { Marker } from "react-map-gl";

import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    maxWidth: 400
  },
  details: {
    display: "flex",
    flexDirection: "column"
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
    width: 60,
    height: 60,
    margin: "0 auto"
  },
  marker: {
    height: "20px",
    width: "20px",
    backgroundColor: "#3f51b5",
    borderRadius: "50%",
    display: "inline-block"
  }
}));

const dateFormat = (d, month, formal = false) => {
  let y = d.getFullYear().toString();
  let m = month ? month : (d.getMonth() + 1).toString();
  let date = d.getDate().toString();
  date.length === 1 && (date = "0" + date);
  m.length === 1 && (m = "0" + m);

  return formal ? `${m}-${date}-${y}` : `${date}-${m}-${y}`;
};

export default function MediaControlCard({ _author, date, hour, location }) {
  const [lat, lng] = location.coordinates;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Avatar
            alt="username-icon"
            src={_author.image}
            className={classes.avatar}
          />
          <Typography component="h5" variant="h5">
            Created by {_author.username}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Date: {dateFormat(new Date(date))} - Hour: {hour}
          </Typography>
        </CardContent>
        <div className={classes.controls}></div>
      </div>
      <ReactMapGL
        width={"100%"}
        height={"auto"}
        latitude={lat}
        longitude={lng}
        zoom={5}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={viewport => {
          const { width, height, latitude, longitude, zoom } = viewport;
          // Optionally call `setState` and use the state to update the map.
        }}
      >
        <Marker
          latitude={lat}
          longitude={lng}
          offsetLeft={-20}
          offsetTop={-10}
          className={classes.marker}
        ></Marker>
      </ReactMapGL>
    </Card>
  );
}

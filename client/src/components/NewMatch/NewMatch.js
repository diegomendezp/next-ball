import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MapGL, { Marker, GeolocateControl } from "react-map-gl";
import Geocoder from 'react-mapbox-gl-geocoder';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 300
    },
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  marker: {
    height: "20px",
    width: "20px",
    backgroundColor: "#3f51b5",
    borderRadius: "50%",
    display: "inline-block"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export default function NewMatch() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [hour, setHour] = React.useState("18:00");
  const [date, setDate] = React.useState(Date.now().toString());
  const [point, setPoint] = React.useState({ longitude: -3.70325, latitude: 40.4167});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const queryParams = {
    country: "es"
  };
  const _onSelected = (viewport, item) => {
    console.log(item)
    const [ longitude, latitude ] = item.geometry.coordinates;
    setPoint({longitude, latitude})
  };

  const { longitude, latitude } = point;

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Container style={modalStyle} className={classes.paper}>
          <Typography component="h2" variant="h5">
            Create match
          </Typography>
          <form validate autoComplete="off" className={classes.container}>
            <TextField
              label="Time:"
              className={classes.textField}
              value={hour}
              required
              autoFocus
              onChange={e => setHour(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300
              }}
              type="time"
              id="time"
            />
            <TextField
              label="Date:"
              className={classes.textField}
              value={date}
              required
              autoFocus
              onChange={e => setDate(e.target.value)}
              margin="normal"
              type="date"
              id="date"
            />
            <Geocoder
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              onSelected={_onSelected}
              hideOnSelect={true}
              queryParams={queryParams}
            />
            <MapGL
              width={"100%"}
              height={450}
              latitude={latitude}
              longitude={longitude}
              zoom={12}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              mapStyle="mapbox://styles/mapbox/dark-v9"
            >
              {/* <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              /> */}
              <Marker
                latitude={latitude}
                longitude={longitude}
                className={classes.marker}
              ></Marker>
            </MapGL>
          </form>
        </Container>
      </Modal>
      <Fab
        aria-label={"New-Match"}
        className={classes.fab}
        color={"primary"}
        onClick={() => handleOpen()}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

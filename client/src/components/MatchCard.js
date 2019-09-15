import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactMapGL, { Marker } from "react-map-gl";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import { wsConn } from "..";

function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0 auto",
      marginBottom: "5%"
    },
    [theme.breakpoints.up("sm")]: {
      width: "45%",
      margin: "0",
      marginBottom: "5%"
    },
    [theme.breakpoints.up("md")]: {
      width: "45%",
      margin: "0",
      marginBottom: "5%"
    }
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "50%"
  },
  content: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
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
    margin: "0 auto",
    marginBottom: "5%"
  },
  marker: {
    height: "20px",
    width: "20px",
    backgroundColor: "#3f51b5",
    borderRadius: "50%",
    display: "inline-block"
  },
  paper: {
    position: "absolute",
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
    border: "2px solid #000",
    backgroundColor: theme.palette.primary,
    boxShadow: theme.shadows[5],
    outline: 'none'
  },
  button: {
    margin: "0 auto",
    textAlign: "center",
    alignSelf: "center",
    marginTop: "5%"
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

export default function MediaControlCard({ _author, date, hour, location, id, user }) {
  const [lat, lng] = location.coordinates;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const challenge = (player, otherPlayer, match) => {
    wsConn.sendChallange(player, otherPlayer.id, match, "challenge")
  }

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Avatar
            alt="username-icon"
            src={_author.image}
            className={classes.avatar}
          />
          <Typography component="h6" variant="h6">
            Created by: {_author.username}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Date: {dateFormat(new Date(date))} - Hour: {hour}
          </Typography>
          <Button className={classes.button} onClick={e => challenge(user, _author, id)}>Challenge</Button>
        </CardContent>
      </div>
      <ReactMapGL
        width={"50%"}
        height={"auto"}
        latitude={lat}
        longitude={lng}
        zoom={12}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClick={() => handleOpen()}
      >
        <Marker
          latitude={lat}
          longitude={lng}
          className={classes.marker}
        ></Marker>
      </ReactMapGL>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <ReactMapGL
              width={"100%"}
              height={450}
              latitude={lat}
              longitude={lng}
              zoom={12}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            >
              <Marker
                latitude={lat}
                longitude={lng}
                className={classes.marker}
              ></Marker>
            </ReactMapGL>
          </div>
        </Modal>
    </Card>
  );
}

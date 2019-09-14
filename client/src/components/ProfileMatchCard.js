import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ReactMapGL, { Marker } from "react-map-gl";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import MatchService from "../services/MatchService";
import { wsConn } from "..";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import MenuItem from '@material-ui/core/MenuItem';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    borderRadius:"2px",
    outline:"none"
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
      width: "100%",
      margin: "0",
      marginBottom: "5%"
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
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
      width: 300
    },
    border: "1px solid #000",
    backgroundColor: theme.palette.primary,
    boxShadow: theme.shadows[5],
    outline: "none",
    borderRadius:"2px"
  },
  buttonsContainer: {
    display: "flex",
    marginTop: "5%"
  },
  paper: {
    position: "absolute",
    width: 600,
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: 300,
      height: "500px"
    },
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "scroll",
    borderRadius:"2px"
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  select: {
    margin: "5% 0"
  },
  cancelButton: {
    marginRight: "5%"
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

const getOponent = players => {
  return players.map((player, i) =>
    i === 0 ? `${player.username} –` : `${player.username}`
  );
};

export default function ProfileMatchCard({
  _author,
  date,
  hour,
  location,
  players,
  id,
  endMatch = false,
  handleDelete = null
}) {
  const [lat, lng] = location.coordinates;
  const classes = useStyles();
  const theme = useTheme();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [winner, setWinner] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleAbort = e => {
    e.preventDefault();
    handleClose2();
  };

  const handleDeletAux = id => {
    handleDelete(id);
  };

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

          <Typography variant="subtitle1" color="textSecondary">
            Oponents: {getOponent(players)}
          </Typography>
          {endMatch && (
            <div className={classes.buttonsContainer}>
              <Button className={classes.button} onClick={e => handleOpen2()}>
                Finish Match
              </Button>
              <Button
                className={classes.button}
                onClick={e => handleDeletAux(id)}
              >
                Delete Match
              </Button>
            </div>
          )}
          {endMatch && players.length > 1 && (
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open2}
              onClose={handleClose2}
            >
              <Container style={modalStyle} className={classes.paper}>
                <Typography component="h2" variant="h5">
                  Select Match Winner
                </Typography>
                <form validate autoComplete="off" className={classes.container}>
                  <div className={classes.select}>
                    <Select
                      onChange={e => setWinner(e.target.value)}
                      label="Match winner: "
                      name="Winner"
                      inputProps={{
                        name: "winner",
                        id: "winner",
                        'aria-label': 'age'
                      }}

                      value={winner}
                    >
                      <MenuItem value={players[0].username}>
                        {players[0].username}
                      </MenuItem>
                      <MenuItem value={players[1].username}>
                        {players[1].username}
                      </MenuItem>
                    </Select>
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.cancelButton}
                    onClick={e => handleAbort(e)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.cancelButton}
                    onClick={e => console.log("Modal")}
                  >
                    Aceptar
                  </Button>
                </form>
              </Container>
            </Modal>
          )}
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

import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MatchService from "../../services/MatchService";
import { wsConn } from "../..";

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
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: 300,
      height: "500px",
    },
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "scroll"
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

export default function FinishMatch() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [winner, setWinner ] = React.useState("")



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createMatch = (e)=> {
    const { longitude, latitude, place } = point;
    e.preventDefault();
    MatchService.newMatch({ hour, date, lat:latitude, lng:longitude })
    .then(() => {
      wsConn.sendMatch()
      handleClose()
    })
  }
  const handleAbort = (e) => {
    e.preventDefault();
    handleClose();
  }


  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose2}
      >
        <Container style={modalStyle} className={classes.paper}>
          <Typography component="h2" variant="h5">
            Finish match
          </Typography>
          <form validate autoComplete="off" className={classes.container}>
          <Select
          value={values.age}
          onChange={e => setWinner(e.target.value)}
          inputProps={{
            name: 'winner',
            id: 'winner',
          }}
          value={winner}
        />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={e => handleAbort(e)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => createMatch(e)}
            >
              Aceptar
            </Button>
          </form>
        </Container>
      </Modal>
    </div>
  );
}

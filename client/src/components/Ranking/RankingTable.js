import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const displayRows = users => {
  return users.map((user, i) => (
    <StyledTableRow key={i}>
      <StyledTableCell component="th" scope="row">
        {i + 1}
      </StyledTableCell>
      <StyledTableCell align="left">{user.username}</StyledTableCell>
      <StyledTableCell align="left">{user.points}</StyledTableCell>
    </StyledTableRow>
  ));
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

export default function RankingTable({ users }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>Ranking</StyledTableCell>
            <StyledTableCell align="left">Player</StyledTableCell>
            <StyledTableCell align="left">Points</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{displayRows(users)}</TableBody>
      </Table>
    </Paper>
  );
}

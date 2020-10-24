import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLog } from '../../redux/actions/userActions';
// MUI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
}));

const DailyIntakeLog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userLog } = useSelector((state) => ({
    userLog: state.log.userLog,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getUserLog());
  };

  // [
  //   {
  //       "_id": "5f6266c6b15ef517241c7e9e",
  //       "userId": "5f6266a6b15ef517241c7e9d",
  //       "date": "2020-09-14T21:55:58.506Z",
  //       "fat": 50,
  //       "saturates": 10,
  //       "fibre": 35,
  //       "sugars": 70,
  //       "cholesterol": 150,
  //       "sodium": 200,
  //       "createdAt": "2020-09-16T19:25:58.118Z",
  //       "updatedAt": "2020-09-16T19:25:58.118Z",
  //       "__v": 0
  //   }
  // ]

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align='right'>Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align='right'>Saturates&nbsp;(g)</StyledTableCell>
            <StyledTableCell align='right'>Fibre&nbsp;(g)</StyledTableCell>
            <StyledTableCell align='right'>Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align='right'>Sugars&nbsp;(g)</StyledTableCell>
            <StyledTableCell align='right'>
              Cholesterol&nbsp;(mg)
            </StyledTableCell>
            <StyledTableCell align='right'>Sodium&nbsp;(mg)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userLog.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component='th' scope='row'>
                {row.date.substr(0, 9)}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.fat}</StyledTableCell>
              <StyledTableCell align='right'>{row.saturates}</StyledTableCell>
              <StyledTableCell align='right'>{row.fibre}</StyledTableCell>
              <StyledTableCell align='right'>{row.sugars}</StyledTableCell>
              <StyledTableCell align='right'>{row.cholesterol}</StyledTableCell>
              <StyledTableCell align='right'>{row.sodium}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleSubmit}>HERE</Button>
    </TableContainer>
  );
};

export default DailyIntakeLog;

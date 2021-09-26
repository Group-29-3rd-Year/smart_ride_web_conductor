import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
//import Axios from 'axios';
import React, { Fragment, useState ,Component, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import 'react-toastify/dist/ReactToastify.css';
import '../style/passengerlist.css';

toast.configure();

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


      const useStyles = makeStyles({
        table: {
          maxWidth: 400,
        },

        cell: {
            width: 200,
        }
      });

const PassengerList = () => {

    var id = localStorage.getItem('user_id');
    var bus_id = localStorage.getItem('bus_id');
    console.log(bus_id);

    const [passList, setPassList] = useState([]);


    const body = {bus_id};
    async function getPassengers() {

        const response = await fetch("http://localhost:5000/conductor/passengerlist", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
        })

        const list = await response.json();
        setPassList(list);
        console.log(list);
        
    };


    useEffect(() => {
        getPassengers();
    }, []);

    const classes = useStyles();

    return(
        <Fragment>
            <div className="body">
                <Header />
                <SideNav />

                <div className="view_conductor_container">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className={classes.cell} align="center">Passenger ID</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Name</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {passList.map((row) => (
                                    <StyledTableRow key={row.pid}>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.pid}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.uname}</StyledTableCell>
                
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Fragment>
    )
};

export default PassengerList;
import React, { Fragment, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { makeStyles } from '@material-ui/core/styles';
import './sidenav.css';
import { Button } from '@material-ui/core';

import {
    BrowserRouter as Router, 
    Switch, 
    Route,
    Link, 
    Redirect,
    useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    
    submit: {
      width: '140px',
      height: '40px',
      fontSize: 18,
      fontWeight: 700,
      borderRadius: 20,
    },
}));

const SideNav = ({ setAuth }) => {

    const classes = useStyles();

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")   //check logout
        setAuth(false);

        history.push("../smartride/login")
    }

    let history = useHistory();

    return (
        <Fragment> 
            <div className="side-menu">

                {/* <div className="top-section">
                    <div className="logo">
                        <img  />
                    </div>
                </div> */}
                {/* <div className="search-controller">
                    <button className="search-btn">
                        <SearchIcon />
                    </button>
                    
                    <input type="text" placeholder="Search"/> 
                </div>

                <div className="divider"></div> */}

                <div className="main-menu">
                    <ul>

                        <li>
                            <a className="menu-item" onClick={() => {history.push("../smartride/dashboard");}}>
                                <div className="menu-icon">
                                    <TableChartIcon />
                                </div>
                                Dashboard
                            </a>
                        </li>

                        <li>
                            <a className="menu-item" onClick={() => {history.push("../passengerlist");}}>
                                <div className="menu-icon">
                                    <PeopleAltIcon />
                                </div>
                                Passenger List
                            </a>
                        </li>

                        <li>
                        <a className="menu-item" onClick={() => {history.push("../stat");}}>
                                <div className="menu-icon">
                                    <EqualizerIcon />
                                </div>
                                Stats
                            </a>
                        </li>

                        
                    </ul>
                </div>
                
                <div className="side-menu-footer">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"              //// have to check path
                        className={classes.submit}
                        onClick={() => {history.push("../profile");}}
                    >
                        Profile
                    </Button>
                    {/* <button onClick={ e => logout(e)}>Log Out</button> */}
                </div>
            </div>
        </Fragment>
        
    );
};

export default SideNav;
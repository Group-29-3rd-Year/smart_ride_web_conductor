import React, { Fragment, useState,useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { makeStyles } from '@material-ui/core/styles';
import './sidenav.css';
import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

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

const SideNav = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {
      
      const response  = await fetch("http://localhost:5000/conductor/smartride/is-verify", {
        method: "GET",
        headers: { token : localStorage.token }
      });

      const parseRes = await response.json()

      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  })

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
                        <PersonIcon />
                        Profile
                    </Button>
                    {/* <button onClick={ e => logout(e)}>Log Out</button> */}
                </div>

                <div className="side-menu-footer">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"              //// have to check path
                        className={classes.submit}
                        onClick={ () => {
                            localStorage.removeItem("token");
                            setAuth(false);
                            window.location.reload();
                            history.push("../smartride/login");
                        }}
                    >
                        Logout
                    </Button>
                    {/* <button onClick={ e => logout(e)}>Log Out</button> */}
                </div>
            </div>
        </Fragment>
        
    );
};

export default SideNav;
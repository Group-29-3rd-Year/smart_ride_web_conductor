import React, {Fragment, useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import '../style/stat.css';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

//conductor stat
const useStyles = makeStyles((theme) => ({
    
    person: {
      width: '60px',
      height: '50px',
    },
}));

const Stat = () => {

    const classes = useStyles();

    var id = localStorage.getItem('user_id');

    const [passengerCount, setPassengerCount] = useState([]);
    const [todayIncome, seTodayIncome] = useState([]);
    const [conName, setConName] = useState([]);
    const [busName, setBusName] = useState([]);
    const [prevIncome, setPrevIncome] = useState([]);
 
    async function getTodayPassengerCount() {
        const res = await fetch("http://localhost:5000/conductor/stat");

        const listCount = await res.json();

        setPassengerCount(listCount);
        //console.log(listCount);
    }

    async function getTodayIncome() {
        const res = await fetch("http://localhost:5000/conductor/stat/todayincome");

        const tincome = await res.json();

        seTodayIncome(tincome);
        console.log(tincome);
    }

    async function getPrevIncome() {
        const res = await fetch("http://localhost:5000/conductor/stat/previousincome");

        const previncome = await res.json();

        setPrevIncome(previncome);
        console.log(previncome);
    }


    if( (todayIncome == 'Nan' || null) && (prevIncome == 'Nan' || null) ) {
        todayIncome = 0;
        prevIncome = 0;
        var diff = todayIncome - prevIncome;
        console.log(diff);

        var precentage = '0';
        console.log("percentage " +  precentage);
    }
    else if( (todayIncome == 'Nan' || null) && prevIncome > 0 ) {
        todayIncome = 0;
        var diff = todayIncome - prevIncome;
        console.log(diff);

        var precentage = parseInt((diff/prevIncome)*100, 10);
        console.log("percentage " +  precentage);
    }
    else if( todayIncome > 0 && (prevIncome == 'Nan' || null) ) {

        var precentage = '100';
        console.log("percentage " +  precentage);
    }
    else if( todayIncome > 0 && prevIncome > 0 ) {
        var diff = todayIncome - prevIncome;
        console.log(diff);

        var precentage = parseInt((diff/prevIncome)*100, 10);
        console.log("percentage " +  precentage);
    }



    const body = {id};
    async function getConductName() {
        const res = await fetch("http://localhost:5000/conductor/stat/conname", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        });

        const con = await res.json();

        setConName(con);
        //console.log(con);
    }

    async function getBusName() {
        const res = await fetch("http://localhost:5000/conductor/stat/busname", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        });

        const bus = await res.json();

        setBusName(bus);
        //console.log(bus);
    }

    useEffect(() => {
        getTodayPassengerCount();
        getTodayIncome();
        getBusName();
        getConductName();
        getPrevIncome();
    }, []);

    return(
        <Fragment>
            <div className="body">
               
               <Header />
               <SideNav />
               
               <div className="form">
                    <center>
                        <div className="form-box">
                            <div className="box tcase1">
                                <center>
                                    <h2>Passenger Count</h2>
                                    <h3>{passengerCount}{<EmojiPeopleIcon className={classes.person}/>}</h3>
                                </center>
                                
                            </div>
                            <div className="box tcase2">
                                <center>
                                    <h2>Today Income</h2>
                                    <h3>{'Rs. '}{todayIncome}</h3>
                                </center>
                                
                            </div>
                            <div className="box tcase3">
                                <center>
                                    <h2>Rate</h2>
                                    <h3>{precentage}{'%'}</h3>
                                </center>
                            </div>
                        </div>
                        <div className="form-bottom">
                            <h1>{conName}</h1>
                            <h1>{busName}</h1>
                        </div>
                    </center>
                </div>
                
               
           </div>
        </Fragment>
    )
}


export default Stat;
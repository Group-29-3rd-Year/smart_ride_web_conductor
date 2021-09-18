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

    const [passengerCount, setPassengerCount] = useState([]);
    const [todayIncome, seTodayIncome] = useState([]);

 
    async function getTodayPassengerCount() {
        const res = await fetch("http://localhost:5000/conductor/stat");

        const listCount = await res.json();

        setPassengerCount(listCount);
        console.log(listCount);
    }

    async function getTodayIncome() {
        const res = await fetch("http://localhost:5000/conductor/stat/todayincome");

        const tincome = await res.json();

        seTodayIncome(tincome);
        console.log(tincome);
    }

    useEffect(() => {
        getTodayPassengerCount();
        getTodayIncome();
    }, []);

    return(
        <Fragment>
            <div className="body">
               
               <Header />
               <SideNav />
               
               <div className="form">
                    <center>
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
                                <h2>Credits</h2>
                                <h3>12345</h3>
                            </center>
                            
                        </div>
                    </center>
                </div>
               
           </div>
        </Fragment>
    )
}


export default Stat;
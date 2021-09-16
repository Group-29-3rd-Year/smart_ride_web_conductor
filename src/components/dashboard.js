import { Button, Grid } from '@material-ui/core';
import React, {Fragment, useState, useEffect} from 'react';
import './style/dashboard.css';
import Header from './widget/header';
import SideNav from './widget/sidenav';
import useGeoLocation from './widget/getCurLocation';

const Dashboard = ({ setAuth }) => {

    const[ newLat, setNewLat] = useState([]);
    const[ newLng, setNewLng] = useState([]);

    var id = localStorage.getItem('user_id');
    console.log(id);

    const location = useGeoLocation();
    //console.log(JSON.stringify(location));
    var latitude = JSON.stringify(location.coordinates['lat']);
    var longitude = JSON.stringify(location.coordinates['lng']);
    console.log(latitude);
    console.log(longitude);

   

    async function updateBusLocation(latitude, longitude) {
        const body = {latitude, longitude};
        console.log(latitude);
        console.log(longitude);
        console.log(id);

        const updateDet = await fetch(`http://localhost:5000/conductor/smartride/update/${id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
        })

        const parseRes = await updateDet.json();
        console.log(parseRes);

        // if(parseRes) {
        //     window.location.reload();
        // }
        // else {
        //     console.log(parseRes);
        // }
    }

    useEffect(() => {
        //setTimeout( updateBusLocation(), 5000);
        updateBusLocation();
    },[]);
    
    return(
        <Fragment>
            <div className="body">
               
                <Header />
                <SideNav />
                
                {/* <div>
                {location.loaded
                    ? JSON.stringify(location)
                    : "Location data not available yet."}
                </div> */}
                
            </div>
        </Fragment>
    );
};


export default Dashboard;
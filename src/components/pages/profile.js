import { toast } from 'react-toastify';
import React, { Fragment, useState ,Component , useEffect} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from '../widget/sidenav';
import Header from '../widget/header';
import '../style/profile.css';


const Profile = (props) => {

    const[prevName, setPrevName] = useState([]);
    const[prevNumber, setPrevNumber] = useState([]);
    const[prevEmail, setPrevEmail] = useState([]);

    var id = localStorage.getItem('user_id');
    console.log(id);

    const body = {id};

    async function getData() {
        const res = await fetch("http://localhost:5000/conductor/smartride/getdata", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        });
  
        const dataArray = await res.json();
  
        setPrevName(dataArray['user_name']);
        setPrevNumber(dataArray['phone_number']);
        setPrevEmail(dataArray['user_email']);
    }




    useEffect(() => {
        getData();
    }, []);

    return(

        <Fragment>
            <div className="body">

                <Header />
                <SideNav />

                <div className="profile_container">
                    <h2>Profile</h2>

                    <form >
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Name"
                                    defaultValue={prevName}
                                    required
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    name="number"
                                    placeholder="Number"
                                    defaultValue={prevNumber}
                                    required
                                    readOnly
                                />
                               
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={prevEmail}
                                    required
                                    readOnly
                                />
                                
                            </div>
                        </div>

                       
                        
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;
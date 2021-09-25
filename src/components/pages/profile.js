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
        const res = await fetch("https://smartride-backend.herokuapp.com/conductor/smartride/getdata", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        });
  
        const dataArray = await res.json();
  
        setPrevName(dataArray['user_name']);
        setPrevNumber(dataArray['phone_number']);
        setPrevEmail(dataArray['user_email']);
    }


    const [inputs, setInputs] = useState({
        
        name: "",
        number: "",
        email: "",
        
    });

    const {name, number, email} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    };


    const onSubmitForm = async (e) => {
        e.preventDefault()
        
        try {
            
            const body = {name, number, email};

            const response = await fetch(`https://smartride-backend.herokuapp.com/conductor/smartride/updateprofile/${id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            if(parseRes){
                //console.log(parseRes);
                window.location.reload();
                toast.success("Updated Successfully");
                
            }else{
                
                toast.error(parseRes)
            }


        } catch (err) {
            console.error(err.message);
        }
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

                    <form onSubmit={onSubmitForm}>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    id={name}
                                    placeholder="Name"
                                    defaultValue={prevName}
                                    onChange = {e => onChange(e)}
                                    required
                                    
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    name="number"
                                    id={number}
                                    placeholder="Number"
                                    defaultValue={prevNumber}
                                    onChange = {e => onChange(e)}
                                    required
                                    
                                />
                               
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email"
                                    id={email}
                                    placeholder="Email"
                                    defaultValue={prevEmail}
                                    onChange = {e => onChange(e)}
                                    required
                                    
                                />
                                
                            </div>
                        </div>

                        <div className="btn_box">
                            <button className="bus_update_btn">Update</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;
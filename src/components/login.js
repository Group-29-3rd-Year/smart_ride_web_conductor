import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
// import Button from '@material-ui/core/Button';
//import { makeStyles } from '@material-ui/core/styles';
import './style/login.css';
import 'react-toastify/dist/ReactToastify.css';
import useGeoLocation from './widget/getCurLocation';

toast.configure();

// const useStyles = makeStyles((theme) => ({
    
//     link: {
//         margin: 5,
//     },
// }));

const Login = ({ setAuth }) => {

    const location = useGeoLocation();
    //console.log(JSON.stringify(location));
    var latitude = JSON.stringify(location.coordinates['lat']);
    var longitude = JSON.stringify(location.coordinates['lng']);
    console.log(latitude);
    console.log(longitude);
    
    //const classes = useStyles();

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
   });

    const {email, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            const body = { email, password };
            console.log(email);
            console.log(password);
            const response = await fetch("http://localhost:5000/conductor/smartride/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            const body1 = { email };
            const response1 = await fetch("http://localhost:5000/conductor/smartride/getId", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body1)
            });    

            const parseRes1 = await response1.json();
            console.log(parseRes1['user_id']);
            localStorage.setItem('user_id', parseRes1['user_id']);

            if(parseRes.token) {
                //console.log(parseRes);
                localStorage.setItem("token", parseRes.token);
                setAuth(true);

                toast.success("LogIn Successfully");
            }else{
                setAuth(false)
                toast.error(parseRes)
            }

            

        } catch (err) {
            console.error(err.message);
        }
    }
    
    return(
        <Fragment>
            <div className="body">
                <div className="backgroundImg"></div>
                <div className="f_container">
                    <h1>Login</h1>
                    <form onSubmit={onSubmitForm}>
                        <div className="form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="enter email"
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="enter passwrod"
                                    value={password}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <button>Sign In</button>
                        <div className="reg">
                            <h4><b>Create Account ?</b></h4>
                            <div className="reg-link">
                                <Link to="/smartride/register" style={{ textDecoration: 'none', color: '#1e90ff' }} >Here</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};


export default Login;
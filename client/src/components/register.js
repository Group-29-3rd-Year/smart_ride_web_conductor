import React, {Fragment, useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './style/register.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const useStyles = makeStyles((theme) => ({
    
    submit: {
      margin: theme.spacing(3, 0, 2),
      width: '140px',
      height: '40px'
    },
}));

const Register = ({ setAuth }) => {

    const classes = useStyles();

    const [inputs, setInputs] = useState({
         name: "",
         phone_no: "",
         email: "",
         password: ""
    });

    const {name, phone_no, email, password} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {name, phone_no, email, password};
            console.log(name);
            
            const response = await fetch("http://localhost:5000/conductor/smartride/register", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            if(parseRes === true){
                console.log(parseRes);
                localStorage.setItem("token", parseRes.token);
                setAuth(true);

                toast.success("Registered Successfully");
            }else{
                setAuth(false);
                toast.error(parseRes)
                toast.success("Registered Successfully"); //wrong code
                window.location.reload(); //wrong code 
            }
            

        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
            <div className="body">
                <div className="backgroundImg"></div>
                <div className="form_container">
                    <h1>Register</h1>
                    <form onSubmit={onSubmitForm}>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Name"
                                    value={name}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Phone No</label>
                                <input 
                                    type="text" 
                                    name="phone_no" 
                                    placeholder="Phone Number"
                                    value={phone_no}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="Email"
                                    value={email}
                                    onChange = {e => onChange(e)}
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
                                    placeholder="Passwrod"
                                    value={password}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        {/* <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => setAuth(true)}
                        >
                            Sign Up
                        </Button> */}

                        <button>Sign Up</button>
                        <div className="login">
                            <h4><b>Have Account ?</b></h4>
                            <div className="login-link">
                                <Link to="/smartride/login" style={{ textDecoration: 'none', color: '#1e90ff' }} >Here</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};
 

export default Register;    
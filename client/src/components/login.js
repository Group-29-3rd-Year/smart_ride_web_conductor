import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
// import Button from '@material-ui/core/Button';
//import { makeStyles } from '@material-ui/core/styles';
import './style/login.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

// const useStyles = makeStyles((theme) => ({
    
//     link: {
//         margin: 5,
//     },
// }));

const Login = ({ setAuth }) => {
    
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
            const response = await fetch("http://localhost:5001/smartride/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

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
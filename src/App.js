import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect
} from "react-router-dom";

import Login from "./components/login";
import Register from './components/register';
import Dashboard from './components/dashboard';
import { Fragment ,useEffect, useState} from 'react';
import Stat from './components/pages/stat';
import PassengerList from './components/pages/passengerList';

function App() {

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

  return (
    <Fragment>
      <Router>
        <div className="conatiner">
          <Switch>

            {/* login */}
            <Route 
              exact path="/smartride/login" 
              render={props => 
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/dashboard" />
                )
              }
            />


            {/* register */}
            <Route 
              exact path="/smartride/register" 
              render={props => 
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />

            {/* dashboard */}
            <Route 
              exact path="/smartride/dashboard" 
              render={props => 
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />

            {/* stat */}
            <Route 
              exact path="/stat" 
              render={props => 
                isAuthenticated ? (
                  <Stat {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />
			
			
             {/* passengerlist */}
             <Route 
              exact path="/passengerlist" 
              render={props => 
                isAuthenticated ? (
                  <PassengerList {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />


          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;

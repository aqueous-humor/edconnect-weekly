import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import CreateProject from './CreateProject';
import Project from './Project';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(['uid']);
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/projects/submit' component={CreateProject}>
          {!cookies.uid && <Redirect to={{
            pathname: "/login",
          }} />}
        </Route>
        <Route path='/projects/:id' component={Project} />
      </Switch>
    </Router>
  );
}

export default App;

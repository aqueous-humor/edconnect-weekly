import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import CreateProject from './CreateProject';
import Project from './Project';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/projects/submit' component={CreateProject}/>
        <Route path='/projects/:id' component={Project} />
      </Switch>
    </Router>
  );
}

export default App;

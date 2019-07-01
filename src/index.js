import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Org from './components/Org'
import User from './components/User'


const routing = (
    <BrowserRouter>
    <div>

    <Switch>
<Route exact path='/'  component={App}/>
<Route  path='/user/:id'    component={User} />
<Route  path= '/org' component={Org} />
</Switch>
</div>
</BrowserRouter>

  );

ReactDOM.render(routing, document.getElementById('root'));



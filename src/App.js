import React from 'react';
import './App.css'

import { BrowserRouter, Route } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import LoginPage from "./Cashe/LoginPage-Components/login-page";
import CasheMainPage from "./Cashe/CashePage-Components/cashe-main-page";


const history = createBrowserHistory();


export default function App(){
      return( 
      <BrowserRouter history={history}>
      <div>
          <Route exact path="/" component={LoginPage} />
          <Route path={`/cashe`} component={CasheMainPage}/>
          </div>
          </BrowserRouter>
    )
  }

import LoginForm from "./components/LoginForm";
import Mesenger from "./components/Mesenger";
import Registration from "./components/RegistrationForm"
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import React, { useEffect } from 'react';
import { checkAuth } from "./store/actions/AuthActions";
import ProtectedRoute from "./components/hocs/ProtectedRoute";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [])

  return (
    
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={Mesenger}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/registration" component={Registration}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

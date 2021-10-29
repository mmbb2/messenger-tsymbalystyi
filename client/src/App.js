import LoginForm from "./components/LoginForm";
import Mesenger from "./components/Mesenger";
import Registration from "./components/RegistrationForm"
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";
import React, { useEffect } from 'react';
import { checkAuth } from "./store/actions/AuthActions";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [])

  return (
    <BrowserRouter>
      <div>
        <Route path="/login" component={LoginForm}/>
        <Route path="/registration" component={Registration}/>
        <Route exact path="/" component={Mesenger}/>
      </div>
    </BrowserRouter>
  );
}

export default App;

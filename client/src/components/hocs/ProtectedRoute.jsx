import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";


function ProtectedRoute({ component: Component, ...props }) {
    const isAuth = useSelector(state => state.isAuth)
  return isAuth ? (
    <Route {...props} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
}

export default ProtectedRoute;

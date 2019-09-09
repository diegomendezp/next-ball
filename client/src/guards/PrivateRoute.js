import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";



const _PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={props => {
      return rest.user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )}
    }
  />
);


const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};
export const PrivateRoute = connect(mapStateToProps)(_PrivateRoute);

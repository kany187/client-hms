import React from "react";
import { Route, redirect } from "react-router-dom";
import auth from "../services/user/auth-service";

interface Props {
  render?: (props: any) => JSX.Element | React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ render, ...rest }) => {
  return (
    <Route
    // {...rest}
    // render={props => {
    //   if (!auth.getCurrentUser()) return <Redirect to="/login" />;
    //   return Component ? <Component {...props} /> : render!(props);
    // }}
    // {...rest}
    />
  );
};

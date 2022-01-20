import React from "react";

import {Route, Switch} from "react-router-dom";

import Landing from "./pages/landing";
import Form from "./pages/form";
import DashboardLogin from "./pages/dashboard_login";
import DashboardHome from "./pages/dashboard_home";
import ThankYou from "./pages/thankyou";

const Navigation = () => {
    return(
    <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/form" exact component={Form}/>
        <Route path="/thank-you" exact component={ThankYou}/>
        <Route path="/dashboard-login" exact component={DashboardLogin}/>
        <Route path="/dashboard" exact component={DashboardHome}/>
    </Switch>
    );
}

export default Navigation;
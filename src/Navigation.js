import React from "react";

import {Route, Switch} from "react-router-dom";

import Landing from "./pages/landing";
import Form from "./pages/form";
import AdminLogin from "./pages/admin_login";
import ThankYou from "./pages/thankyou";

const Navigation = () => {
    return(
    <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/form" exact component={Form}/>
        <Route path="/thank-you" exact component={ThankYou}/>
        <Route path="/admin" exact component={AdminLogin}/>

    </Switch>
    );
}

export default Navigation;
import React from "react";

import {Route, Switch} from "react-router-dom";

import Landing from "./pages/landing";
import Form from "./pages/form";

const Navigation = () => {
    return(
    <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/form" exact component={Form}/>
    </Switch>
    );
}

export default Navigation;
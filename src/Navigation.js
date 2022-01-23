import React from "react";

import {Route, Switch} from "react-router-dom";

import Landing from "./pages/landing";
import Form from "./pages/form";
import DashboardLogin from "./pages/dashboard_login";
import DashboardHome from "./pages/dashboard_home";
import ThankYou from "./pages/thankyou";
import DashboardValidation from "./pages/dashboard_candidates_validation";
import DashboardCandidatesClasses from "./pages/dashboard_candidates_classes";
import DashboardSettingsChoices from "./pages/dashboard_settings_choices";
import DashboardSettingsYear from "./pages/dashboard_settings_year";

const Navigation = () => {
    return(
    <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/form" exact component={Form}/>
        <Route path="/thank-you" exact component={ThankYou}/>
        <Route path="/dashboard-login" exact component={DashboardLogin}/>
        <Route path="/dashboard" exact component={DashboardHome}/>
        <Route path="/dashboard/validation" exact component={DashboardValidation}/>
        <Route path="/dashboard/candidates-classes" exact component={DashboardCandidatesClasses}/>
        <Route path="/dashboard/settings/choices" exact component={DashboardSettingsChoices} />
        <Route path="/dashboard/settings/year" exact component={DashboardSettingsYear} />
    </Switch>
    );
}

export default Navigation;
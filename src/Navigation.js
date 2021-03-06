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
import DashboardSettingsClasses from "./pages/dashboard_settings_classes";
import DashboardCommission from "./pages/dashboard_commission";
import DashboardProfile from "./pages/dashboard_profile";
import DashboardCandidatesView from "./pages/dashboard_candidates_view";
import DashboardSettingsElementarySchools from "./pages/dashboard_settings_elementaryschool";

const Navigation = () => {
    return(
    <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/form" exact component={Form}/>
        <Route path="/thank-you/:email/:name/:surname" exact component={ThankYou}/>
        <Route path="/dashboard-login" exact component={DashboardLogin}/>
        <Route path="/dashboard" exact component={DashboardHome}/>
        <Route path="/dashboard/validation" exact component={DashboardValidation}/>
        <Route path="/dashboard/candidates-classes" exact component={DashboardCandidatesClasses}/>
        <Route path="/dashboard/candidates/view" exact component={DashboardCandidatesView} />
        <Route path="/dashboard/settings/choices" exact component={DashboardSettingsChoices} />
        <Route path="/dashboard/settings/year" exact component={DashboardSettingsYear} />
        <Route path="/dashboard/commission" exact component={DashboardCommission} />
        <Route path="/dashboard/profile" exact component={DashboardProfile} />
        <Route path="/dashboard/settings/classes" exact component={DashboardSettingsClasses} />
        <Route path="/dashboard/settings/elementaryschools" exact component={DashboardSettingsElementarySchools} />
    </Switch>
    );
}

export default Navigation;
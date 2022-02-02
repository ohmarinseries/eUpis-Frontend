import React from "react";

import DashboardNavbar from "../compontents/dashboard_navbar";
import DashboardProfileHeading from "../compontents/dashboard_profile_heading";
import DashboardProfileInfo from "../compontents/dashboard_profile_info";

const DashboardProfile = () => {
    return(
        <div>
            <DashboardNavbar />
            <div className="container dashboard-font mt-5">
            <DashboardProfileHeading />
            </div>
            <div className="container w-100 justify-content-center align-content-center">
            <hr className="my-5"/>
            <DashboardProfileInfo />
            </div>
        </div>
    );
}


export default DashboardProfile;
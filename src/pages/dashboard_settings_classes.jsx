import React from "react";

import DashboardNavbar from "../compontents/dashboard_navbar";
import DashboardSettingsClassesTable from "../compontents/dashboard_settings_classes_table";


const DashboardSettingsChoices = () => {
    return(
        <div>
            <DashboardNavbar />
            <div className="container w-100 h-100 justify-content-center align-content-center mt-2">
                <div className="container-fluid w-100 h-50 pt-5">
                    <DashboardSettingsClassesTable />
                </div>
            </div>
        </div>
    );
}

export default DashboardSettingsChoices;
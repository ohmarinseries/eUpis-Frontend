import React from "react";

import DashboardNavbar from "../compontents/dashboard_navbar";
import DashboardSettingsChoicesTable from "../compontents/dashboard_settings_choices_table";
import DashboardSettingsYearChoicesTable from "../compontents/dashboard_settings_year_choices_table";


const DashboardSettingsChoices = () => {
    return(
        <div>
         <DashboardNavbar />
          <div className="container w-100 h-100 justify-content-center align-content-center mt-4">
              <div className="container-fluid w-75 h-50 pt-5">
             <DashboardSettingsChoicesTable />
              </div>
              <div className="container-fluid w-75 h-50 pt-5">
                  <DashboardSettingsYearChoicesTable />
              </div>
          </div>
         </div>
    );
}

export default DashboardSettingsChoices;

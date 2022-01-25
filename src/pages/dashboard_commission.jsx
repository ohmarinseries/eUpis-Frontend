import React from "react";

import DashboardNavbar from "../compontents/dashboard_navbar";
import DashboardCommissionTable from "../compontents/dashboard_commission_table";

const DashboardCommission = () => {
    return(
        <div>
            <DashboardNavbar />
            <div className="container h-100 w-75 mt-5">
                <DashboardCommissionTable />
            </div>
        </div>
    );
}

export default DashboardCommission;

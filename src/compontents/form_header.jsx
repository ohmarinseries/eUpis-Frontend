import React from "react";

import "../../src/compontents/styles/form.scss"

const FormHeader = () => {
    return(
        <div className="header-container">
        <div className="logo-form-header">
        <img src="../assets/plava.png"/>
        </div>

        <div className="h1-form-header">
        <h3>Forma za Upis u ETS</h3>
        </div>
        </div>
    );
}

export default FormHeader;
import React from "react";

import "../../src/compontents/styles/form.scss"
import logo_ets from "../assets/plava.png"

const FormHeader = () => {
    return(
        <div className="header-container">
        <div className="logo-form-header">
        <img src={logo_ets} alt="logoets" style={{height:'100%', width:'auto'}}/>
        </div>

        <div className="h1-form-header">
        <h3>Forma za Upis</h3>
        </div>
        </div>
    );
}

export default FormHeader;
import React from "react";
import "../compontents/styles/form.scss"


function FormGeneralInfo(){
   // const [state, setState]=React.useState("");

    return(
        <div className="form">
        <div className="input-container">
            <div className="one-input-container">
                <label className="form-label" htmlFor="ime-input"> Ime </label>
                <input  className="form-control" id="ime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Prezime </label>
                <input className="form-control" id="prezime-input"/>
            </div>
            <div className="one-input-container">
                <label className="form-label" htmlFor="prezime-input"> Datum Rođenja </label>
                <input type="date" className="form-control" id="prezime-input"/>
            </div>

        </div>



        </div>
    );
}


export default FormGeneralInfo;

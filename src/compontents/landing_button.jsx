import React from "react";
import './styles/landing.scss'
import {Link} from "react-router-dom";

const LandingButton = () => {

    return(
       <div style={{backgroundColor: "white"}}>
        <div className="landing-button-container">
            <div className="landing-button-header-container">
         <h2 className="h1landingbutton">Zelis postati ucenik ove skole?</h2>
         <h2 className="h1landingbutton">Upisi se odmah!</h2>
            </div>

        <div className="button-div">
            <Link to="/form">  <button className="button-upis">Upisi se!</button> </Link>
        </div>
        </div>
       </div>
    );
}

export default LandingButton;


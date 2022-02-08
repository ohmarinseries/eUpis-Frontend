import React from "react";
import './styles/landing.scss'

import landing_pic from "../assets/ilustracijaeupis.png"

const LandingImage = () => {
    return(
       <div className="landing-image-div">
        <div className="landing-text">
        <h1>eUpis</h1>
        <h1>Elektrotehnička škola Tuzla</h1>
        </div>
        <div className="landing-image">
            <img src={landing_pic} alt="landing" className="img-fluid image-landing"/>
        </div>
       </div>
    );
}

export default LandingImage;


import React from "react";
import './styles/landing.scss'
import {Link} from "react-router-dom";

const LandingButton = () => {

    return(
       <div style={{backgroundColor: "white"}}>
        <div className="SplashText" style={{marginTop: '10%'}}>
         <h1 className="h1landingbutton">Zelis postati ucenik ove skole?</h1>
         <h1 className="h1landingbutton">Upisi se odmah!</h1>
        </div>
        <div className="button-div" style={{paddingTop: '10%', paddingBottom: '10%'}}>
            <Link to="/form">  <button className="button-upis">Upisi se!</button> </Link>
        </div>

       </div>
    );
}

export default LandingButton;


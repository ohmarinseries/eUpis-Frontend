import React from "react";
import './styles/landing.scss'

const LandingButton = () => {
    return(
       <div>
        <div className="SplashText" style={{marginTop: '10%'}}>
         <h1 className="h1landingbutton">Zelis postati ucenik ove skole?</h1>
         <h1 className="h1landingbutton">Upisi se odmah!</h1>
        </div>
        <div className="button-div" style={{paddingTop: '10%', paddingBottom: '10%'}}>
            <button className="button-upis" >Upisi se!</button>
        </div>

       </div>
    );
}

export default LandingButton;


import React from "react";
import LandingImage from "../compontents/landing_image";
import LandingButton from "../compontents/landing_button";

import "../compontents/styles/landing.scss"

const Landing = () => {
    return(
      <div className="landing">
        <LandingImage />
        <LandingButton />
      </div>
    );
}

export default Landing;
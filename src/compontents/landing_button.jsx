import React from "react";
import './styles/landing.scss'

import form_image from "../assets/popunite_formu.png"
import email_image from "../assets/obavjestavamo_na_mail.png"
import documents_image from "../assets/dostavite_dokumente.png"

import {Link} from "react-router-dom";

const LandingButton = () => {

    return(
       <div style={{backgroundColor: "white"}} className="tutorial-block">
        <div className="landing-button-container">
          <div className="tutorial-image-div"><img src={form_image} className="image" alt="Form"/></div>
            <div className="tutorial-image-div">
          <div className="tutorial-text-div">
              <h1 className="h1-tutorial">Forma</h1>
              <p className="p-tutorial">Unesite svoje podatke za upis </p>
              <Link to="/form"><button className="btn-primary btn-lg ">Forma za upis</button></Link>
          </div>
            </div>
        </div>
           <div className="line-separator-div">
               <hr className="line-separator"/>
           </div>
           <div className="landing-button-container">
               <div className="tutorial-image-div">
                   <div className="tutorial-text-container-div">
                       <h2 className="h1-tutorial">Email Rezultati</h2>
                       <p className="p-tutorial">
                           Na email adresu koju ste unijeli u formi dobiti ćete
                           vaš broj za upis i rezultate upisa
                       </p>
                   </div>
               </div>
               <div className="tutorial-image-div"><img src={email_image} className="email-image" alt="Form"/></div>

           </div>
           <div className="line-separator-div">
               <hr className="line-separator"/>
           </div>
           <div className="landing-button-container">
               <div className="tutorial-image-div"><img src={documents_image} className="image" alt="Form"/></div>
               <div className="tutorial-image-div">
                   <div className="tutorial-text-container-div">
                       <h2 className="h1-tutorial">Dokumenti</h2>
                       <p className="p-tutorial">
                           Uz pomoć broja kojeg ste dobili na email nakon popunjavanja forme
                           dolazite u objekat škole i predajete dokumente na validaciju
                       </p>
                   </div>
               </div>


           </div>

       </div>
    );
}

export default LandingButton;


import React from "react";

import "../../src/compontents/styles/footer.scss"

import github_icon from "../assets/github.png"
import instagram_icon from "../assets/instagram.png"
import facebook_icon from "../assets/facebook.png"


const Footer = () => {
    return(
        <footer className="bg-dark text-center text-white">
            <div className="container p-4 pb-0">
                <section className="mb-4">
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/ETSTZ" target="_blank" rel="noreferrer" role="button" style={{backgroundColor:"#FFFFFF"}}>
                        <i className="fab fa-facebook-f"><img src={facebook_icon} alt="facebook icon" /></i>
                    </a>

                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/etstuzla/" target="_blank" rel="noreferrer" role="button" style={{backgroundColor:"#FFFFFF"}}>
                    <i className="fab fa-instagram"><img src={instagram_icon} alt="instagram icon" /></i>
                    </a>

                    <a className="btn btn btn-floating m-1" href="https://github.com/ohmarinseries" target="_blank" rel="noreferrer" role="button" style={{backgroundColor:"#FFFFFF"}}>
                        <i className="fab fa-github"><img src={github_icon} alt="Github icon" /> </i>
                    </a>
                </section>
            </div>

            <div className="text-center p-3" style={{backgroundColor:"rgba(0, 0, 0, 0.2)"}}>
                © 2021 Creator : @<a className="text-white" href="https://github.com/ohmarinseries" target="_blank" rel="noreferrer">ohmarinseries</a>
            </div>

        </footer>
    );
}

export default Footer;
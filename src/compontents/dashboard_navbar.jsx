import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";

import "../compontents/styles/dashboard.scss"

const DashboardNavbar = () => {
    return(
        <Navbar expand="lg" bg="dark" variant="dark" style={{paddingLeft:"0px"}}>

            <div className="container-fluid justify-content-start h-100 w-100 m-0">

                <Navbar.Brand href="#home" style={{marginRight:"50px", marginLeft:"20px"}} className="head-navbar ">
                 eUpis Elektrotehnička škola Tuzla
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="elements-navbar w-100 justify-content-end">
                    <Nav.Link href="/" style={{marginRight:"20px"}}>Kandidati</Nav.Link>
                    <NavDropdown title="Podešavanja" id="navbarScrollingDropdown" style={{marginRight:"20px"}}>
                        <NavDropdown.Item href="/">Upis</NavDropdown.Item>
                        <NavDropdown.Item href="/">Smjerovi</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/" style={{marginRight:"20px"}}>Komisija</Nav.Link>
                    <NavDropdown title="Korisnik" id="navbarScrollingDropdown" >
                        <NavDropdown.Item href="/">Detalji</NavDropdown.Item>
                        <NavDropdown.Item href="/">Odjava</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>



            </div>

        </Navbar>

    );

}

export default DashboardNavbar
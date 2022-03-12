import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";

import "../compontents/styles/dashboard.scss"

const DashboardNavbar = () => {
    return(
        <Navbar expand="lg" bg="dark" variant="dark" style={{paddingLeft:"0px"}}>

            <div className="container-fluid justify-content-start h-100 w-100 m-0">

                <Navbar.Brand href="/dashboard" style={{marginRight:"50px", marginLeft:"20px"}} className="head-navbar ">
                 eUpis Elektrotehnička škola Tuzla
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="elements-navbar w-100 justify-content-end">
                    <NavDropdown title="Kandidati" id="navbarScrollingDropdown" style={{marginRight:"20px"}}>
                        <NavDropdown.Item href="/dashboard/candidates/view">Pregled</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard/validation">Validacija</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard/candidates-classes">Razredi <span className="badge bg-dark text-light b-text-size">Admin</span></NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Podešavanja" id="navbarScrollingDropdown" style={{marginRight:"20px"}}>
                        <NavDropdown.Item href="/dashboard/settings/year">Godina <span className="badge bg-dark text-light b-text-size ">Admin</span></NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard/settings/choices">Smjerovi <span className="badge bg-dark text-light b-text-size">Admin</span></NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard/commission">Komisija <span className="badge bg-dark text-light b-text-size">Admin</span></NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard/settings/classes">Razredi <span className="badge bg-dark text-light b-text-size">Admin</span></NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Korisnik" id="navbarScrollingDropdown" >
                        <NavDropdown.Item href="/dashboard/profile">Detalji</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard-login">Odjava</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </div>

        </Navbar>

    );

}

export default DashboardNavbar
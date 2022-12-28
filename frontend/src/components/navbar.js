import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Component from "react"
import {Link} from "react-router-dom"

function Navigation() {
        return (
            <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                  <Nav.Link><Link to="/register">Register</Link></Nav.Link>
                  <Nav.Link><Link to="/logout">Logout</Link></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )
    }

export default Navigation;

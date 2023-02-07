import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavItem from "react-bootstrap/NavItem"
import NavDropdown from "react-bootstrap/NavDropdown"
import Component from "react"
import {Link} from "react-router-dom"
import {Context} from "./sessionContext"
import {useContext} from "react"

function Navigation() {
        const [context, setContext] = useContext(Context)
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
                  <Nav.Link><Link to="/upload_community">Create Community</Link></Nav.Link>
                  <Nav.Link><Link to="/communities">Explore Communities</Link></Nav.Link>
                  <Nav.Link>You are logged in as {context.username}</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )
    }

export default Navigation;

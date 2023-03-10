import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

class NaviBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to='/'>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to='/' className="nav-link">Users</Link>
                <Link to='/projects' className="nav-link">Projects</Link>
                <Link to='/todo' className="nav-link">To Do</Link>
                {this.props.is_authenticated ? <Link onClick={() => this.props.logout()} className="nav-link">Logout</Link> :
                                          <Link to='/login' className="nav-link">Login</Link>}
                {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                {/*  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                {/*  <NavDropdown.Item href="#action/3.2">*/}
                {/*    Another action*/}
                {/*  </NavDropdown.Item>*/}
                {/*  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                {/*  <NavDropdown.Divider />*/}
                {/*  <NavDropdown.Item href="#action/3.4">*/}
                {/*    Separated link*/}
                {/*  </NavDropdown.Item>*/}
                {/*</NavDropdown>*/}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
  }
}

export default NaviBar;
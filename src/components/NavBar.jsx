// src/components/NavBar.jsx

import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {

    return (

    <Navbar bg="info" variant="dark" expand="lg" className="p-3 mb-4" sticky='top'>
      
      <Navbar.Brand as ={NavLink} to='/'>FakeStore</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>

          <Nav.Link as={NavLink} to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </Nav.Link>

          <NavDropdown title="Products" id='basic-nav-dropdown'>
            
            <NavDropdown.Item as={NavLink} to="/products">
                Product List
            </NavDropdown.Item>

            <NavDropdown.Item as={NavLink} to="/add-product">
                Add Product
            </NavDropdown.Item>

          </NavDropdown>


        </Nav>
      
      </Navbar.Collapse>

    </Navbar>

  );

}

export default NavBar;
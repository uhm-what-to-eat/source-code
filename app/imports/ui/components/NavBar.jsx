import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill, PersonVcard } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/images/logo.png" width="100px" />
            <h1 id="navbar-home">UHM.. What To Eat?</h1>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="navbar-places-to-eat" as={NavLink} to="/list" key="list">Places To Eat</Nav.Link>,
            ]) : ''}
            {currentUser ? ([
              <Nav.Link id="navbar-search" as={NavLink} to="/search" key="search">Search</Nav.Link>,
            ]) : ''}
            {currentUser ? ([
              <Nav.Link id="navbar-favorites" as={NavLink} to="/favorite" key="favorites">Favorites</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="navbar-add-vendor" as={NavLink} to="/admin" key="admin">Add/Remove Vendors</Nav.Link>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="navbar-edit-vendor" as={NavLink} to="/adminEdit">Edit Vendors</Nav.Link>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
              <Nav.Link id="navbar-your-vendor" as={NavLink} to="/vendorStuff">Your Vendors</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login" align="end">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill style={{ marginRight: '5px' }} />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signupuser">
                  <PersonPlusFill style={{ marginRight: '5px' }} />
                  Sign
                  up User
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up-vendor" as={NavLink} to="/signupvendor">
                  <PersonVcard style={{ marginRight: '5px' }} />
                  Sign
                  up Vendor
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

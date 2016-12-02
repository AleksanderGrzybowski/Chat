import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const ChatNavbar = ({username, logout}) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                {username}
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem onClick={logout}>
                Logout <i className="fa fa-sign-out"/>
            </NavItem>
        </Nav>
    </Navbar>
);

export default ChatNavbar;

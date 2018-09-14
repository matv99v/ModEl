import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';




export default class Navigation extends React.Component {
    render() {
        return (

            <Navbar>
                <Navbar.Header>

                    <Navbar.Brand>
                        <NavLink to="/" >
                            Admin tool
                        </NavLink>
                    </Navbar.Brand>

                </Navbar.Header>

                <Nav>
                    <NavItem
                        eventKey={1}
                        componentClass={NavLink}
                        to="/categories"
                        href="/categories"
                        activeStyle={{color: 'red'}}
                    >
                        Категории
                    </NavItem>

                    <NavItem
                        eventKey={2}
                        componentClass={NavLink}
                        to="/goods"
                        href="/goods"
                        activeStyle={{color: 'red'}}
                    >
                        Товары
                    </NavItem>

                </Nav>

            </Navbar>






        );
    }
}

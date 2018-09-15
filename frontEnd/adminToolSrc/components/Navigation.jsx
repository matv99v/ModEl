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

                    <NavDropdown eventKey={3} title="Закупка" id="stock-nav-dropdown">
                        <MenuItem
                            eventKey={3.1}
                            componentClass={NavLink}
                            to="/stock/add"
                            href="/stock/add"
                            activeStyle={{color: 'red'}}
                        >
                            Добавить
                        </MenuItem>

                        <MenuItem divider />

                        <MenuItem
                            eventKey={3.2}
                            componentClass={NavLink}
                            to="/stock/search"
                            href="/stock/search"
                            activeStyle={{color: 'red'}}
                        >
                            Поиск
                        </MenuItem>

                    </NavDropdown>

                </Nav>

            </Navbar>






        );
    }
}

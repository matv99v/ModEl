import React from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
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

                    <NavDropdown eventKey={1} title="Категории" id="categories-nav-dropdown">
                        <MenuItem
                            eventKey={1.1}
                            componentClass={NavLink}
                            to="/categories/add"
                            href="/categories/add"
                            activeStyle={{color: 'red'}}
                        >
                            Добавить категорию
                        </MenuItem>

                        <MenuItem divider />

                        <MenuItem
                            eventKey={1.2}
                            componentClass={NavLink}
                            to="/categories/search"
                            href="/categories/search"
                            activeStyle={{color: 'red'}}
                        >
                            Поиск
                        </MenuItem>

                    </NavDropdown>







                    <NavDropdown eventKey={2} title="Товары" id="goods-nav-dropdown">
                        <MenuItem
                            eventKey={2.1}
                            componentClass={NavLink}
                            to="/goods/add"
                            href="/goods/add"
                            activeStyle={{color: 'red'}}
                        >
                            Добавить товар
                        </MenuItem>

                        <MenuItem divider />

                        <MenuItem
                            eventKey={2.2}
                            componentClass={NavLink}
                            to="/goods/search"
                            href="/goods/search"
                            activeStyle={{color: 'red'}}
                        >
                            Поиск
                        </MenuItem>

                    </NavDropdown>





                    <NavDropdown eventKey={3} title="Склад" id="barn-nav-dropdown">
                        <MenuItem
                            eventKey={3.1}
                            componentClass={NavLink}
                            to="/barn/add"
                            href="/barn/add"
                            activeStyle={{color: 'red'}}
                        >
                            Новая транзакция
                        </MenuItem>

                        <MenuItem divider />

                        <MenuItem
                            eventKey={3.2}
                            componentClass={NavLink}
                            to="/barn/purchase/all"
                            href="/barn/purchase/all"
                            activeStyle={{color: 'red'}}
                        >
                            Закупка
                        </MenuItem>

                        <MenuItem divider />

                        <MenuItem
                            eventKey={3.3}
                            componentClass={NavLink}
                            to="/barn/search"
                            href="/barn/search"
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

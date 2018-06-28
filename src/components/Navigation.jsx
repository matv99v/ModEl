import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Badge } from 'react-bootstrap';



export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const cart = JSON.parse(localStorage.getItem("ModElCart")) || [];

        return (
            <Navbar inverse>

                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/' >Modern Electronics</Link>
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav pullRight>

                    <NavItem componentClass={Link} href="/catalog" to='/catalog'>
                        Каталог
                    </NavItem>

                    <NavItem componentClass={Link} href="/contacts" to='/contacts'>
                        Контакты
                    </NavItem>

                    <NavItem componentClass={Link} href="/cart" to='/cart'>
                        Корзина <Badge>{cart.length}</Badge>
                    </NavItem>

                </Nav>

            </Navbar>
        );
    }
}

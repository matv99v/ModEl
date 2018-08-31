import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import apiUrls from 'AliasSrc/apiUrls';
import BrandLogo from './common/BrandLogo.jsx';



class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const cartObjectIds = Object.keys(this.props.cart);
        const amount = cartObjectIds.reduce((acc, key) => {
            return acc + this.props.cart[key];
        }, 0);
        const displayCart = amount > 0 ? 'block' : 'none';

        return (
            <Navbar inverse>

                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/' >
                          <div style={{display: 'flex'}}>
                            {true && <img style={{height: '30px'}} src={apiUrls.brandLogo}/>}
                            <BrandLogo/>
                          </div>
                        </Link>
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav pullRight>

                    <NavItem componentClass={Link} href="/catalog" to='/catalog'>
                        Каталог
                    </NavItem>

                    <NavItem componentClass={Link} href="/contacts" to='/contacts'>
                        Контакты
                    </NavItem>

                    <NavItem componentClass={Link} href="/cart" to='/cart' style={{display: displayCart}}>
                        Корзина <Badge>{amount}</Badge>
                    </NavItem>

                </Nav>

            </Navbar>
        );
    }
};

const mapStateToProps = (state) => ({
    cart: state.cart
});

export default connect(mapStateToProps)(Navigation);

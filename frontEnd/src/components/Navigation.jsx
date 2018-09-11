import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Badge, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import apiUrls from 'AliasSrc/api/apiUrls';

// import { fetchGoodsActionAsync } from 'AliasReduxActions/goods-actions';
import { fetchExistingCategoriesAsync } from 'AliasReduxActions/categories-actions';
import { fetchExistingCategoriesAsync_X } from 'AliasReduxActions/catalog-actions';

import './Navigation.scss';





class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
    }


    componentWillMount() {
        console.warn('fetching initial data, should be printed only one time');
        // this.props.dispatch(fetchExistingCategoriesAsync());
        this.props.dispatch(fetchExistingCategoriesAsync_X());
    }


    handleNavToggle = () => {
        this.setState(prevState => ({isOpen: !prevState.isOpen}));
    }

    handleNavSelect = (eventKey) => {
        if (eventKey) {
            this.setState(prevState => ({isOpen: false}));
        }
    }

    render() {
        const cartObjectIds = Object.keys(this.props.cart);
        const amount = cartObjectIds.reduce((acc, key) => {
            return acc + this.props.cart[key];
        }, 0);
        const displayCart = amount > 0 ? 'block' : 'none';

        return (
            <Navbar inverse onToggle={this.handleNavToggle} expanded={this.state.isOpen} onSelect={this.handleNavSelect} className="Navigation__Cnt">

                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/' >
                            Test
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>

                    <Nav pullRight>

                      <NavItem componentClass={Link} href="/" to='/'>
                          Инфо
                      </NavItem>

                      <NavDropdown title="Каталог" id="basic-nav-dropdown" className="visible-xs">
                          {
                              this.props.categories.map((cat, i) => (
                                  <MenuItem
                                      eventKey={i}
                                      key={i}
                                      componentClass={Link}
                                      href={`/catalog/${cat.idCategory}`}
                                      to={`/catalog/${cat.idCategory}`}
                                  >
                                      {cat.CategoryName}
                                  </MenuItem>
                              ))
                          }
                      </NavDropdown>

                      <NavItem componentClass={Link} href="/catalog" to='/catalog' className="hidden-xs">
                          Каталог
                      </NavItem>

                      <NavItem componentClass={Link} href="/contacts" to='/contacts'>
                          Контакты
                      </NavItem>

                      <NavItem componentClass={Link} href="/cart" to='/cart' style={{display: displayCart}}>
                          Корзина <Badge>{amount}</Badge>
                      </NavItem>

                    </Nav>
                  </Navbar.Collapse>


            </Navbar>
        );
    }
};

const mapStateToProps = (state) => ({
    cart: state.cart,
    categories: Object.keys(state.catalog).map(idCategory => state.catalog[idCategory]) // transform object to array before render
});


export default connect(mapStateToProps)(Navigation);

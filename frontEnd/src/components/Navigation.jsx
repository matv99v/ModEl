import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Badge, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import apiUrls from 'AliasSrc/apiUrls';

import { unsetActiveCategoryId, setActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';
import { unsetActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';
import { fetchGoodsActionAsync } from 'AliasReduxActions/goods-actions';
import { fetchExistingCategoriesAsync } from 'AliasReduxActions/categories-actions';

import './Navigation.scss';





class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
    }


    componentWillMount() {
        if (!this.props.goods.length) {
            this.props.dispatch(fetchGoodsActionAsync());
        }

        if (!this.props.categories.length) {
            this.props.dispatch(fetchExistingCategoriesAsync());
        }
    }


    refreshIds = () => {
        this.props.dispatch(unsetActiveGoodIdAction());
        this.props.dispatch(unsetActiveCategoryId());
    }

    handleCategorySelection = (cat) => {
        this.props.dispatch(setActiveCategoryId(cat));
        this.props.dispatch(unsetActiveGoodIdAction());
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
                            <img style={{height: '30px'}} src={apiUrls.brandLogo}/>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>

                    <Nav pullRight>

                      <NavItem componentClass={Link} href="/" to='/'>
                          О сайте
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
                                      onClick={() => this.handleCategorySelection(cat.idCategory)}
                                  >
                                      {cat.CategoryName}
                                  </MenuItem>
                              ))
                          }
                      </NavDropdown>

                      <NavItem componentClass={Link} href="/catalog" to='/catalog' onClick={this.refreshIds} className="hidden-xs">
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
    categories: state.categories,
    goods: state.goods,
});

export default connect(mapStateToProps)(Navigation);

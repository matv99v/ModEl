import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Badge, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchEnabledCategoriesAsync } from 'AliasModelSrc/redux/actions/catalog-actions';
import './Navigation.scss';




class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
    }


    componentWillMount() {
        console.warn('fetching initial data, should be printed only one time');
        this.props.dispatch(fetchEnabledCategoriesAsync({enabled: true}));
    }


    handleNavToggle = () => {
        this.setState(prevState => ({isOpen: !prevState.isOpen}));
    }

    handleNavSelect = (eventKey) => {
        if (eventKey) {
            this.setState(() => ({isOpen: false}));
        }
    }

    render() {
        const cartObjectIds = Object.keys(this.props.cart);
        const amount = cartObjectIds.reduce((acc, key) => {
            return acc + this.props.cart[key];
        }, 0);
        const displayCart = amount > 0 ? 'block' : 'none';
        // transform object to array before render
        const categories = Object.keys(this.props.catalog).map(idCategory => this.props.catalog[idCategory]);

        return (
            <Navbar inverse onToggle={this.handleNavToggle} expanded={this.state.isOpen} onSelect={this.handleNavSelect} className="Navigation__Cnt">

                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/' >
                            <img className='Navigation__brandImg' />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>

                    <Nav pullRight>

                        <NavItem componentClass={Link} href="/" to='/'>
                            Инфо
                        </NavItem>

                        <NavDropdown title="Каталог" id="cat-nav-dropdown" className="visible-xs">
                            {
                                categories.map((cat, i) => (
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
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    catalog: state.catalog
});


export default connect(mapStateToProps)(Navigation);

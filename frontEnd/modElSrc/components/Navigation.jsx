import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Badge, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchEnabledCategoriesAsync } from 'AliasModelSrc/redux/actions/catalog-actions';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { withRouter } from 'react-router-dom';
import './Navigation.scss';
import BrandLogo from './common/BrandLogo';
import helpers from '../../helpers/helpers';
import api from 'AliasApi/api';


class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLoading: false,
            options: [],
            typeheadFocusClass: '',
        };
    }

    componentWillMount() {
        console.warn('fetching initial data, should be printed only one time');
        this.props.dispatch(fetchEnabledCategoriesAsync({enabled: true, excludeProductsCount: 0}));
    }

    handleNavToggle = () => {
        this.setState(prevState => ({isOpen: !prevState.isOpen}));
    }

    handleNavSelect = (eventKey) => {
        if (eventKey) {
            this.setState(() => ({isOpen: false}));
        }
    }

    handleGoodSearch = (query) => {
        this.setState({isLoading: true});

        const obj = {
            table: 'products',
            field: 'productName',
            like: query,
            enabled: true,
        };

        api.autocomplete(obj)
            .then(json => this.setState({
                isLoading: false,
                options: json,
            }));
    }

    handleGoodInputChange = ([selectedItem]) => {
        if (selectedItem) {
            this.props.history.push(`/catalog/${selectedItem.idCategory}/${selectedItem.idProduct}`);
            this.typeahead.getInstance().clear();
        }
    }

    handleTypeheadFocus = (e) => {
        this.setState({typeheadFocusClass: 'typehead-expanded'});
    }

    handleTypeheadonBlur = (e) => {
        this.setState({typeheadFocusClass: ''});
    }

    render() {
        const cartObjectIds = Object.keys(this.props.cart);
        const amount = cartObjectIds.reduce((acc, key) => {
            return acc + this.props.cart[key];
        }, 0);
        const displayCart = amount > 0 ? 'block' : 'none';
        // transform object to array before render
        const categories = Object.keys(this.props.catalog).map(idCategory => this.props.catalog[idCategory]).sort(helpers.sortByPropName('CategoryName'));

        return (
            <Navbar
                fluid
                inverse
                onToggle={this.handleNavToggle}
                expanded={this.state.isOpen}
                onSelect={this.handleNavSelect}
                className="Navigation__Cnt"
            >

                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/' >
                            <BrandLogo />
                            <img className='Navigation__brandImg' />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Navbar.Form
                        className={`Navigation__search ${this.state.typeheadFocusClass}`}
                        pullRight
                    >
                        <AsyncTypeahead
                            ref={typeahead => this.typeahead = typeahead}
                            labelKey='productName'
                            isLoading={this.state.isLoading}
                            options={this.state.options}
                            onSearch={this.handleGoodSearch}
                            onChange={this.handleGoodInputChange}
                            placeholder='Search'
                            bsSize='sm'
                            onFocus={this.handleTypeheadFocus}
                            onBlur={this.handleTypeheadonBlur}
                            maxHeight='75vh'
                            align={window.innerWidth <= 768 ? 'justify' : 'left'}
                            clearButton
                        />
                    </Navbar.Form>

                    <Nav
                        className={`Navigation__links ${this.state.typeheadFocusClass}`}
                        pullRight
                    >
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


const withRouterNavigation = withRouter(Navigation);
export default connect(mapStateToProps)(withRouterNavigation);

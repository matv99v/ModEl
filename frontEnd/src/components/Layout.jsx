import React from 'react';
import GoodsSection from './GoodsSection.jsx';
import HomePage from './HomePage.jsx';
import ContactPage from './ContactPage.jsx';
import Navigation from './Navigation.jsx';
import Cart from './Cart.jsx';
import Good from './Good.jsx';
import { hot } from 'react-hot-loader'
import Spinner from './Spinner.jsx';



import { Grid, Row } from 'react-bootstrap';
import { Route, BrowserRouter } from 'react-router-dom';



class Layout extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Grid fluid>

                    <Row>
                        <Navigation />
                    </Row>

                    { false &&
                    <Row>
                        <Spinner size='50' />
                    </Row>
                    }

                    <Row>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/catalog' component={GoodsSection} />
                        <Route exact path='/contacts' component={ContactPage} />
                        <Route exact path='/cart' component={Cart} />
                    </Row>

                </Grid>
            </BrowserRouter>
        );
    }
}



export default hot(module)(Layout);

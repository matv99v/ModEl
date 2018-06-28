import React from 'react';
import ItemBrowser from './body/ItemBrowser.jsx';
import HomePage from './HomePage.jsx';
import ContactPage from './ContactPage.jsx';
import Navigation from './Navigation.jsx';
import Cart from './Cart.jsx';

import { Grid, Row } from 'react-bootstrap';
import { Route, BrowserRouter } from 'react-router-dom';



export default class Layout extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Grid>

                    <Row>
                        <Navigation />
                    </Row>

                    <Row>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/catalog' component={ItemBrowser} />
                        <Route exact path='/catalog/:id' component={ItemBrowser} />
                        <Route exact path='/contacts' component={ContactPage} />
                        <Route exact path='/cart' component={Cart} />
                    </Row>

                </Grid>
            </BrowserRouter>
        );
    }
}

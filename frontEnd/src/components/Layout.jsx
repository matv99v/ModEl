import React from 'react';
import GoodsSection from './GoodsSection.jsx';
import HomePage from './HomePage.jsx';
import ContactPage from './ContactPage.jsx';
import Navigation from './Navigation.jsx';
import Cart from './Cart.jsx';
import { hot } from 'react-hot-loader'
import ErrorWindow from './ErrorWindow.jsx';
import Spinner from './common/Spinner.jsx';
import './Layout.scss';



import { Grid, Row } from 'react-bootstrap';
import { Route, BrowserRouter } from 'react-router-dom';



class Layout extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Grid fluid className="Layout__cnt">

                    <div className="Layout__spinnerCnt">
                        <Spinner size="15" />
                    </div>

                    <Row>
                        <Navigation />
                    </Row>

                    <Row>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/catalog' component={GoodsSection} />
                        <Route exact path='/contacts' component={ContactPage} />
                        <Route exact path='/cart' component={Cart} />
                    </Row>

                    <Row>
                        <ErrorWindow />
                    </Row>

                </Grid>
            </BrowserRouter>
        );
    }
}



export default hot(module)(Layout);

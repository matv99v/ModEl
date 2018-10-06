import React from 'react';
import CatalogHoc from './CatalogHoc.jsx';
import HomePage from './HomePage.jsx';
import ContactPage from './ContactPage.jsx';
import Navigation from './Navigation.jsx';
import Cart from './Cart.jsx';
import { hot } from 'react-hot-loader';
import ErrorWindow from './ErrorWindow.jsx';
import Spinner from './common/Spinner.jsx';
import './Layout.scss';
import ReactGA from 'react-ga';
import WithTracker from './WithTracker.jsx';

import { Grid, Row } from 'react-bootstrap';
import { Route, BrowserRouter } from 'react-router-dom';



class Layout extends React.Component {
    componentWillMount() {
        if (process.env.NODE_ENV === 'production') {
            ReactGA.initialize('UA-125424604-1');
        }
    }

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
                        <Route exact path='/'                         component={WithTracker(HomePage)} />
                        <Route       path='/catalog/:catId?/:goodId?' component={WithTracker(CatalogHoc)} /> {/* optional parameters: catId, goodId */}
                        <Route exact path='/contacts'                 component={WithTracker(ContactPage)} />
                        <Route exact path='/cart'                     component={WithTracker(Cart)} />
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

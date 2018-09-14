import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { Route, BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import Categories from './Categories.jsx';
import Goods from './Goods.jsx';




export default class Layout extends React.Component {
    render() {
        return (

            <BrowserRouter basename="/admin">
                <Grid>

                    <Row>
                        <Navigation />
                    </Row>

                    <Row>
                        <Route exact path='/'               render={() => <div>home</div>} />
                        <Route exact path='/categories'     component={Categories} />
                        <Route exact path='/categories/add' render={() => <div>add new category form</div>} />
                        <Route exact path='/goods'          component={Goods} />
                        <Route exact path='/goods/add'      render={() => <div>add new good form</div>} />
                    </Row>

                </Grid>
            </BrowserRouter>






        );
    }
}

import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import Categories from './Categories.jsx';
import Goods from './Goods.jsx';
import StockSearch from './StockSearch.jsx';
import StockForm from './StockForm.jsx';




export default class Layout extends React.Component {

    func = (values) => {
        console.log(values);
    }

    render() {
        return (

            <BrowserRouter basename="/admin">
                <Grid>

                    <Row>
                        <Navigation />
                    </Row>

                    <Row>
                        <Switch>
                            <Route exact path='/'               render={() => <div>home</div>} />
                            <Route exact path='/categories'     component={Categories} />
                            <Route exact path='/categories/add' render={() => <div>add new category form</div>} />
                            <Route exact path='/goods'          component={Goods} />
                            <Route exact path='/goods/add'      render={() => <div>add new good form</div>} />
                            <Route exact path='/stock/search'   component={StockSearch} />
                            <Route exact path='/stock/add'      component={StockForm} />
                        </Switch>
                    </Row>

                </Grid>
            </BrowserRouter>






        );
    }
}

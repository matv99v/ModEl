import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import BarnForm from './Barn/BarnForm';
import BarnFormEdit from './Barn/BarnFormEdit';
import BarnPurchase from './Barn/BarnPurchase';
import GoodsSearch from './Goods/GoodsSearch';
import GoodForm from './Goods/GoodForm';
import CategoryForm from './Categories/CategoryForm';
import CategoriesSearch from './Categories/CategoriesSearch';
import SysDialog from './common/SysDialog';
import moment from 'moment';




export default class Layout extends React.Component {
    render() {
        return (

            <BrowserRouter basename="/admin">
                <Grid className="Layout__cnt">

                    <Row>
                        <Navigation />
                    </Row>

                    <Row>
                        <SysDialog/>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <Switch>
                                <Route exact path='/'                         render={() => <div>home</div>} />
                                <Route exact path='/categories/search'        component={CategoriesSearch} />
                                <Route exact path='/categories/add'           component={CategoryForm} />
                                <Route exact path='/goods/search'             component={GoodsSearch} />
                                <Route exact path='/goods/add'                component={GoodForm} />
                                <Route exact path='/barn/add'                 render={() => <BarnForm initialValues={{zakDate: moment().format('YYYY-MM-DD'), productName: ''}}/>} />
                                <Route exact path='/barn/edit/:hash'          component={BarnFormEdit} />
                                <Route exact path='/barn/purchase/:type'      component={BarnPurchase} />
                            </Switch>
                        </Col>
                    </Row>

                </Grid>
            </BrowserRouter>






        );
    }
}

import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import CategoriesSearch from './CategoriesSearch.jsx';
import GoodsSearch from './GoodsSearch.jsx';
import BarnSearch from './BarnSearch.jsx';
import BarnForm from './BarnForm.jsx';
import BarnFormEdit from './BarnFormEdit.jsx';
import GoodForm from './GoodForm.jsx';
import CategoryForm from './CategoryForm.jsx';
import Spinner from './common/Spinner.jsx';
import SysDialog from './common/SysDialog.jsx';
import BarnPurchase from './BarnPurchase.jsx';
import './Layout.scss';
import moment from 'moment';




export default class Layout extends React.Component {
    render() {
        return (

            <BrowserRouter basename="/admin">
                <Grid className="Layout__cnt">

                    <Row className="Layout__spinnerCnt">
                        <Spinner size="15" />
                    </Row>

                    <Row>
                        <Navigation />
                    </Row>

                    <Row>
                        <SysDialog/>
                    </Row>

                    <Row>
                        <Switch>
                            <Route exact path='/'                  render={() => <div>home</div>} />
                            <Route exact path='/categories/search' component={CategoriesSearch} />
                            <Route exact path='/categories/add'    component={CategoryForm} />
                            <Route exact path='/goods/search'      component={GoodsSearch} />
                            <Route exact path='/goods/add'         component={GoodForm} />
                            <Route exact path='/barn/search'       component={BarnSearch} />
                            {/* <Route exact path='/barn/add'          component={BarnForm} /> */}
                            <Route exact path='/barn/add'          render={() => <BarnForm initialValues={{zakDate: moment().format('YYYY-MM-DD'), productName: ''}}/>} />
                            <Route exact path='/barn/edit/:hash'   component={BarnFormEdit} />
                            <Route exact path='/barn/purchase'     component={BarnPurchase} />
                        </Switch>
                    </Row>

                </Grid>
            </BrowserRouter>






        );
    }
}

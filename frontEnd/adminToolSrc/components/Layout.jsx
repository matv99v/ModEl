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
import './Layout.scss';




export default class Layout extends React.Component {

    func = (values) => {
        console.log(values);
    }

    render() {
        return (

            <BrowserRouter basename="/admin">
                <Grid className="Layout__cnt">

                    <div className="Layout__spinnerCnt">
                        <Spinner size="15" />
                    </div>

                    <Row>
                        <Navigation />
                    </Row>

                    <Row>
                        <Switch>
                            <Route exact path='/'                  render={() => <div>home</div>} />
                            <Route exact path='/categories/search' component={CategoriesSearch} />
                            <Route exact path='/categories/add'    component={CategoryForm} />
                            <Route exact path='/goods/search'      component={GoodsSearch} />
                            <Route exact path='/goods/add'         component={GoodForm} />
                            <Route exact path='/barn/search'       component={BarnSearch} />
                            <Route exact path='/barn/add'          component={BarnForm} />
                            <Route exact path='/barn/edit/:hash'   component={BarnFormEdit} />
                        </Switch>
                    </Row>

                </Grid>
            </BrowserRouter>






        );
    }
}

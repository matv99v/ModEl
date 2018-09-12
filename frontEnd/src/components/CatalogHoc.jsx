import React from 'react';
import Categories from './Categories.jsx';
import GoodsList from './GoodsList.jsx';

import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Breadcrumbs from './Breadcrumbs.jsx';
import { Route, Switch } from 'react-router-dom';
import GoodExpandedView from './GoodExpandedView.jsx';
import './CatalogHoc.scss';
import { fetchGoodsByCategoryActionAsync, fetchGoodDetailsActionAsync, fetchGoodByIdActionAsync } from 'AliasReduxActions/goods-actions';
import { fetchExistingCategoriesAsync_X, fetchGoodsByCategoryActionAsync_X, fetchGoodByIdActionAsync_X  } from 'AliasReduxActions/catalog-actions';




class CatalogHoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
      console.log('+ CatalogHoc componentDidMount');
    }

    componentWillUnmount() {
      console.log('- CatalogHoc componentWillUnmount');
    }

    renderNoGoods = ({match}) => {
        return (<div className='CatalogHoc__chooseCatDialog hidden-xs'>Выберите категорию</div>);
    }

    renderGoodsByCategory = ({match}) => {

        const categoryLength =
            this.props.catalog[this.props.match.params.catId]
            && this.props.catalog[this.props.match.params.catId]['goods']['length'];

        return (
            categoryLength
                ? <GoodsList goods={this.props.catalog[this.props.match.params.catId]['goods']} />
                : <div>Loading...</div>
        );
    }

    selectedGood = null;

    renderSelectedGood = ({match}) => {
        const fetchedGood =
            this.props.catalog[this.props.match.params.catId]
            && this.props.catalog[this.props.match.params.catId]['goods']
            && this.props.catalog[this.props.match.params.catId]['goods']
                .find(good => good.idProduct === +this.props.match.params.goodId);

        return (
            fetchedGood
                ? <GoodExpandedView good={fetchedGood} />
                : <div>Loading...</div>
        );

    }

    amount = 0;

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('COMPONENTDIDUPDATE');
        if (this.fetchByCategoryPredicate()) {
            this.amount++;

            // this.fetchedIds[this.props.match.params.catId] = true;
            console.log('fetch goods from category', this.props.match.params.catId);

            const exlcudeId = this.props.catalog[this.props.match.params.catId]['goods']['length'] === 1
                ? this.props.catalog[this.props.match.params.catId]['goods'][0]['idProduct']
                : null

            console.log('exlcude', exlcudeId);
            // this.props.dispatch(fetchGoodsByCategoryActionAsync(+this.props.match.params.catId));

            this.props.dispatch(fetchGoodsByCategoryActionAsync_X(+this.props.match.params.catId, exlcudeId));
        }

        if (this.fetchByGoodIdPredicate()) {
            this.amount++;
            console.log('fetch good', this.props.match.params.goodId);
            this.props.dispatch(fetchGoodByIdActionAsync_X(+this.props.match.params.goodId));
        }

    }

    fetchByCategoryPredicate() {
        const res =
            this.amount < 5                // in case of error boundary
            && this.props.match.params.catId            // catId is in ULR
            && !this.props.match.params.goodId       // no goodId in ULR
            && this.props.catalog[this.props.match.params.catId]['goods']['length'] <= 1;

        console.log('fetchByCategoryPredicate', res);
        return res;
    }

    fetchByGoodIdPredicate() {

        const res =
               this.amount < 5                // in case of error boundary
            && this.props.match.params.goodId // goodId is in ULR
            && !this.props.catalog[this.props.match.params.catId]['goods']['length'] // no goods in particular category

        console.log('fetchByGoodIdPredicate', res);
        return res;
    }



    render() {
        return (
            <Grid fluid className='CatalogHoc__Cnt'>

                <Row>
                    <Col>
                        <Breadcrumbs
                            activeCategoryId={this.props.match.params.catId}
                            activeGoodId={this.props.match.params.goodId}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={4} md={4}>

                        <Categories
                            categories={ Object.keys(this.props.catalog).map(idCategory => this.props.catalog[idCategory]) }
                            dispatch={this.props.dispatch}
                            activeCategoryId={this.props.match.params.catId}
                        />

                    </Col>

                    <Col xs={12} sm={8} md={8}>

                        <Switch>
                            <Route exact path="/catalog"                render={this.renderNoGoods} />
                            <Route exact path='/catalog/:catId'         render={this.renderGoodsByCategory} />
                            <Route exact path='/catalog/:catId/:goodId' render={this.renderSelectedGood} />
                        </Switch>

                    </Col>
                </Row>

            </Grid>
        );
    }
}


const mapStateToProps = (state) => ({
    catalog: state.catalog
});

export default connect(mapStateToProps)(CatalogHoc);

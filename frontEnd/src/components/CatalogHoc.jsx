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



class CatalogHoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderNoGoods = ({match}) => {
        return (<div className='CatalogHoc__chooseCatDialog hidden-xs'>Выберите категорию</div>);
    }

    filteredGoods = [];

    renderGoodsByCategory = ({match}) => {
        this.filteredGoods = this.props.goods
            .filter(good => good.idCategory === +this.props.match.params.catId);

        return (
            this.filteredGoods.length
                ? <GoodsList goods={this.filteredGoods} />
                : <div>Loading...</div>
        );
    }

    selectedGood = null;

    renderSelectedGood = ({match}) => {
        this.selectedGood = this.props.goods
            .find(good => good.idProduct === +this.props.match.params.goodId);

        return (
            this.selectedGood
                ? <GoodExpandedView good={this.selectedGood} />
                : <div>Loading...</div>
        );

    }

    amount = 0;

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('COMPONENTDIDUPDATE');
        if (this.fetchByCategoryPredicate()) {
            console.log('fetch goods from category', this.props.match.params.catId);
            this.props.dispatch(fetchGoodsByCategoryActionAsync(+this.props.match.params.catId, this.selectedGood && this.selectedGood.idProduct));
        }

        if (this.fetchByGoodIdPredicate()) {
            this.amount++;
            console.log('fetch good', this.props.match.params.goodId);
            this.props.dispatch(fetchGoodByIdActionAsync(+this.props.match.params.goodId));
        }

    }

    fetchByCategoryPredicate() {

        const filteredGoodsByCategoryId = this.props.goods
            .filter(good => good.idCategory === +this.props.match.params.catId);

        const res =
               this.props.match.params.catId         // catId is in ULR
            && filteredGoodsByCategoryId.length <= 1 // one or none goods
            && !this.props.match.params.goodId;      // no goodId in ULR
        console.log('fetchByCategoryPredicate', res);
        return res;
    }

    fetchByGoodIdPredicate() {

        const foundGood = this.props.goods
            .find(good => good.idProduct === +this.props.match.params.goodId);

        const res =
               this.amount < 5                // in case of error boundary
            && this.props.match.params.goodId // goodId is in ULR
            && !foundGood;                    // no good in store

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
                            categories={this.props.categories}
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
    goods: state.goods,
    categories: state.categories,
});

export default connect(mapStateToProps)(CatalogHoc);

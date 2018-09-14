import React from 'react';
import Categories from './Categories.jsx';
import GoodsList from './GoodsList.jsx';

import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Breadcrumbs from './Breadcrumbs.jsx';
import { Route, Switch } from 'react-router-dom';
import GoodExpandedView from './GoodExpandedView.jsx';
import './CatalogHoc.scss';
import { fetchGoodsByCategoryActionAsync, fetchGoodByIdActionAsync  } from 'AliasModelSrc/redux/actions/catalog-actions';




class CatalogHoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderNoGoods = () => {
        return (<div className='CatalogHoc__chooseCatDialog hidden-xs'>Выберите категорию</div>);
    }

    renderGoodsByCategory = () => {

        const categoryLength =
            this.props.catalog[this.props.match.params.catId]
            && this.props.catalog[this.props.match.params.catId]['goods']
            && this.props.catalog[this.props.match.params.catId]['goods']['length'];

        return (
            categoryLength
                ? <GoodsList goods={this.props.catalog[this.props.match.params.catId]['goods']} />
                : <div>Loading...</div>
        );
    }

    renderSelectedGood = () => {
        const fetchedGood =
            this.props.catalog[this.props.match.params.catId]
            && this.props.catalog[this.props.match.params.catId]['goods']
                .find(good => good.idProduct === +this.props.match.params.goodId);

        return (
            fetchedGood
                ? <GoodExpandedView good={fetchedGood} />
                : <div>Loading...</div>
        );

    }

    fetchIfNecessary() {
        if (this.fetchByCategoryPredicate()) {

            const options = {
                catId: this.props.match.params.catId,
                enabled: 1,
                exlcudeId: this.props.catalog[this.props.match.params.catId]['goods']['length'] === 1
                    ? this.props.catalog[this.props.match.params.catId]['goods'][0]['idProduct']
                    : null
            };

            this.props.dispatch(fetchGoodsByCategoryActionAsync(options));
        }

        if (this.fetchByGoodIdPredicate()) {
            const options = {
                goodId: this.props.match.params.goodId,
                enabled: 1
            };
            this.props.dispatch(fetchGoodByIdActionAsync(options));
        }

    }

    fetchByCategoryPredicate() {
        const res =
            this.props.match.params.catId            // catId is in ULR
            && !this.props.match.params.goodId       // no goodId in ULR
            && this.props.catalog[this.props.match.params.catId]
            && this.props.catalog[this.props.match.params.catId]['goods']
            && this.props.catalog[this.props.match.params.catId]['goods']['length'] <= 1; // get from DB on fetching catalog  amount of goods in each category
        return res;
    }

    fetchByGoodIdPredicate() {
        const res =
            this.props.match.params.goodId // goodId is in ULR
            && this.props.catalog[this.props.match.params.catId]
            && this.props.catalog[this.props.match.params.catId]['goods']
            && !this.props.catalog[this.props.match.params.catId]['goods']['length']; // no goods in particular category

        return res;
    }

    componentDidMount() {
        this.fetchIfNecessary();
    }

    componentDidUpdate() {
        this.fetchIfNecessary();
    }


    render() {
        return (
            <Grid fluid className='CatalogHoc__Cnt'>

                <Row>
                    <Col>
                        <Breadcrumbs
                            activeCategoryId={this.props.match.params.catId}
                            activeGoodId={this.props.match.params.goodId}
                            catalog={this.props.catalog}
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
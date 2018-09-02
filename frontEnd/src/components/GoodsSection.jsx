import React from 'react';
import Categories from './Categories.jsx';
import GoodsList from './GoodsList.jsx';

import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Breadcrumbs from './Breadcrumbs.jsx';
import { Route, BrowserRouter } from 'react-router-dom';
import GoodExpandedView from './GoodExpandedView.jsx';
import './GoodsSection.scss';

import { setActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';
import { setActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';



class GoodsSection extends React.Component {

    componentWillMount() {
        const pathname = window.location.pathname;
        const re = /^\/catalog\/\d+\/?\d*$/;

        if (pathname.match(re)) {
            const arr = pathname.split('/')
            const catId = +arr[2];
            const goodId = +arr[3];

            if (catId) {
                this.props.dispatch(setActiveCategoryId(catId));
            }

            if (goodId) {
                this.props.dispatch(setActiveGoodIdAction(goodId));
            }

        }

    }


    render() {
        return (
            <Grid fluid className='GoodsSection__Cnt'>

                <Row>
                    <Col>
                        <Breadcrumbs />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={4} md={4}>

                        <Categories
                            categories={this.props.categories}
                            dispatch={this.props.dispatch}
                            activeCategoryId={this.props.activeCategoryId}
                        />

                    </Col>
                    <Col xs={12} sm={8} md={8}>

                        <Route exact path='/catalog' render={() => <div className='GoodsSection__chooseCatDialog hidden-xs'>Выберите категорию</div>} />
                        <Route exact path='/catalog/:catId' component={GoodsList} />
                        { this.props.goods.length && <Route exact path='/catalog/:catId/:goodId' component={GoodExpandedView} />}


                    </Col>
                </Row>

            </Grid>
        );
    }
}


const mapStateToProps = (state) => ({
    goods: state.goods,
    activeCategoryId: state.activeCategoryId,
    categories: state.categories,
});

export default connect(mapStateToProps)(GoodsSection);

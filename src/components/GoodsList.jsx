import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './Spinner.jsx';
import Good from './Good.jsx';

import { fetchGoodsActionAsync } from 'AliasReduxActions/goods-actions';
import { addToCartAction } from 'AliasReduxActions/cart-actions';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';
import './GoodsList.scss';





class GoodsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (!this.props.goods.length) {
            this.props.dispatch(fetchGoodsActionAsync());
        }
    }

    render() {

        return (

            <div className="list-group GoodsList__container">

                <Spinner size='50' />

                <section>
                    {
                        this.props.goods
                            .filter(good => good.idCategory === this.props.activeCategoryId)
                            .map((good, i) => (<Good good={good} key={i}/>))
                    }
                </section>

            </div>


        );
    }
};


const mapStateToProps = (state) => ({
    goods: state.goods,
    activeCategoryId: state.activeCategoryId
});

export default connect(mapStateToProps)(GoodsList);

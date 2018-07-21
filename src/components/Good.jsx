import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchGoodsActionAsync } from 'AliasReduxActions/goods-actions';
import { addToCartAction } from 'AliasReduxActions/cart-actions';
import { setActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';

import DevInfo from './DevInfo.jsx';
import GoodFoldedView from './GoodFoldedView.jsx';
import GoodExpandedView from './GoodExpandedView.jsx';


class Good extends React.Component {

    handleButtonClick(e, goodId) {
        e.preventDefault();
        const payload = {
            goodId,
            amount: 1
        };
        this.props.dispatch(addToCartAction(payload));
    }

    handleGoodClick(goodId) {
        console.log('set good id', goodId);
        this.props.dispatch(setActiveGoodIdAction(goodId));
    }

    render() {
      const isActive = this.props.activeGoodId === this.props.good.idProduct;

        return (
            <Grid fluid>
                <Row>
                  {
                    isActive
                      ? <GoodExpandedView good={this.props.good} mode={this.props.mode} />
                      : <GoodFoldedView good={this.props.good} mode={this.props.mode} />
                  }
                </Row>
            </Grid>
        );
    }
};


const mapStateToProps = (state) => ({
    activeGoodId: state.activeGoodId
});

export default connect(mapStateToProps)(Good);

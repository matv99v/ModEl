import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchGoodsActionAsync } from 'AliasReduxActions/goods-actions';
import { addToCartAction } from 'AliasReduxActions/cart-actions';
import { setActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';
import utils from 'AliasSrc/utils';

import './Good.scss';





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
        return (
            <Grid fluid className={this.props.activeGoodId === this.props.good.idProduct ? "Good__cnt expandedView" : "Good__cnt"} onClick={() => this.handleGoodClick(this.props.good.idProduct)}>
                <Row>
                    <Col xs={3} sm={3} md={3}>
                        <Image src={'https://scm.ncsu.edu/as/scm/i/channels/articles/scm/production-types-of-goods.gif'} thumbnail />
                    </Col>
                    <Col xs={6} sm={6} md={7}>
                        <h5 className="list-group-item-heading">{this.props.good.productName}</h5>
                        <p className="list-group-item-text">{this.props.good.productParams}</p>
                        <p className={utils.isProduction ? 'hidden' : 'dev-label'}>catId:{this.props.good.iDcategory}, goodId:{this.props.good.idProduct}</p>
                    </Col>
                    <Col xs={3} sm={3} md={2}>
                        <div className="Good__price">
                            <h5 className="list-group-item-heading">{this.props.good.declarePrice} грн</h5>
                            <Button onClick={(e) => this.handleButtonClick(e, this.props.good.idProduct)}>В корзину</Button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
};


const mapStateToProps = (state) => ({
    activeGoodId: state.activeGoodId
});

export default connect(mapStateToProps)(Good);

import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchGoodsActionAsync } from 'AliasReduxActions/goods-actions';
import { addToCartAction } from 'AliasReduxActions/cart-actions';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';
import utils from 'AliasSrc/utils';

import './GoodsList.scss';





class GoodsList extends React.Component {
   handleButtonClick(e, goodId) {
       e.preventDefault();
       const payload = {
           goodId,
           amount: 1
       };
       this.props.dispatch(addToCartAction(payload));
    }

    render() {

        // use passed categoryId or use it from URL
        const catId = this.props.id || +this.props.match.params.id;

        const good = this.props.goods.find(good => {
            return good.idproduct == catId;
        });


        return (
            <Grid fluid>
                <Row>
                    <Col xs={3} sm={3} md={3}>
                        <Image src={'https://scm.ncsu.edu/as/scm/i/channels/articles/scm/production-types-of-goods.gif'} thumbnail />
                    </Col>
                    <Col xs={6} sm={6} md={7}>
                        <h5 className="list-group-item-heading">{good.product_name}</h5>
                        <p className="list-group-item-text">{good.DESCRIPTION}</p>
                        <p className={utils.isProduction ? 'hidden' : 'dev-label'}>catId:{good.idcategory}, goodId:{good.idproduct}</p>
                    </Col>
                    <Col xs={3} sm={3} md={2}>
                        <div className="Good__price">
                            <h5 className="list-group-item-heading">{good.Declare_price} грн</h5>
                            <Button onClick={(e) => this.handleButtonClick(e, good.idproduct)}>В корзину</Button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
};


const mapStateToProps = (state) => ({
    goods: state.goods,
});

export default connect(mapStateToProps)(GoodsList);

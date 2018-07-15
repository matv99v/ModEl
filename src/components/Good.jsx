import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchGoodsActionAsync } from 'AliasReduxActions/goods-actions';
import { addToCartAction } from 'AliasReduxActions/cart-actions';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';
import './GoodsList.scss';





class GoodsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            good: props.good
        };
    }

    componentWillMount() {
        // this.props.dispatch(fetchGoodsActionAsync());
        // console.log(this.props);

        // console.log(good);

        if (!this.state.good) {
            const good = this.props.goods.find(good => good.idproduct === +this.props.match.params.id)
            this.setState({ good });
        }
    }

   handleButtonClick(e, goodId) {
       e.preventDefault();
       const payload = {
           goodId,
           amount: 1
       };
       this.props.dispatch(addToCartAction(payload));
    }

    render() {

        return (
            <Grid fluid>
                <Row>
                    <Col xs={3} sm={3} md={3}>
                        <Image src={'https://scm.ncsu.edu/as/scm/i/channels/articles/scm/production-types-of-goods.gif'} thumbnail />
                    </Col>
                    <Col xs={6} sm={6} md={7}>
                        <h5 className="list-group-item-heading">{this.state.good.product_name}</h5>
                        <p className="list-group-item-text">{this.state.good.DESCRIPTION}</p>
                    </Col>
                    <Col xs={3} sm={3} md={2}>
                        <div className="Good__price">
                            <h5 className="list-group-item-heading">{this.state.good.Declare_price} грн</h5>
                            <Button onClick={(e) => this.handleButtonClick(e, this.state.good.idproduct)}>В корзину</Button>
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

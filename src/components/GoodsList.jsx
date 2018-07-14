import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './Spinner.jsx';

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
        this.props.dispatch(fetchGoodsActionAsync());

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

            <div className="list-group GoodsList__container">

                <Spinner size='50' />

                {
                    this.props.goods
                        .filter(good => {
                            // if no filterId then no filtering
                            return !this.props.filterId || good.ID == this.props.filterId;
                        })
                        .filter(good => {
                            return good.idcategory === this.props.activeCategoryId
                        })
                        .map((good, i) => {
                            const url = `/catalog/${good.ID}`;
                            return (
                                <Link to={url} className="list-group-item" key={i}>

                                    <Grid fluid>
                                        <Row>
                                            <Col xs={3} sm={3} md={3}>
                                                <Image src={'https://scm.ncsu.edu/as/scm/i/channels/articles/scm/production-types-of-goods.gif'} thumbnail />
                                            </Col>
                                            <Col xs={6} sm={6} md={7}>
                                                <h5 className="list-group-item-heading">{good.product_name}</h5>
                                                <p className="list-group-item-text">{good.DESCRIPTION}</p>
                                            </Col>
                                            <Col xs={3} sm={3} md={2}>
                                                <div className="Good__price">
                                                    <h5 className="list-group-item-heading">{good.Declare_price} грн</h5>
                                                    <Button onClick={(e) => this.handleButtonClick(e, good.ID)}>В корзину</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>

                                </Link>
                            );
                        })
                }

            </div>


        );
    }
};


const mapStateToProps = (state) => ({
    goods: state.goods,
    activeCategoryId: state.activeCategoryId
});

export default connect(mapStateToProps)(GoodsList);

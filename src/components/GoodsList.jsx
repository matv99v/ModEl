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
        this.props.dispatch(fetchGoodsActionAsync());
    }

    render() {

        return (

            <div className="list-group GoodsList__container">

                <Spinner size='50' />

                {
                    this.props.goods
                        .filter(good => {
                            return good.idcategory === this.props.activeCategoryId
                        })
                        .map((good, i) => {
                            const url = `/catalog/${good.idproduct}`;

                            return (
                                <Link
                                    to={url}
                                    className="list-group-item"
                                    key={i}
                                >
                                    <Good good={good}/>
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

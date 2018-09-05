import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import { Image, Grid, Row, Col, Button, ListGroupItem, ListGroup } from 'react-bootstrap';
import './GoodsList.scss';
import GoodFoldedView from './GoodFoldedView.jsx';
import { setActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';




class GoodsList extends React.Component {
    handleGoodClick = (goodId) => {
        this.props.dispatch(setActiveGoodIdAction(goodId));
    }

    render() {
        return (
            <ListGroup className="GoodsList__container" >
                {
                    this.props.goods
                        .filter(good => good.idCategory === this.props.activeCategoryId)
                        .map((good, i) => (
                            <li className="list-group-item"
                                key={i}
                                onClick={() => this.handleGoodClick(good.idProduct)}
                            >

                                <Link
                                    href={`/catalog/${good.idCategory}/${good.idProduct}`}
                                    to={`/catalog/${good.idCategory}/${good.idProduct}`}
                                >
                                    <GoodFoldedView good={good}/>
                                </Link>
                            </li>
                    ))
                }
          </ListGroup>
        );
    }
};

const mapStateToProps = (state) => ({
    goods: state.goods,
    activeCategoryId: state.activeCategoryId
});

export default connect(mapStateToProps)(GoodsList);

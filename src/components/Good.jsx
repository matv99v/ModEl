import React from 'react';
import { Image, Grid, Row, Col, Button } from 'react-bootstrap';
import { addToCartAction } from 'AliasReduxActions/cart-actions';
import { connect } from 'react-redux';

import './Good.scss';


class Good extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleButtonClick(e, goodId) {
        e.preventDefault();
        this.props.dispatch(addToCartAction(goodId));
    }

    render() {
        return (
            <Grid fluid className='Good__cnt'>
                <Row>
                    <Col xs={3} sm={3} md={3}>
                        <Image src={this.props.good.PHOTOS[0]} responsive thumbnail />
                    </Col>
                    <Col xs={6} sm={6} md={7}>
                        <h5 className="list-group-item-heading">{this.props.good.NAME}</h5>
                        <p className="list-group-item-text">{this.props.good.DESCRIPTION}</p>
                    </Col>
                    <Col xs={3} sm={3} md={2}>
                        <div className="Good__price">
                            <h5 className="list-group-item-heading">{this.props.good.PRICE} грн</h5>
                            <Button onClick={(e) => this.handleButtonClick(e, this.props.good.ID)}>В корзину</Button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}


const mapStateToProps = (state) => ({
    cart: state.cart
});

export default connect(mapStateToProps)(Good);

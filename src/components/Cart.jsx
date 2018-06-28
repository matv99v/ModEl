import React from 'react';
import './Cart.scss';
import { Image, Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: JSON.parse(localStorage.getItem("ModElCart")) || []
        };
    }

    handleUpClick(e) {
        e.preventDefault();
        console.log('handleUpClick');
    }

    handleDownClick(e) {
        e.preventDefault();
        console.log('handleDownClick');
    }


    render() {
        return (
            <div className="list-group Cart__cnt">
                {
                    this.state.goods
                        .map((good, i) => {
                            const url = `/catalog/${good.ID}`;
                            return (
                                <Link to={url} className="list-group-item" key={i}>
                                    <Grid fluid>
                                        <Row>
                                            <Col xs={3} sm={3} md={3}>
                                                <Image src={good.PHOTOS[0]} responsive thumbnail />
                                            </Col>
                                            <Col xs={6} sm={6} md={6}>
                                                <h5 className="list-group-item-heading">{good.NAME}</h5>
                                                <p className="list-group-item-text">{good.DESCRIPTION}</p>
                                            </Col>
                                            <Col xs={3} sm={3} md={3}>
                                                <div className="Item__price">
                                                    <h5 className="list-group-item-heading">{good.PRICE} грн</h5>
                                                    <ButtonGroup bsSize="large">
                                                        <Button onClick={(e) => this.handleDownClick(e)}>—</Button>
                                                        <Button onClick={(e) => e.preventDefault()}>1</Button>
                                                        <Button onClick={(e) => this.handleUpClick(e)}>+</Button>
                                                    </ButtonGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </Link>
                            );
                        })
                }

                <div className="Order__cnt">
                    <Button bsSize="large" bsStyle="success">Оформить заказ</Button>
                </div>

            </div>

        );
    }
}

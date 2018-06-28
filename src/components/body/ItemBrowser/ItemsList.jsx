import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { Image, Grid, Row, Col, Button } from 'react-bootstrap';

import './ItemsList.scss';





export default class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/goods')
           .then(response => response.json())
           .then(data => this.setState({goods: data}))
           .catch(err => console.error(err));
   }

   handleButtonClick(e, good) {
       e.preventDefault();
       alert(`Товар ${good.NAME} добавлен в корзину`);
       const cart = JSON.parse(localStorage.getItem("ModElCart")) || [];
       cart.push(good);
       localStorage.setItem("ModElCart", JSON.stringify(cart));
   }

   componentWillRecieveProps

    render() {
        console.log(this.state.goods);

        return (

            <div className="list-group ItemsList__container">
                {
                    this.state.goods
                        .filter(good => {
                            // if no filterId then no filtering
                            return !this.props.filterId || good.ID == this.props.filterId;
                        })
                        .map((good, i) => {
                            const url = `/catalog/${good.ID}`;
                            return (
                                <Link to={url} className="list-group-item" key={i}>
                                    <Grid fluid>
                                        <Row>
                                            <Col xs={3} sm={3} md={3}>
                                                <Image src={good.PHOTOS[0]} responsive thumbnail />
                                            </Col>
                                            <Col xs={6} sm={6} md={7}>
                                                <h5 className="list-group-item-heading">{good.NAME}</h5>
                                                <p className="list-group-item-text">{good.DESCRIPTION}</p>
                                            </Col>
                                            <Col xs={3} sm={3} md={2}>
                                                <div className="Item__price">
                                                    <h5 className="list-group-item-heading">{good.PRICE} грн</h5>
                                                    <Button onClick={(e) => this.handleButtonClick(e, good)}>В корзину</Button>
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
}

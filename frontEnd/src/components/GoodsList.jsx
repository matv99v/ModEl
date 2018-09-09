import React from 'react';
import { Route, Link } from 'react-router-dom';

import { Image, Grid, Row, Col, Button, ListGroupItem, ListGroup } from 'react-bootstrap';
import './GoodsList.scss';
import GoodFoldedView from './GoodFoldedView.jsx';




export default class GoodsList extends React.Component {

    render() {
        return (
            <ListGroup className="GoodsList__container" >
                {
                    this.props.goods
                        .map((good, i) => (
                            <li className="list-group-item"
                                key={i}
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

import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Good from './Good.jsx';

import { Image, Grid, Row, Col, Button, ListGroupItem, ListGroup } from 'react-bootstrap';
import './GoodsList.scss';



export default class GoodsList extends React.Component {
    render() {
        return (
          <ListGroup className="GoodsList__container">
              {
                  this.props.goods
                      .map((good, i) => (
                        <ListGroupItem key={i} className={this.props.isFoldedView && "hoverable"}>
                            <Good good={good} mode={this.props.mode}/>
                        </ListGroupItem>
                      ))
              }
          </ListGroup>
        );
    }
};

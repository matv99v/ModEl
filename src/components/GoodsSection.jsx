import React from 'react';
import Categories from './Categories.jsx';
import GoodsList from './GoodsList.jsx';

import { Grid, Row, Col } from 'react-bootstrap';



export default class GoodsSection extends React.Component {
    render() {
        return (
            <Grid fluid>

                <Row>
                    <Col xs={12} sm={3} md={3}>
                        <Categories />
                    </Col>
                    <Col xs={12} sm={9} md={9}>
                        <GoodsList filterId={this.props.match.params.id} />
                    </Col>
                </Row>

            </Grid>
        );
    }
}

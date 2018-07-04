import React from 'react';
import GoodsCategories from './GoodsCategories.jsx';
import GoodsList from './GoodsList.jsx';

import { Grid, Row, Col } from 'react-bootstrap';



export default class GoodsSection extends React.Component {
    render() {
        return (
            <Grid fluid>

                <Row>
                    <Col xs={3} sm={3} md={3}>
                        <GoodsCategories />
                    </Col>
                    <Col xs={9} sm={9} md={9}>
                        <GoodsList filterId={this.props.match.params.id} />
                    </Col>
                </Row>

            </Grid>
        );
    }
}

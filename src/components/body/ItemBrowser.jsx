import React from 'react';
import ItemCategories from './ItemBrowser/ItemCategories.jsx';
import ItemsList from './ItemBrowser/ItemsList.jsx';
import SearchItem from './SearchItem.jsx';

import { Grid, Row, Col } from 'react-bootstrap';



export default class ItemBrowser extends React.Component {
    render() {

        console.log(this.props.match.params.id);

        return (
            <Grid fluid>

                <Row style={{display: 'none'}}>
                    <SearchItem />
                </Row>

                <Row>
                    <Col xs={4} md={2}>
                        <ItemCategories />
                    </Col>
                    <Col xs={8} md={10}>
                        <ItemsList filterId={this.props.match.params.id} />
                    </Col>
                </Row>

            </Grid>
        );
    }
}

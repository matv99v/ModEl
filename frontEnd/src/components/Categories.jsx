import React from 'react';
import { Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import { fetchExistingCategoriesAsync } from 'AliasReduxActions/categories-actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



export default class Categories extends React.Component {

    render() {
        return (
          <Grid fluid>
              <Row>
                <Col className={this.props.activeCategoryId ? 'hidden-xs' : ''}>
                    <Nav bsStyle="pills" stacked activeKey={this.props.activeCategoryId}>
                      {
                        this.props.categories.map((cat, k) => (
                          <NavItem
                              key={k}
                              eventKey={cat.idCategory}
                              componentClass={Link}
                              href={`/catalog/${cat.idCategory}`}
                              to={`/catalog/${cat.idCategory}`}
                          >
                              {cat.CategoryName}
                          </NavItem>

                        ))
                      }
                    </Nav>
                </Col>
              </Row>
          </Grid>
        );
    }
};

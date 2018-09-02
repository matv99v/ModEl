import React from 'react';
import { Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import { fetchExistingCategoriesAsync } from 'AliasReduxActions/categories-actions';
import { connect } from 'react-redux';
import { setActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';
import { unsetActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';
import { Link } from 'react-router-dom';



export default class Categories extends React.Component {
    handleCategorySelection = (cat) => {
        this.props.dispatch(setActiveCategoryId(cat));
        this.props.dispatch(unsetActiveGoodIdAction());
    }

    render() {
        return (
          <Grid fluid>
              <Row>
                <Col className={this.props.activeCategoryId ? 'hidden-xs' : ''}>
                    <Nav bsStyle="pills" stacked activeKey={this.props.activeCategoryId} onSelect={this.handleCategorySelection}>
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

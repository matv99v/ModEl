import React from 'react';
import { Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import { fetchExistingCategoriesAsync } from 'AliasReduxActions/categories-actions';
import { connect } from 'react-redux';
import { setActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';
import { unsetActiveGoodIdAction, setActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';
import './Categories.scss';





export default class Categories extends React.Component {
    handleCategorySelection(cat, k) {
        this.props.dispatch(setActiveCategoryId(cat.idCategory));
        this.props.dispatch(unsetActiveGoodIdAction());
    }

    handleGoodSelection(goodId, e) {
        e.stopPropagation();
        this.props.dispatch(setActiveGoodIdAction(goodId));
    }

    isCategoryActive(catId) {
      return this.props.activeCategoryId === catId && !this.props.activeGoodId;
    }

    isGoodActive(goodId) {
      return this.props.activeGoodId === goodId;
    }

    render() {
        return (
          <Grid fluid>
          <Row>
          <Col className="Categories__cnt">
          <ul>
              {
                  this.props.categories.map((cat, k) => (
                    <li
                        onClick={() => this.handleCategorySelection(cat, k)}
                        key={k}
                    >
                        <div className={this.isCategoryActive(cat.idCategory) ? "Categories__singleItem active" : "Categories__singleItem"} >
                            {cat.CategoryName}
                        </div>

                        {
                            this.props.activeCategoryId === cat.idCategory &&

                            <ul>
                                {
                                    this.props.activeCategoryGoods.map((good, i) => (
                                        <li
                                            key={i}
                                            onClick={(e) => this.handleGoodSelection(good.idProduct, e)}
                                            className={this.isGoodActive(good.idProduct) ? "Categories__singleSubitem active" : "Categories__singleSubitem"}
                                        >
                                            {good.productName}
                                        </li>
                                    ))
                                }
                            </ul>
                        }

                    </li>
                  ))
              }
          </ul>

          </Col>
          </Row>


          </Grid>

        );
    }
};

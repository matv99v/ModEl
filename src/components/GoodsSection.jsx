import React from 'react';
import Categories from './Categories.jsx';
import GoodsList from './GoodsList.jsx';

import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchGoodsActionAsync } from 'AliasReduxActions/goods-actions';
import { fetchExistingCategoriesAsync } from 'AliasReduxActions/categories-actions';





class GoodsSection extends React.Component {

  componentWillMount() {
      if (!this.props.goods.length) {
          this.props.dispatch(fetchGoodsActionAsync());
      }

      if (!this.props.categories.length) {
          this.props.dispatch(fetchExistingCategoriesAsync());
      }
  }

    render() {

      const activeCategoryGoods = this.props.goods
        .filter(good => good.idCategory === this.props.activeCategoryId);

      const goodsList = this.props.activeGoodId
          ? this.props.goods.filter(good => good.idProduct === this.props.activeGoodId)
          : activeCategoryGoods;

        return (
            <Grid fluid>

                <Row>
                    <Col xs={12} sm={4} md={4}>

                        <Categories
                            categories={this.props.categories}
                            activeCategoryGoods={activeCategoryGoods}
                            dispatch={this.props.dispatch}
                            activeCategoryId={this.props.activeCategoryId}
                            activeGoodId={this.props.activeGoodId}
                        />

                    </Col>
                    <Col xs={12} sm={8} md={8}>

                        <GoodsList
                            goods={goodsList}
                            mode="catalog"
                        />

                    </Col>
                </Row>

            </Grid>
        );
    }
}


const mapStateToProps = (state) => ({
    goods: state.goods,
    activeCategoryId: state.activeCategoryId,
    categories: state.categories,
    activeGoodId: state.activeGoodId
});

export default connect(mapStateToProps)(GoodsSection);

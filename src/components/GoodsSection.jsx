import React from 'react';
import Categories from './Categories.jsx';
import GoodsList from './GoodsList.jsx';

import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveGoodsActionAsync } from 'AliasReduxActions/goods-actions';





class GoodsSection extends React.Component {

  componentWillMount() {
      if (!this.props.goods.length) {
          this.props.dispatch(saveGoodsActionAsync());
      }
  }

    render() {

      const activeCategoryGoods = this.props.goods
        .filter(good => good.idCategory === this.props.activeCategoryId);


        return (
            <Grid fluid>

                <Row>
                    <Col xs={12} sm={3} md={3}>
                        <Categories />
                    </Col>
                    <Col xs={12} sm={9} md={9}>
                        <GoodsList goods={activeCategoryGoods} mode="catalog"/>
                    </Col>
                </Row>

            </Grid>
        );
    }
}


const mapStateToProps = (state) => ({
    goods: state.goods,
    activeCategoryId: state.activeCategoryId
});

export default connect(mapStateToProps)(GoodsSection);

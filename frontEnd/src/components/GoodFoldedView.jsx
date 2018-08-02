import React from 'react';
import './GoodFoldedView.scss';

import { connect } from 'react-redux';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';
import DevInfo from './DevInfo.jsx';
import GoodName from './common/GoodName.jsx';
import GoodPrice from './common/GoodPrice.jsx';
import { setActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';
import apiUrls from 'AliasSrc/apiUrls';
import GoodAmountInput from './GoodAmountInput.jsx';
import { removeFromCartAction } from 'AliasReduxActions/cart-actions';





class GoodFoldedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleGoodClick(e, goodId) {
        this.props.dispatch(setActiveGoodIdAction(goodId));
    }

    handleRemoveItem(e, id) {
        e.stopPropagation();
        this.props.dispatch(removeFromCartAction(id));
    }

    render() {
      const imgSrc = this.props.good.photosAmount ? apiUrls.goodPhoto(this.props.good.idProduct, 1) : apiUrls.defaultGoodPhoto;

      const isCartMode = this.props.mode === 'cart';

      return (
        <div className="GoodFoldedView__cnt" onClick={(e) => this.handleGoodClick(e, this.props.good.idProduct)}>

        {
          isCartMode &&
          <div className='GoodFoldedView__removeCross'>
            <span className="glyphicon glyphicon-remove-circle" onClick={(e) => this.handleRemoveItem(e, this.props.good.idProduct)}></span>
          </div>
        }


          <div className="GoodFoldedView__imageCnt">
              <Image src={imgSrc} thumbnail />

              <div className="GoodFoldedView__priceCnt__small">
                  <GoodPrice
                    value={this.props.good.declarePrice}
                    type="vertical"
                    goodId={this.props.good.idProduct}
                  />
              </div>


          </div>

          <div className="GoodFoldedView__goodName">

              <GoodName value={this.props.good.productName}/>
              <p dangerouslySetInnerHTML={{__html: this.props.good.detailName}}></p>



              <DevInfo>
                catId:{this.props.good.idCategory}, goodId:{this.props.good.idProduct}
              </DevInfo>
          </div>

          <div className="GoodFoldedView__priceCnt__big">
            {
              isCartMode
                ? <GoodAmountInput
                    good={this.props.good}
                  />
                : <GoodPrice
                    value={this.props.good.declarePrice}
                    type="vertical"
                    goodId={this.props.good.idProduct}
                  />

            }

          </div>

          {
            isCartMode &&
              <div className="GoodFoldedView__sumCnt__big">
                  {this.props.good.declarePrice * this.props.cart[this.props.good.idProduct]} грн
              </div>
          }



        </div>
      );
    }
};

const mapStateToProps = (state) => ({
  cart: state.cart
});

export default connect(mapStateToProps)(GoodFoldedView);

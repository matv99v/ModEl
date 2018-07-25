import React from 'react';
import './GoodExpandedView.scss';
import { Carousel } from 'react-bootstrap';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';

import GoodName from './common/GoodName.jsx';
import GoodPrice from './common/GoodPrice.jsx';

import apiUrls from 'AliasSrc/apiUrls';
import DevInfo from './DevInfo.jsx';

import { unsetActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';
import { fetchGoodDetailsActionAsync } from 'AliasReduxActions/goods-actions';

import { connect } from 'react-redux';








class GoodExpandedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleGoodClick() { // temporary not working due to return false in onClick
      this.props.dispatch(unsetActiveGoodIdAction());
    }

    componentWillMount() {
      this.props.dispatch(fetchGoodDetailsActionAsync(this.props.good.idProduct));
    }

    render() {

      const isCartMode = this.props.mode === 'cart';

        return (
            <div className='GoodExpandedView__cnt'
              onClick={(e) => false && this.handleGoodClick(e, this.props.good.idProduct)}
            >

              <GoodName value={this.props.good.productName} />

              <div className="GoodExpandedView__head">

                <div className="GoodExpandedView__carouselBox">
                  <Carousel onClick={e => e.stopPropagation()}>
                    {
                      Array
                        .apply(null, {length: this.props.good.photosAmount || 1}) // if no photo, apply the standart one
                        .map((el, i) => {

                          const imgSrc = this.props.good.photosAmount ? apiUrls.goodPhoto(this.props.good.idProduct, i+1) : apiUrls.defaultGoodPhoto;

                          return (
                            <Carousel.Item key={i}>
                              <img alt={this.props.good.productName} src={imgSrc} />
                            </Carousel.Item>
                          )
                        })
                    }
                  </Carousel>
                </div>

                <div className="GoodExpandedView__maininfo">
                  <GoodPrice
                    value={this.props.good.declarePrice}
                    type="vertical"
                    goodId={this.props.good.idProduct}
                  />
                </div>
              </div>


              <div className="GoodExpandedView__descriptionCnt">

                <h5>productParams</h5>
                <div dangerouslySetInnerHTML={{__html: this.props.good.productParams}}></div>

                <h5>textDescrip</h5>
                <div dangerouslySetInnerHTML={{__html: this.props.good.textDescrip}}></div>

                <DevInfo>
                  catId:{this.props.good.idCategory}, goodId:{this.props.good.idProduct}
                </DevInfo>

              </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(GoodExpandedView);

import React from 'react';
import './GoodExpandedView.scss';
import { Carousel } from 'react-bootstrap';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';

import GoodName from './common/GoodName.jsx';
import GoodPrice from './common/GoodPrice.jsx';

import apiUrls from 'AliasSrc/apiUrls';
import DevInfo from './DevInfo.jsx';

import { unsetActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';

import { connect } from 'react-redux';








class GoodExpandedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleGoodClick() {
      this.props.dispatch(unsetActiveGoodIdAction());
    }

    render() {

      const isCartMode = this.props.mode === 'cart';

        return (
            <div className='GoodExpandedView__cnt' onClick={(e) => this.handleGoodClick(e, this.props.good.idProduct)}>

              <span className="GoodExpandedView__fold glyphicon glyphicon-resize-vertical"></span>

              <div className="GoodExpandedView__carouselCnt">
                <Carousel onClick={e => e.stopPropagation()}>
                  {
                    Array
                      .apply(null, {length: this.props.good.photosAmount || 1})
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

              <div className="GoodExpandedView__descriptionCnt">
                <GoodName value={this.props.good.productName} />

                <section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </section>

                <DevInfo>
                  catId:{this.props.good.idCategory}, goodId:{this.props.good.idProduct}
                </DevInfo>


                <GoodPrice
                  value={this.props.good.declarePrice}
                  type="stretched"
                  goodId={this.props.good.idProduct}
                />

              </div>



            </div>
        );
    }
}


const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(GoodExpandedView);

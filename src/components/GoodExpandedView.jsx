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

    handleGoodClick() {
      this.props.dispatch(unsetActiveGoodIdAction());
    }

    componentWillMount() {
      console.log('fetch');
      this.props.dispatch(fetchGoodDetailsActionAsync(this.props.good.idProduct));
    }

    render() {

      const isCartMode = this.props.mode === 'cart';

        return (
            <div
              className='GoodExpandedView__cnt'
              onClick={(e) => this.handleGoodClick(e, this.props.good.idProduct)}
            >

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

                <section  dangerouslySetInnerHTML={{__html: this.props.good.textDescrip}}></section>

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

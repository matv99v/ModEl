import React from 'react';
import './GoodExpandedView.scss';
import { Carousel } from 'react-bootstrap';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';

import GoodName from './common/GoodName.jsx';
import GoodPrice from './common/GoodPrice.jsx';
import FoldableText from './common/FoldableText.jsx';
import ControlledCarousel from './common/ControlledCarousel.jsx';

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

              <div className="GoodExpandedView__head">

                <div>
                  <GoodName value={this.props.good.productName} />
                  <p dangerouslySetInnerHTML={{__html: this.props.good.detailName}}></p>
                </div>

                <GoodPrice
                  value={this.props.good.declarePrice}
                  type="vertical"
                  goodId={this.props.good.idProduct}
                />

              </div>


              <ControlledCarousel good={this.props.good}/>

              <div className="GoodExpandedView__descriptionCnt">

                { this.props.good.productParams &&
                  <FoldableText>
                    <h5>Технические характеристики</h5>
                    <div dangerouslySetInnerHTML={{__html: this.props.good.productParams}}></div>
                  </FoldableText>
                }

                { this.props.good.textDescrip &&
                  <FoldableText>
                    <h5>Описание</h5>
                    <div dangerouslySetInnerHTML={{__html: this.props.good.textDescrip}}></div>
                  </FoldableText>
                }

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

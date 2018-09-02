import React from 'react';
import './GoodExpandedView.scss';
import { Carousel } from 'react-bootstrap';

import { Image, Grid, Row, Col, Button } from 'react-bootstrap';

import GoodName from './common/GoodName.jsx';
import GoodPrice from './common/GoodPrice.jsx';
import FoldableText from './common/FoldableText.jsx';
import FoldableText2 from './common/FoldableText2.jsx';
import FoldableText3 from './common/FoldableText3.jsx';
import ControlledCarousel from './common/ControlledCarousel.jsx';

import apiUrls from 'AliasSrc/apiUrls';
import DevInfo from './DevInfo.jsx';

import { unsetActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';
import { fetchGoodDetailsActionAsync } from 'AliasReduxActions/goods-actions';

import { connect } from 'react-redux';








class GoodExpandedView extends React.Component {
    handleGoodClick() { // temporary not working due to return false in onClick
      this.props.dispatch(unsetActiveGoodIdAction());
    }

    componentWillMount() {
      this.props.dispatch(fetchGoodDetailsActionAsync(this.props.good.idProduct));
    }

    render() {

        const goodFoldableDetails = [
            {
                head: "Технические характеристики",
                body: this.props.good.productParams
            },
            {
                head: "Описание",
                body: this.props.good.textDescrip
            }
        ].filter(el => !!el.body);

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


              <div className='GoodExpandedView__carouselCnt'>
                  <ControlledCarousel good={this.props.good}/>
              </div>

              <div className="GoodExpandedView__descriptionCnt">

                  {false && <FoldableText2 data={goodFoldableDetails} />}
                  <FoldableText3 />

                  {
                      goodFoldableDetails.map((el, i) => (
                          <FoldableText3 head={el.head} body={el.body} key={i}/>
                      ))
                  }

                  <DevInfo>
                      catId:{this.props.good.idCategory}, goodId:{this.props.good.idProduct}
                  </DevInfo>

              </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
  return ({
    good: state.goods.find(good => good.idProduct === state.activeGoodId)
})};

export default connect(mapStateToProps)(GoodExpandedView);

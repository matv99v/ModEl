import React from 'react';
import './GoodFoldedView.scss';
import { Image } from 'react-bootstrap';
import DevInfo from './DevInfo.jsx';
import GoodName from './common/GoodName.jsx';
import GoodPrice from './common/GoodPrice.jsx';
import urls from '../../api/urls';


export default class GoodFoldedView extends React.Component {

    render() {
        const imgSrc = this.props.good.photosAmount ? urls.goodPhotoThumbnail(this.props.good.idProduct, 1) : '../assets/good_default_image.svg';

        return (
            <div className="GoodFoldedView__cnt" >

                <div className="GoodFoldedView__imageCnt">
                    <Image src={imgSrc} thumbnail />

                    <div className="GoodFoldedView__priceCnt__small visible-xs">
                        <GoodPrice
                            value={this.props.good.declarePrice}
                            type="vertical"
                            goodId={this.props.good.idProduct}
                        />
                    </div>


                </div>

                <div className="GoodFoldedView__goodName">

                    <GoodName value={this.props.good.productName}/>
                    <p dangerouslySetInnerHTML={{__html: this.props.good.detailName}} className="hidden-xs"></p>

                    <DevInfo>
                        catId:{this.props.good.idCategory}, goodId:{this.props.good.idProduct}
                    </DevInfo>
                </div>

                <div className="GoodFoldedView__priceCnt__big hidden-xs">
                    <GoodPrice
                        value={this.props.good.declarePrice}
                        type="vertical"
                        goodId={this.props.good.idProduct}
                    />
                </div>

            </div>
        );
    }
}

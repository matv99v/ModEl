import React from 'react';
import './GoodFoldedView.scss';
import { Image } from 'react-bootstrap';
import DevInfo from './DevInfo.jsx';
import GoodName from './common/GoodName.jsx';
import GoodPrice from './common/GoodPrice.jsx';
import apiUrls from 'AliasSrc/api/apiUrls';


export default class GoodFoldedView extends React.Component {

    render() {
        const imgSrc = this.props.good.photosAmount ? apiUrls.goodPhotoThumbnail(this.props.good.idProduct, 1) : apiUrls.defaultGoodPhoto;

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
                    <p dangerouslySetInnerHTML={{__html: this.props.good.detailName}}></p>

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

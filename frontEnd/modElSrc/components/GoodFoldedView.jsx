import React from 'react';
import './GoodFoldedView.scss';
import { Image } from 'react-bootstrap';
import DevInfo from './DevInfo';
import GoodName from './common/GoodName';
import GoodPrice from './common/GoodPrice';
import urls from '../../api/urls';
import DefaultGoodImg from './common/DefaultGoodImg';



export default class GoodFoldedView extends React.Component {

    renderDefaultImg() {
        return (
            <DefaultGoodImg />
        );
    }


    render() {
        return (
            <div className="GoodFoldedView__cnt" >

                <div className="GoodFoldedView__imageCnt">
                    {
                        this.props.good.photosAmount
                            ? <Image src={urls.goodPhotoThumbnail(this.props.good.idProduct, 1)} thumbnail />
                            : <DefaultGoodImg />
                    }

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

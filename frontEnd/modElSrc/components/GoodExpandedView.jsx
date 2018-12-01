import React from 'react';
import './GoodExpandedView.scss';

import GoodName from './common/GoodName';
import GoodPrice from './common/GoodPrice';
import FoldableText from './common/FoldableText';
import ControlledCarousel from './common/ControlledCarousel';

import DevInfo from './DevInfo';


export default class GoodExpandedView extends React.Component {
    render() {
        const goodFoldableDetails = [
            {
                head: 'Технические характеристики',
                body: this.props.good.productParams
            },
            {
                head: 'Описание',
                body: this.props.good.textDescrip
            }
        ].filter(el => !!el.body);

        return (
            <div className='GoodExpandedView__cnt'>

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

                    {
                        goodFoldableDetails.map((el, i) => (
                            <FoldableText head={el.head} body={el.body} key={i}/>
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

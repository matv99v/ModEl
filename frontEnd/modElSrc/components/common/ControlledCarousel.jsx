import React from 'react';
import { Carousel } from 'react-bootstrap';
import urls from 'AliasApi/urls';


import './ControlledCarousel.scss';

export default class ControlledCarousel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null
        };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    render() {
        const { index, direction } = this.state;

        return (
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
                className="ControlledCarousel__cnt"
            >

                {
                    Array
                        .apply(null, {length: this.props.good.photosAmount || 1}) // if no photo, apply the standart one
                        .map((el, i) => {


                            return (
                                <Carousel.Item key={i}>

                                    {
                                        this.props.good.photosAmount
                                            ? <div
                                                className='ControlledCarousel__imgCnt'
                                                style={{background: `url(${urls.goodPhotoMedium(this.props.good.idProduct, i+1)}) no-repeat center center / contain`}}
                                            ></div>
                                            : <div className='ControlledCarousel__imgDefault'></div>
                                    }

                                    <div className="ControlledCarousel__goodId">ID: {this.props.good.idProduct}</div>
                                </Carousel.Item>
                            );
                        })
                }


            </Carousel>
        );
    }
}

import React from 'react';
import './SingleItem.scss';

export default class SingleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='SingleItem__container'>

                <div>
                    Name: {this.props.name}
                </div>

                <div>
                    Description: {this.props.description}
                </div>

                <div>
                    Price: {this.props.price} UAH
                </div>

                {
                    this.props.photos.map((photoUrl, i) => {
                        return (
                            <img
                                className='SingleItem__img'
                                src={photoUrl}
                                key={i}
                            />
                        );
                    })
                }




            </div>
        );
    }
}

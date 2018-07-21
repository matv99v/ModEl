import React from 'react';
import './GoodName.scss';

export default class GoodName extends React.Component {

    render() {
        return (
            <div className="GoodName__cnt">
              {this.props.value}
            </div>

        );
    }
}

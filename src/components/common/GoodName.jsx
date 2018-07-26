import React from 'react';
import './GoodName.scss';

export default class GoodName extends React.Component {

    render() {
        return (
            <h4 className="GoodName__cnt">
              {this.props.value}
            </h4>

        );
    }
}

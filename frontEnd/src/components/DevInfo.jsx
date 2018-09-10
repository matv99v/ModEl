import React from 'react';
import './DevInfo.scss';

export default class DevInfo extends React.Component {
    render() {
        return (
            <div className={process.env.NODE_ENV === 'production' ? 'hidden' : 'DevInfo__cnt'}>
                {
                  this.props.children.map((child, i) => (
                    <span key={i}>{child}</span>
                  ))
                }
            </div>
        );
    }
}

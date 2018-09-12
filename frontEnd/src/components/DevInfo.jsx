import React from 'react';
import './DevInfo.scss';
import utils from 'AliasSrc/utils';


export default class DevInfo extends React.Component {
    render() {
        return (
            <div className={utils.isProduction ? 'hidden' : 'DevInfo__cnt'}>
                {
                    this.props.children.map((child, i) => (
                        <span key={i}>{child}</span>
                    ))
                }
            </div>
        );
    }
}

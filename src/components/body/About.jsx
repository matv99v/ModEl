import React from 'react';
import './About.scss';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='About__cnt'>
                <p className='dev-label'>About</p>
            </div>
        );
    }
}

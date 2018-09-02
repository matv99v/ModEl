import React from 'react';
import './{{hyphenate name}}.scss';

export default class {{hyphenate name}} extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='{{hyphenate name}}__cnt'>
                <p className='dev-label'>{{hyphenate name}}</p>
            </div>
        );
    }
}
